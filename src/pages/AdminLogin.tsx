import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      // For demo purposes, we'll use a simple check
      // In a real application, this would be an API call
      if (email === "admin@globalcopier.com" && password === "GlobalCopier@2024") {
        // Store login status in localStorage
        localStorage.setItem("admin_logged_in", "true");
        navigate("/admin/dashboard");
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard.",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-secondary">Admin Login</CardTitle>
          <CardDescription>
            Access the GlobalCopier admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@globalcopier.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Demo credentials:</p>
            <p className="font-mono">admin@globalcopier.com / GlobalCopier@2024</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;