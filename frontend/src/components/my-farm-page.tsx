import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { 
  MapPin, 
  Calendar,
  Droplets,
  TestTube,
  Leaf,
  TrendingUp,
  TrendingDown,
  Target,
  History,
  Plus,
  Edit,
  BarChart3,
  Thermometer,
  Wind,
  Eye,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

interface CropHistoryItem {
  id: string;
  cropName: string;
  cropNameHindi: string;
  season: string;
  year: number;
  yieldAchieved: number;
  profitLoss: number;
  status: 'profit' | 'loss' | 'break-even';
}

export function MyFarmPage() {
  const cropHistory: CropHistoryItem[] = [
    {
      id: '1',
      cropName: 'Soybean',
      cropNameHindi: 'सोयाबीन',
      season: 'खरीफ',
      year: 2024,
      yieldAchieved: 15.2,
      profitLoss: 45000,
      status: 'profit'
    },
    {
      id: '2',
      cropName: 'Wheat',
      cropNameHindi: 'गेहूं',
      season: 'रबी',
      year: 2024,
      yieldAchieved: 22.8,
      profitLoss: 38000,
      status: 'profit'
    },
    {
      id: '3',
      cropName: 'Maize',
      cropNameHindi: 'मक्का',
      season: 'खरीफ',
      year: 2023,
      yieldAchieved: 18.5,
      profitLoss: -8000,
      status: 'loss'
    },
    {
      id: '4',
      cropName: 'Chickpea',
      cropNameHindi: 'चना',
      season: 'रबी',
      year: 2023,
      yieldAchieved: 12.0,
      profitLoss: 25000,
      status: 'profit'
    }
  ];

  const getNutrientStatus = (level: number) => {
    if (level < 30) return { status: 'Low', color: 'text-red-600', bg: 'bg-red-100' };
    if (level > 70) return { status: 'High', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { status: 'Optimal', color: 'text-green-600', bg: 'bg-green-100' };
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Farm Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-green-400 via-blue-500 to-primary">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins' }}>
                    आनंद पटिदार का खेत
                  </h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      <span>कुल क्षेत्र: 5 एकड़</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>भोपाल, मध्य प्रदेश</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="secondary" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    संपादित करें
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    मैप देखें
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Soil Health & Current Crop */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Real-Time Soil Health Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center" style={{ fontFamily: 'Poppins' }}>
                  <TestTube className="w-6 h-6 mr-3 text-primary" />
                  रियल-टाइम मिट्टी स्वास्थ्य
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Soil Moisture */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Droplets className="w-5 h-5 mr-2 text-blue-500" />
                        <span className="font-medium">मिट्टी में नमी</span>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">65%</span>
                    </div>
                    <div className="relative">
                      <Progress value={65} className="h-4 bg-blue-100">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500" />
                      </Progress>
                      <div className="absolute -top-1 left-[65%] w-2 h-6 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>सूखा (0%)</span>
                      <span>आदर्श (50-70%)</span>
                      <span>भरा (100%)</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">अच्छी स्थिति</Badge>
                  </div>

                  {/* Soil pH */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TestTube className="w-5 h-5 mr-2 text-green-500" />
                        <span className="font-medium">मिट्टी pH</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600">6.8</span>
                    </div>
                    <div className="relative">
                      <div className="w-full h-4 bg-gradient-to-r from-red-300 via-yellow-300 via-green-300 to-blue-300 rounded-full"></div>
                      <div className="absolute -top-1 left-[68%] w-2 h-6 bg-green-600 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>अम्लीय (4)</span>
                      <span>उदासीन (7)</span>
                      <span>क्षारीय (10)</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">आदर्श स्तर</Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* NPK Nutrient Levels */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Leaf className="w-5 h-5 mr-2 text-primary" />
                    पोषक तत्व स्तर (NPK)
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: 'नाइट्रोजन (N)', level: 45, color: 'blue' },
                      { name: 'फास्फोरस (P)', level: 72, color: 'purple' },
                      { name: 'पोटाशियम (K)', level: 58, color: 'green' }
                    ].map((nutrient, index) => {
                      const status = getNutrientStatus(nutrient.level);
                      return (
                        <div key={index} className="text-center">
                          <div className="relative w-20 h-20 mx-auto mb-2">
                            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="2"
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={
                                  nutrient.color === 'blue' ? '#3B82F6' :
                                  nutrient.color === 'purple' ? '#8B5CF6' : '#10B981'
                                }
                                strokeWidth="2"
                                strokeDasharray={`${nutrient.level}, 100`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-bold">{nutrient.level}%</span>
                            </div>
                          </div>
                          <p className="text-sm font-medium mb-1">{nutrient.name}</p>
                          <Badge className={`${status.bg} ${status.color} text-xs`}>
                            {status.status === 'Low' && 'कम'}
                            {status.status === 'High' && 'अधिक'}
                            {status.status === 'Optimal' && 'आदर्श'}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <Button variant="outline" className="flex-1">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    विस्तृत रिपोर्ट
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    टेस्ट शेड्यूल करें
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Current Crop Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between" style={{ fontFamily: 'Poppins' }}>
                  <div className="flex items-center">
                    <Leaf className="w-6 h-6 mr-3 text-primary" />
                    वर्तमान फसल विवरण
                  </div>
                  <Badge className="bg-green-100 text-green-800">सक्रिय</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1605351793013-780532cbdb66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3liZWFuJTIwY3JvcCUyMGZpZWxkJTIwaW5kaWF8ZW58MXx8fHwxNzU3OTUwMjMyfDA&ixlib=rb-4.1.0&q=80&w=200"
                      alt="सोयाबीन"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">सोयाबीन (Soybean)</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600">बुआई की तारीख</span>
                        </div>
                        <p className="font-semibold">2 जुलाई, 2024</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Target className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600">वर्तमान चरण</span>
                        </div>
                        <p className="font-semibold">फली भरने का चरण</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600">अनुमानि�� कटाई</span>
                        </div>
                        <p className="font-semibold">नवंबर 15-30, 2024</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Target className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600">बोया गया क्षेत्र</span>
                        </div>
                        <p className="font-semibold">4.5 एकड़</p>
                      </div>
                    </div>

                    {/* Growth Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">विकास प्रगति</span>
                        <span className="text-sm text-gray-600">75% पूर्ण</span>
                      </div>
                      <Progress value={75} className="h-2">
                        <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500" />
                      </Progress>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-green-50 rounded-lg text-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <p className="text-xs text-green-700">अंकुरण</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg text-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <p className="text-xs text-green-700">फूल आना</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg text-center border-2 border-blue-200">
                        <div className="w-5 h-5 border-2 border-blue-500 rounded-full mx-auto mb-1"></div>
                        <p className="text-xs text-blue-700 font-medium">फली भरना</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Crop History */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center justify-between" style={{ fontFamily: 'Poppins' }}>
                  <div className="flex items-center">
                    <History className="w-5 h-5 mr-2 text-primary" />
                    फसल इतिहास
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    नई एंट्री
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cropHistory.map((crop, index) => (
                    <div key={crop.id} className="relative">
                      {index < cropHistory.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Leaf className="w-6 h-6 text-primary" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm">{crop.cropNameHindi}</h4>
                            <Badge 
                              className={`text-xs ${
                                crop.status === 'profit' 
                                  ? 'bg-green-100 text-green-800' 
                                  : crop.status === 'loss'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {crop.status === 'profit' && 'लाभ'}
                              {crop.status === 'loss' && 'हानि'}
                              {crop.status === 'break-even' && 'बराबर'}
                            </Badge>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-2">
                            {crop.season} {crop.year}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-500">उत्पादन:</span>
                              <p className="font-medium">{crop.yieldAchieved} क्विंटल/एकड़</p>
                            </div>
                            <div>
                              <span className="text-gray-500">
                                {crop.status === 'profit' ? 'लाभ:' : 'हानि:'}
                              </span>
                              <p className={`font-medium ${
                                crop.status === 'profit' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                ₹{Math.abs(crop.profitLoss).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">कुल लाभ (पिछले 2 साल)</p>
                    <p className="text-2xl font-bold text-green-600">₹1,00,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}