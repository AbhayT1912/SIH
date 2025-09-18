import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useLanguage, SpeakerButton } from "./language-context";
import { motion } from "motion/react";
import { WeatherCard } from "./weather-card";
import { 
  AlertTriangle, 
  Droplets, 
  TestTube, 
  TrendingUp, 
  TrendingDown,
  Wheat,
  Target,
  MapPin,
  Clock,
  ArrowRight,
  Eye,
  CheckCircle
} from "lucide-react";
import type { Page } from "../types/navigation";

export function BalancedDashboard({ onNavigate }: { onNavigate?: (page: Page) => void }) {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-7xl mx-auto p-6">      
      {/* Weather Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <WeatherCard />
      </motion.div>
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Tonight's Top Priority Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-red-800" style={{ fontFamily: 'Poppins' }}>
                  <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                  {t('tonight-priority')}
                  <SpeakerButton text={t('tonight-priority')} className="ml-2" />
                </CardTitle>
                <Badge className="bg-red-600 text-white">{t('high')}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    {t('soybean')} की फसल में तना मक्खी की जांच करें
                  </h3>
                  <p className="text-red-700 mb-4 leading-relaxed">
                    नम मौसम की वजह से तना मक्खी का खतरा बढ़ गया है। पत्तियों के पीले होने और तने में छेद के लक्षण देखें।
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-red-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {t('evening')} 6-7 बजे
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {t('field-a-b')}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Eye className="w-4 h-4 mr-2" />
                    {t('start-inspection')}
                  </Button>
                  <Button variant="outline" size="sm">
                    {t('remind-later')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Farm Vitals Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center" style={{ fontFamily: 'Poppins' }}>
                <TestTube className="w-5 h-5 mr-2 text-primary" />
                {t('live-farm-vitals')}
                <SpeakerButton text={t('live-farm-vitals')} className="ml-2" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Soil Moisture */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Droplets className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">{t('soil-moisture')}</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">65%</span>
                </div>
                <Progress value={65} className="h-3 bg-blue-100">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500" />
                </Progress>
                <p className="text-sm text-gray-600 mt-1">{t('good-condition')}</p>
              </div>

              {/* Soil pH */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <TestTube className="w-4 h-4 mr-2 text-green-500" />
                    <span className="font-medium">{t('soil-ph')}</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">6.8</span>
                </div>
                <div className="relative">
                  <div className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-blue-200 rounded-full"></div>
                  <div className="absolute top-0 left-[68%] w-1 h-3 bg-green-600 rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>अम्लीय</span>
                  <span>उदासीन</span>
                  <span>क्षारीय</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{t('ideal-level')}</p>
              </div>

              <Button variant="outline" className="w-full">
                <ArrowRight className="w-4 h-4 mr-2" />
                {t('full-report')}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Yield Forecast Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center" style={{ fontFamily: 'Poppins' }}>
                <Target className="w-5 h-5 mr-2 text-primary" />
                {t('yield-forecast')}
                <SpeakerButton text={t('yield-forecast')} className="ml-2" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wheat className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{t('soybean')}</h3>
                <p className="text-3xl font-bold text-primary">16-18</p>
                <p className="text-gray-600">{t('quintal-per-acre')}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>पिछले साल की तुलना</span>
                  <span className="text-green-600 font-medium">+12%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>क्षेत्रीय औसत</span>
                  <span className="text-blue-600 font-medium">15 {t('quintal-per-acre')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>अनुमानित कटाई</span>
                  <span className="font-medium">नवंबर 2024</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">लक्ष्य से आगे</span>
                </div>
              </div>

              <Button 
                className="w-full mt-4" 
                onClick={() => onNavigate?.('yield-prediction')}
              >
                <Target className="w-4 h-4 mr-2" />
                {t('detailed-forecast')}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Market Price Alert Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center justify-between" style={{ fontFamily: 'Poppins' }}>
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  {t('market-price-alert')}
                  <SpeakerButton text={t('market-price-alert')} className="ml-2" />
                </div>
                <Badge className="bg-green-600 text-white">तेजी</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Wheat className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t('soybean')}</h3>
                      <p className="text-gray-600">{t('itarsi-mandi')}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">₹5,270</p>
                      <p className="text-sm text-gray-600">{t('per-quintal')}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-lg font-bold">₹20</span>
                      </div>
                      <p className="text-sm text-gray-600">आज की बढ़त</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">+0.38%</p>
                      <p className="text-sm text-gray-600">दैनिक बदलाव</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-600">₹5,350</p>
                      <p className="text-sm text-gray-600">सप्ताह का उच्च</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {t('detailed-chart')}
                  </Button>
                  <Button variant="outline">
                    {t('set-price-alert')}
                  </Button>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">AI सुझाव</p>
                    <p className="text-sm text-yellow-700">
                      अगले 5-7 दिन में कीमतें और बढ़ सकती हैं। फसल बेचने के लिए उपयुक्त समय है।
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}