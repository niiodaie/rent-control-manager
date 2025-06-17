import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Building, Users, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Logo from "@/components/Logo";
import { apiRequest } from "@/lib/queryClient";

interface LoginForm {
  email: string;
  password: string;
  role: 'landlord' | 'resident';
}

interface SignupForm extends LoginForm {
  name: string;
  confirmPassword: string;
  plan?: string;
}

export default function Login() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [userRole, setUserRole] = useState<'landlord' | 'resident'>('landlord');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'landlord',
    plan: 'free'
  });
  const { toast } = useToast();

  // Check URL params for role
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get('role');
    if (roleParam === 'resident' || roleParam === 'landlord') {
      setUserRole(roleParam);
      setFormData(prev => ({ ...prev, role: roleParam }));
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      return apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: (data) => {
      localStorage.setItem('auth-token', data.token);
      localStorage.setItem('user-role', data.role);
      localStorage.setItem('user-id', data.user.id);
      
      if (data.role === 'landlord') {
        setLocation('/dashboard');
      } else {
        setLocation('/resident-dashboard');
      }
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive"
      });
    }
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupForm) => {
      const { confirmPassword, ...submitData } = data;
      return apiRequest('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: (data) => {
      localStorage.setItem('auth-token', data.token);
      localStorage.setItem('user-role', data.role);
      localStorage.setItem('user-id', data.user.id);
      
      toast({
        title: "Welcome!",
        description: "Account created successfully"
      });
      
      if (data.role === 'landlord') {
        setLocation('/dashboard');
      } else {
        setLocation('/resident-dashboard');
      }
    },
    onError: (error: any) => {
      toast({
        title: "Signup Failed",
        description: error.message || "Failed to create account",
        variant: "destructive"
      });
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      email: formData.email,
      password: formData.password,
      role: userRole
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    signupMutation.mutate(formData);
  };

  const updateFormData = (field: keyof SignupForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <Logo className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">
            {userRole === 'landlord' ? 'Landlord Portal' : 'Resident Portal'}
          </h1>
          <p className="text-gray-600">
            {userRole === 'landlord' 
              ? 'Manage your properties and tenants' 
              : 'Access your rental dashboard'
            }
          </p>
        </div>

        {/* Role Selector */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={userRole === 'landlord' ? 'default' : 'outline'}
                onClick={() => {
                  setUserRole('landlord');
                  setFormData(prev => ({ ...prev, role: 'landlord' }));
                }}
                className="flex items-center justify-center"
              >
                <Building className="h-4 w-4 mr-2" />
                Landlord
              </Button>
              <Button
                variant={userRole === 'resident' ? 'default' : 'outline'}
                onClick={() => {
                  setUserRole('resident');
                  setFormData(prev => ({ ...prev, role: 'resident' }));
                }}
                className="flex items-center justify-center"
              >
                <Users className="h-4 w-4 mr-2" />
                Resident
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Auth Forms */}
        <Card>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to your {userRole} account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  {userRole === 'landlord' 
                    ? 'Start managing your properties today'
                    : 'Join your property community'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password (min 6 characters)"
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                      required
                    />
                  </div>

                  {userRole === 'landlord' && (
                    <div className="space-y-2">
                      <Label>Choose Plan</Label>
                      <div className="grid grid-cols-1 gap-2">
                        <Button
                          type="button"
                          variant={formData.plan === 'free' ? 'default' : 'outline'}
                          onClick={() => updateFormData('plan', 'free')}
                          className="justify-start text-left h-auto p-3"
                        >
                          <div>
                            <div className="font-semibold">Free Plan</div>
                            <div className="text-sm opacity-80">Up to 5 units</div>
                          </div>
                        </Button>
                        <Button
                          type="button"
                          variant={formData.plan === 'pro' ? 'default' : 'outline'}
                          onClick={() => updateFormData('plan', 'pro')}
                          className="justify-start text-left h-auto p-3"
                        >
                          <div>
                            <div className="font-semibold">Pro Plan - $49.99/month</div>
                            <div className="text-sm opacity-80">Up to 50 units</div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={signupMutation.isPending}
                  >
                    {signupMutation.isPending ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Demo Account Info */}
        <Alert className="mt-6">
          <AlertDescription>
            <strong>Demo Accounts:</strong><br />
            Landlord: admin@rentcontrol.com / password<br />
            Resident: resident@example.com / password
          </AlertDescription>
        </Alert>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
          <p className="mt-2">
            Powered by <a href="https://visnec.com" className="text-blue-600 hover:underline">Visnec</a>
          </p>
        </div>
      </div>
    </div>
  );
}