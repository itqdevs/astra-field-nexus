import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  DollarSign, 
  TrendingUp,
  Plus,
  Calendar,
  ClipboardList,
  Receipt
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Leads',
      value: '0',
      description: 'Active leads in pipeline',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Deals Closed',
      value: '0',
      description: 'This month',
      icon: Target,
      color: 'text-green-600',
    },
    {
      title: 'Revenue',
      value: '$0',
      description: 'Total revenue generated',
      icon: DollarSign,
      color: 'text-yellow-600',
    },
    {
      title: 'Conversion Rate',
      value: '0%',
      description: 'Lead to deal conversion',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Lead',
      description: 'Capture a new business lead',
      icon: Plus,
      href: '/leads/new',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      title: 'Schedule Task',
      description: 'Create a new task or appointment',
      icon: Calendar,
      href: '/tasks/new',
      color: 'bg-green-50 text-green-600 border-green-200',
    },
    {
      title: 'Daily Report',
      description: 'Submit your daily field report',
      icon: ClipboardList,
      href: '/reports/daily',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      title: 'Log Expense',
      description: 'Record a business expense',
      icon: Receipt,
      href: '/expenses/new',
      color: 'bg-orange-50 text-orange-600 border-orange-200',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user?.user_metadata?.full_name || 'Agent'}!
          </h1>
          <p className="text-muted-foreground">
            Here's your field marketing dashboard overview
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card key={action.title} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color} mb-2`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm">{action.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to={action.href}>Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>
              Your latest lead activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No leads yet</p>
              <p className="text-xs">Start by adding your first lead</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              Your scheduled activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <ClipboardList className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No tasks scheduled</p>
              <p className="text-xs">Create your first task</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
