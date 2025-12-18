import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">ProsFIN Admin</h1>
          <p className="text-muted-foreground">Welcome to the admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Overview and analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">View Dashboard</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leads</CardTitle>
              <CardDescription>Manage your leads</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">View Leads</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clients</CardTitle>
              <CardDescription>Manage your clients</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">View Clients</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

