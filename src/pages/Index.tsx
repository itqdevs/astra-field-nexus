import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Target, BarChart3, Users, MapPin } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    {
      icon: Target,
      title: "Lead Management",
      description: "Track and manage leads throughout the entire sales pipeline"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Comprehensive analytics for field marketing performance"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Coordinate field agents and manage territories effectively"
    },
    {
      icon: MapPin,
      title: "Field Tracking",
      description: "GPS tracking and location-based performance monitoring"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            AstraMinds
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Complete Field Marketing & Reporting Platform designed to streamline your sales operations, 
            track performance, and maximize team productivity.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/auth">Get Started</a>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Powerful Features for Field Teams
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage field marketing operations efficiently and drive results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Field Operations?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join successful companies using AstraMinds to optimize their field marketing and drive growth.
          </p>
          <Button size="lg" asChild>
            <a href="/auth">Start Your Journey</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;