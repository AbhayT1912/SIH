import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { User, Mail, Lock, Smartphone, MapPin, ArrowRight } from "lucide-react";

interface AccountScreenProps {
  onNext: () => void;
  userInfo: any;
  setUserInfo: (info: any) => void;
  loginInfo: any;
  setLoginInfo: (info: any) => void;
  isLoginMode: boolean;
  setIsLoginMode: (mode: boolean) => void;
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

export function AccountScreen({ 
  onNext, 
  userInfo, 
  setUserInfo, 
  loginInfo, 
  setLoginInfo, 
  isLoginMode, 
  setIsLoginMode, 
  isLoading, 
  error, 
  setError 
}: AccountScreenProps) {
  const crops = [ "सोयाबीन (Soybean)", "गेहूं (Wheat)", "मक्का (Maize)", "धान (Rice)", "कपास (Cotton)", "चना (Chickpea)", "सरसों (Mustard)", "गन्ना (Sugarcane)" ];

  const handleInputChange = (field: string, value: string) => {
    setUserInfo((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleLoginInputChange = (field: string, value: string) => {
    setLoginInfo((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
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
            {isLoginMode ? "अपने खाते में लॉग इन करें" : "अपना अकाउंट बनाएं"}
          </CardTitle>
          <p className="text-gray-600">
            {isLoginMode ? "Login to your account" : "Create your FasalSaathi account"}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={isLoginMode ? "login" : "register"} onValueChange={(v: string) => setIsLoginMode(v === "login")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="login-email">ईमेल (Email)</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    id="login-email" 
                    type="email" 
                    value={loginInfo.email} 
                    onChange={(e) => handleLoginInputChange('email', e.target.value)} 
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
                    onChange={(e) => handleLoginInputChange('password', e.target.value)} 
                    placeholder="••••••••" 
                    className="pl-10" 
                  />
                </div>
              </div>
              
              {error && (
                <p className="text-sm text-red-600 text-center">
                  {typeof error === 'object' ? JSON.stringify(error) : error}
                </p>
              )}
              
              <Button onClick={onNext} className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'लॉग इन करें (Login)'}
                {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">आपका नाम (Your Name)</Label>
                <Input 
                  id="name" 
                  value={userInfo.name} 
                  onChange={(e) => handleInputChange('name', e.target.value)} 
                  placeholder="जैसे: रमेश कुमार" 
                  className="mt-1" 
                />
              </div>

              <div>
                <Label htmlFor="email">ईमेल (Email)</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={userInfo.email} 
                    onChange={(e) => handleInputChange('email', e.target.value)} 
                    placeholder="ramesh@example.com" 
                    className="pl-10" 
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">पासवर्ड (Password)</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    id="password" 
                    type="password" 
                    value={userInfo.password} 
                    onChange={(e) => handleInputChange('password', e.target.value)} 
                    placeholder="••••••••" 
                    className="pl-10" 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">मोबाइल नंबर (Mobile Number)</Label>
                <div className="relative mt-1">
                  <Smartphone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    id="phone" 
                    value={userInfo.phone} 
                    onChange={(e) => handleInputChange('phone', e.target.value)} 
                    placeholder="+91 9876543210" 
                    className="pl-10" 
                  />
                </div>
              </div>
              
              {/* Optional fields below */}
              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-gray-600">Additional Information (Optional)</summary>
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="location">स्थान (Location)</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input 
                        id="location" 
                        value={userInfo.location} 
                        onChange={(e) => handleInputChange('location', e.target.value)} 
                        placeholder="जैसे: इटारसी, मध्य प्रदेश" 
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="farmSize">खेत का आकार (Farm Size)</Label>
                    <Select onValueChange={(value: string) => handleInputChange('farmSize', value)}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="चुनें" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">छोटा (1-5 एकड़)</SelectItem>
                        <SelectItem value="medium">मध्यम (5-20 एकड़)</SelectItem>
                        <SelectItem value="large">बड़ा (20+ एकड़)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="primaryCrop">मुख्य फसल (Primary Crop)</Label>
                    <Select onValueChange={(value: string) => handleInputChange('primaryCrop', value)}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="चुनें" /></SelectTrigger>
                      <SelectContent>
                        {crops.map((crop) => (<SelectItem key={crop} value={crop}>{crop}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </details>

              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
              
              <Button onClick={onNext} className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'अकाउंट बनाएं (Register)'}
                {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}