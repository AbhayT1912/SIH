import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { authApi } from "../services/api";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setLoginInfo({ ...loginInfo, [field]: value });
  };

  const handleLogin = async () => {
    if (!loginInfo.email || !loginInfo.password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login(loginInfo.email, loginInfo.password);
      
      // Store the access token
      localStorage.setItem('accessToken', response.data.access_token);
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Login failed';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-4">
            <User className="w-12 h-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl" style={{ fontFamily: 'Poppins' }}>
              अपने खाते में लॉग इन करें
            </CardTitle>
            <p className="text-gray-600">Login to your FasalSaathi account</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="login-email">ईमेल (Email)</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input 
                  id="login-email" 
                  type="email" 
                  value={loginInfo.email} 
                  onChange={(e) => handleInputChange('email', e.target.value)} 
                  placeholder="yourname@example.com" 
                  className="pl-10" 
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="login-password">पासवर्ड (Password)</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input 
                  id="login-password" 
                  type="password" 
                  value={loginInfo.password} 
                  onChange={(e) => handleInputChange('password', e.target.value)} 
                  placeholder="••••••••" 
                  className="pl-10" 
                />
              </div>
            </div>
            
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            
            <Button onClick={handleLogin} className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'लॉग इन करें (Login)'}
              {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              Don't have an account? <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate("/register")}>Register here</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
