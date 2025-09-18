import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { motion } from "framer-motion";
import { Languages, Leaf, ArrowRight, User, MapPin, Smartphone, Mail, Lock } from "lucide-react";
import { authApi } from "../services/api";

interface OnboardingProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",      // Added
    password: "",   // Added
    phone: "",
    location: "",
    farmSize: "",
    primaryCrop: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    { id: 0, title: "Welcome", component: SplashScreen },
    { id: 1, title: "Language", component: LanguageSelection },
    { id: 2, title: "Profile", component: Registration }
  ];

  const handleRegistrationSubmit = async () => {
    // Basic Validation
    if (!userInfo.name || !userInfo.email || !userInfo.password || !userInfo.phone) {
        setError("Please fill in all required fields.");
        return;
    }
    
    setIsLoading(true);
    setError(null);

    const registrationData = {
        full_name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        phone: userInfo.phone,
        language_preference: selectedLanguage || "en",
    };

    try {
      const result = await authApi.register(registrationData);
      console.log('Registration successful:', result);
      onComplete();
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleRegistrationSubmit();
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 flex items-center justify-center p-4">
      <CurrentStepComponent
        onNext={nextStep}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

// No changes to this component
function SplashScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-md"
    >
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Leaf className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl font-bold text-primary mb-2"
            style={{ fontFamily: 'Poppins' }}
          >
            FasalSaathi
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg text-gray-600 mb-6"
          >
            आपका AI किसान सलाहकार
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-gray-600 mb-8 leading-relaxed"
          >
            खेती में आधुनिक तकनीक का सहारा लें। फसल की सेहत से लेकर बाज़ार की कीमतों तक, सब कुछ एक जगह।
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button onClick={onNext} className="w-full py-3" size="lg">
              शुरू करें
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// No changes to this component
function LanguageSelection({ onNext, selectedLanguage, setSelectedLanguage }: any) {
    const languages = [
        { code: "hi", name: "हिंदी", flag: "🇮🇳", native: "हिंदी" },
        { code: "en", name: "English", flag: "🇺🇸", native: "English" },
        { code: "mr", name: "मराठी", flag: "🇮🇳", native: "मराठी" },
        { code: "gu", name: "ગુજરાતી", flag: "🇮🇳", native: "ગુજરાતી" },
        { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳", native: "ਪੰਜਾਬੀ" },
        { code: "ta", name: "தமிழ்", flag: "🇮🇳", native: "தமிழ்" }
    ];

    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full"
        >
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-2xl">
                <CardHeader className="text-center pb-4">
                    <Languages className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-2xl" style={{ fontFamily: 'Poppins' }}>अपनी भाषा चुनें</CardTitle>
                    <p className="text-gray-600">Choose your preferred language</p>
                </CardHeader>
                <CardContent className="space-y-3">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => setSelectedLanguage(lang.code)}
                            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                                selectedLanguage === lang.code
                                ? 'border-primary bg-primary/10 shadow-md'
                                : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{lang.flag}</span>
                                    <div>
                                        <p className="font-medium">{lang.native}</p>
                                        <p className="text-sm text-gray-600">{lang.name}</p>
                                    </div>
                                </div>
                                {selectedLanguage === lang.code && (
                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                )}
                            </div>
                        </button>
                    ))}
                    <Button onClick={onNext} className="w-full mt-6" size="lg">
                        जारी रखें <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}


// UPDATED REGISTRATION COMPONENT
function Registration({ onNext, userInfo, setUserInfo, isLoading, error }: any) {
  const crops = [ "सोयाबीन (Soybean)", "गेहूं (Wheat)", "मक्का (Maize)", "धान (Rice)", "कपास (Cotton)", "चना (Chickpea)", "सरसों (Mustard)", "गन्ना (Sugarcane)" ];

  const handleInputChange = (field: string, value: string) => {
    setUserInfo((prev: any) => ({ ...prev, [field]: value }));
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
          <CardTitle className="text-2xl" style={{ fontFamily: 'Poppins' }}>अपना अकाउंट बनाएं</CardTitle>
          <p className="text-gray-600">Create your FasalSaathi account</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">आपका नाम (Your Name)</Label>
            <Input id="name" value={userInfo.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="जैसे: रमेश कुमार" className="mt-1" required/>
          </div>

          <div>
            <Label htmlFor="email">ईमेल (Email)</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input id="email" type="email" value={userInfo.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="ramesh@example.com" className="pl-10" required/>
            </div>
          </div>

          <div>
            <Label htmlFor="password">पासवर्ड (Password)</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input id="password" type="password" value={userInfo.password} onChange={(e) => handleInputChange('password', e.target.value)} placeholder="••••••••" className="pl-10" required/>
            </div>
          </div>
          
          <div>
            <Label htmlFor="phone">मोबाइल नंबर (Mobile Number)</Label>
            <div className="relative mt-1">
              <Smartphone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input id="phone" value={userInfo.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="+91 9876543210" className="pl-10" required/>
            </div>
          </div>
          
          {/* Optional fields below */}
          <hr className="my-4" />

          <div>
            <Label htmlFor="location">स्थान (Location) <span className="text-gray-500 text-xs">(Optional)</span></Label>
            <div className="relative mt-1">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input id="location" value={userInfo.location} onChange={(e) => handleInputChange('location', e.target.value)} placeholder="जैसे: इटारसी, मध्य प्रदेश" className="pl-10"/>
            </div>
          </div>

          <div>
            <Label htmlFor="farmSize">खेत का आकार (Farm Size) <span className="text-gray-500 text-xs">(Optional)</span></Label>
            <Select onValueChange={(value) => handleInputChange('farmSize', value)}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="चुनें" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="small">छोटा (1-5 एकड़)</SelectItem>
                <SelectItem value="medium">मध्यम (5-20 एकड़)</SelectItem>
                <SelectItem value="large">बड़ा (20+ एकड़)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="primaryCrop">मुख्य फसल (Primary Crop) <span className="text-gray-500 text-xs">(Optional)</span></Label>
            <Select onValueChange={(value) => handleInputChange('primaryCrop', value)}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="चुनें" /></SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (<SelectItem key={crop} value={crop}>{crop}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
             {error && <p className="text-sm text-red-600 text-center mb-2">{error}</p>}
            <Button onClick={onNext} className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'अकाउंट बनाएं और आगे बढ़ें'}
              {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}