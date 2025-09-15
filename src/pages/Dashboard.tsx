import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Target, ClipboardList, Receipt, TrendingUp, Users, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { profile } = useAuth();

  const quickStats = [
    { 
      title: "Active Leads", 
      value: "24", 
      change: "+12%", 
      icon: Target,
      color: "text-blue-600"
    },
    { 
      title: "Tasks Due Today", 
      value: "8", 
      change: "-2", 
      icon: ClipboardList,
      color: "text-orange-600"
    },
    { 
      title: "Monthly Revenue", 
      value: "$45,230", 
      change: "+23%", 
      icon: DollarSign,
      color: "text-green-600"
    },
    { 
      title: "Team Performance", 
      value: "94%", 
      change: "+5%", 
      icon: TrendingUp,
      color: "text-purple-600"
    },
  ];

  const recentLeads = [
    { company: "Tech Solutions Inc", contact: "John Smith", status: "interested", value: "$12,000" },
    { company: "Green Energy Co", contact: "Sarah Johnson", status: "in_progress", value: "$8,500" },
    { company: "Local Restaurant", contact: "Mike Chen", status: "new_lead", value: "$3,200" },
    { company: "Fitness Center", contact: "Lisa Brown", status: "closed_deal", value: "$15,000" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new_lead": return "bg-blue-100 text-blue-800";
      case "interested": return "bg-yellow-100 text-yellow-800";
      case "in_progress": return "bg-orange-100 text-orange-800";
      case "closed_deal": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {profile?.full_name?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your field marketing activities today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Lead
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recent Leads
            </CardTitle>
            <CardDescription>
              Latest leads from your field marketing activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentLeads.map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{lead.company}</p>
                  <p className="text-sm text-muted-foreground">{lead.contact}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status.replace('_', ' ')}
                  </Badge>
                  <span className="font-semibold text-foreground">{lead.value}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Today's Tasks
            </CardTitle>
            <CardDescription>
              Tasks scheduled for today
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">Follow up with Tech Solutions Inc</p>
                <p className="text-sm text-muted-foreground">High priority • Due in 2 hours</p>
              </div>
              <Badge className="bg-red-100 text-red-800">Urgent</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">Prepare proposal for Green Energy Co</p>
                <p className="text-sm text-muted-foreground">Medium priority • Due today</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">Site visit to Local Restaurant</p>
                <p className="text-sm text-muted-foreground">Low priority • Due tomorrow</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Low</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to help you stay productive
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Target className="h-6 w-6" />
            Add New Lead
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Receipt className="h-6 w-6" />
            Submit Expense
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Users className="h-6 w-6" />
            Daily Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}