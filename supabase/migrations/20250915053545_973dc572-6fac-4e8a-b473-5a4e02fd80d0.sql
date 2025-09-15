-- Create enum types
CREATE TYPE public.user_role AS ENUM ('admin', 'team_lead', 'field_agent', 'finance');
CREATE TYPE public.lead_status AS ENUM ('new_lead', 'interested', 'in_progress', 'closed_deal', 'dormant', 'lost');
CREATE TYPE public.task_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.expense_status AS ENUM ('pending', 'approved', 'rejected', 'reimbursed');
CREATE TYPE public.priority_level AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'field_agent',
  phone TEXT,
  avatar_url TEXT,
  department TEXT,
  hire_date DATE DEFAULT CURRENT_DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table for granular permissions
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  assigned_by UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assigned_agent UUID REFERENCES auth.users(id),
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  whatsapp_number TEXT,
  business_address TEXT,
  website TEXT,
  industry TEXT,
  business_size TEXT,
  lead_source TEXT,
  referring_agent UUID REFERENCES auth.users(id),
  status lead_status DEFAULT 'new_lead',
  interest_level INTEGER CHECK (interest_level >= 1 AND interest_level <= 10),
  budget_indication TEXT,
  decision_timeline TEXT,
  services_interested TEXT[],
  notes TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  first_contact_date DATE DEFAULT CURRENT_DATE,
  last_contact_date DATE,
  next_follow_up DATE,
  deal_value DECIMAL(12, 2),
  conversion_probability INTEGER CHECK (conversion_probability >= 0 AND conversion_probability <= 100),
  competitor_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lead_interactions table
CREATE TABLE public.lead_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES auth.users(id),
  interaction_type TEXT NOT NULL, -- call, email, meeting, whatsapp, site_visit
  interaction_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  duration_minutes INTEGER,
  outcome TEXT,
  notes TEXT,
  follow_up_required BOOLEAN DEFAULT false,
  follow_up_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tasks table
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID NOT NULL REFERENCES auth.users(id),
  assigned_by UUID REFERENCES auth.users(id),
  lead_id UUID REFERENCES public.leads(id),
  status task_status DEFAULT 'pending',
  priority priority_level DEFAULT 'medium',
  due_date DATE,
  completed_date DATE,
  estimated_hours DECIMAL(4, 2),
  actual_hours DECIMAL(4, 2),
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create expenses table
CREATE TABLE public.expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submitted_by UUID NOT NULL REFERENCES auth.users(id),
  category TEXT NOT NULL,
  subcategory TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  description TEXT NOT NULL,
  expense_date DATE NOT NULL,
  receipt_url TEXT,
  location TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  lead_id UUID REFERENCES public.leads(id),
  task_id UUID REFERENCES public.tasks(id),
  status expense_status DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id),
  approved_date DATE,
  rejection_reason TEXT,
  reimbursement_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create daily_reports table
CREATE TABLE public.daily_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL REFERENCES auth.users(id),
  report_date DATE NOT NULL,
  businesses_visited INTEGER DEFAULT 0,
  new_leads_generated INTEGER DEFAULT 0,
  follow_ups_completed INTEGER DEFAULT 0,
  meetings_held INTEGER DEFAULT 0,
  total_hours DECIMAL(4, 2),
  kilometers_traveled DECIMAL(8, 2),
  materials_distributed INTEGER DEFAULT 0,
  challenges_faced TEXT,
  opportunities_identified TEXT,
  competitive_intelligence TEXT,
  next_day_plan TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(agent_id, report_date)
);

-- Create territories table
CREATE TABLE public.territories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  assigned_agent UUID REFERENCES auth.users(id),
  coverage_area TEXT,
  target_businesses INTEGER,
  monthly_target_leads INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.territories ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  ) OR EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all profiles"
ON public.profiles FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for leads
CREATE POLICY "Agents can view their assigned leads"
ON public.leads FOR SELECT
USING (auth.uid() = assigned_agent OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team_lead'));

CREATE POLICY "Agents can create leads"
ON public.leads FOR INSERT
WITH CHECK (auth.uid() = assigned_agent OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team_lead'));

CREATE POLICY "Agents can update their assigned leads"
ON public.leads FOR UPDATE
USING (auth.uid() = assigned_agent OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team_lead'));

-- Create RLS policies for tasks
CREATE POLICY "Users can view their assigned tasks"
ON public.tasks FOR SELECT
USING (auth.uid() = assigned_to OR auth.uid() = assigned_by OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team_lead'));

CREATE POLICY "Users can create tasks"
ON public.tasks FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team_lead') OR auth.uid() = assigned_to);

CREATE POLICY "Users can update their tasks"
ON public.tasks FOR UPDATE
USING (auth.uid() = assigned_to OR auth.uid() = assigned_by OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team_lead'));

-- Create RLS policies for expenses
CREATE POLICY "Users can view their own expenses"
ON public.expenses FOR SELECT
USING (auth.uid() = submitted_by OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'finance'));

CREATE POLICY "Users can create their own expenses"
ON public.expenses FOR INSERT
WITH CHECK (auth.uid() = submitted_by);

CREATE POLICY "Users can update their pending expenses"
ON public.expenses FOR UPDATE
USING (auth.uid() = submitted_by AND status = 'pending');

CREATE POLICY "Admins and finance can approve expenses"
ON public.expenses FOR UPDATE
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'finance'));

-- Create function to automatically create profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create update triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at
  BEFORE UPDATE ON public.expenses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_daily_reports_updated_at
  BEFORE UPDATE ON public.daily_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_territories_updated_at
  BEFORE UPDATE ON public.territories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();