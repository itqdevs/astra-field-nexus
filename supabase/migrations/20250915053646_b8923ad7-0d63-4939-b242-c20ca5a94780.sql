-- Fix security warnings by adding missing RLS policies

-- Add missing policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage user roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Add missing policies for lead_interactions table
CREATE POLICY "Users can view interactions for their leads"
ON public.lead_interactions FOR SELECT
USING (
  auth.uid() = agent_id OR 
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'team_lead') OR
  EXISTS (
    SELECT 1 FROM public.leads 
    WHERE leads.id = lead_interactions.lead_id 
    AND leads.assigned_agent = auth.uid()
  )
);

CREATE POLICY "Users can create interactions for their leads"
ON public.lead_interactions FOR INSERT
WITH CHECK (
  auth.uid() = agent_id AND
  EXISTS (
    SELECT 1 FROM public.leads 
    WHERE leads.id = lead_id 
    AND (leads.assigned_agent = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team_lead'))
  )
);

CREATE POLICY "Users can update their own interactions"
ON public.lead_interactions FOR UPDATE
USING (auth.uid() = agent_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team_lead'));

-- Add missing policies for daily_reports table
CREATE POLICY "Users can view their own reports"
ON public.daily_reports FOR SELECT
USING (auth.uid() = agent_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team_lead'));

CREATE POLICY "Users can create their own reports"
ON public.daily_reports FOR INSERT
WITH CHECK (auth.uid() = agent_id);

CREATE POLICY "Users can update their own reports"
ON public.daily_reports FOR UPDATE
USING (auth.uid() = agent_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team_lead'));

-- Add missing policies for territories table
CREATE POLICY "Users can view territories"
ON public.territories FOR SELECT
USING (
  auth.uid() = assigned_agent OR 
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'team_lead')
);

CREATE POLICY "Admins and team leads can manage territories"
ON public.territories FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team_lead'));

-- Fix the function to have proper search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;