import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { 
  Search, 
  TrendingUp, 
  TrendingDown,
  MapPin,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Filter,
  RefreshCw,
  Bell
} from "lucide-react";

interface CropPrice {
  id: string;
  name: string;
  nameHindi: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  market: string;
  image: string;
  trending?: boolean;
  category: string;
  unit: string;
  lastUpdated: string;
  weeklyData: number[];
  monthlyData: number[];
}

export function MarketPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMarket, setSelectedMarket] = useState<'local' | 'national'>('local');
  const [selectedCrop, setSelectedCrop] = useState<CropPrice | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change'>('change');

  // Sample market data with corrected image URLs
  const cropsData: CropPrice[] = [
    {
      id: '1',
      name: 'Soybean',
      nameHindi: 'सोयाबीन',
      currentPrice: 5250,
      previousPrice: 5200,
      change: 50,
      changePercent: 0.96,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/184878412/photo/soybean.jpg?s=612x612&w=0&k=20&c=y2ErWVIJEIZ2o_O2YGjfLHePuMLyRwf_5_felYaD-Qc=',
      trending: true,
      category: 'Oil Seeds',
      unit: 'क्विंटल',
      lastUpdated: '2 hours ago',
      weeklyData: [5100, 5150, 5200, 5180, 5220, 5200, 5250],
      monthlyData: [4800, 4900, 5000, 5100, 5250]
    },
    {
      id: '2',
      name: 'Wheat',
      nameHindi: 'गेहूं',
      currentPrice: 2150,
      previousPrice: 2180,
      change: -30,
      changePercent: -1.38,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/171553200/photo/wheat-berries-background.jpg?s=612x612&w=0&k=20&c=907B7IcP8MieoXvLzLILSqy05gTjehDBcSb-R2Wzmj4=',
      trending: false,
      category: 'Cereals',
      unit: 'क्विंटल',
      lastUpdated: '1 hour ago',
      weeklyData: [2200, 2190, 2180, 2170, 2160, 2180, 2150],
      monthlyData: [2300, 2250, 2200, 2180, 2150]
    },
    {
      id: '3',
      name: 'Maize',
      nameHindi: 'मक्का',
      currentPrice: 1850,
      previousPrice: 1820,
      change: 30,
      changePercent: 1.65,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/1367012328/photo/corn-kernels-background.jpg?s=612x612&w=0&k=20&c=BhVNe_ZhsFUn-swNNS9sBT9-IO3Q_oFyc9QbeGVqCOo=',
      trending: true,
      category: 'Cereals',
      unit: 'क्विंटल',
      lastUpdated: '3 hours ago',
      weeklyData: [1800, 1810, 1820, 1815, 1825, 1820, 1850],
      monthlyData: [1750, 1780, 1800, 1820, 1850]
    },
    {
      id: '4',
      name: 'Cotton',
      nameHindi: 'कपास',
      currentPrice: 6800,
      previousPrice: 6750,
      change: 50,
      changePercent: 0.74,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/1350905388/photo/close-up-of-roasted-coffee-beans-on-table.jpg?s=612x612&w=0&k=20&c=erUXgH19718Q_R0TljP0mm9URC0Z6zjKm-ha9cieo38=',
      trending: false,
      category: 'Cash Crops',
      unit: 'क्विंटल',
      lastUpdated: '4 hours ago',
      weeklyData: [6700, 6720, 6750, 6740, 6760, 6750, 6800],
      monthlyData: [6500, 6600, 6700, 6750, 6800]
    },
    {
      id: '5',
      name: 'Gram',
      nameHindi: 'चना',
      currentPrice: 6300,
      previousPrice: 6350,
      change: -50,
      changePercent: -0.79,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/1350905388/photo/close-up-of-roasted-coffee-beans-on-table.jpg?s=612x612&w=0&k=20&c=erUXgH19718Q_R0TljP0mm9URC0Z6zjKm-ha9cieo38=',
      trending: false,
      category: 'Pulses',
      unit: 'क्विंटल',
      lastUpdated: '30 mins ago',
      weeklyData: [6400, 6380, 6350, 6360, 6340, 6350, 6300],
      monthlyData: [6500, 6450, 6400, 6350, 6300]
    },
    {
      id: '6',
      name: 'Paddy (Basmati)',
      nameHindi: 'धान (बासमती)',
      currentPrice: 3800,
      previousPrice: 3750,
      change: 50,
      changePercent: 1.33,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/1467955075/photo/mustard-seed-harvest.jpg?s=612x612&w=0&k=20&c=OMQvuuFdE3ck2F3tGrdPTCpLNIyDPAreJIRWGvxgIgg=',
      trending: true,
      category: 'Cereals',
      unit: 'क्विंटल',
      lastUpdated: '5 hours ago',
      weeklyData: [3700, 3720, 3750, 3740, 3760, 3750, 3800],
      monthlyData: [3600, 3650, 3700, 3750, 3800]
    },
    {
      id: '7',
      name: 'Mustard',
      nameHindi: 'सरसों',
      currentPrice: 5850,
      previousPrice: 5800,
      change: 50,
      changePercent: 0.86,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/1467955075/photo/mustard-seed-harvest.jpg?s=612x612&w=0&k=20&c=OMQvuuFdE3ck2F3tGrdPTCpLNIyDPAreJIRWGvxgIgg=',
      trending: false,
      category: 'Oil Seeds',
      unit: 'क्विंटल',
      lastUpdated: '1 hour ago',
      weeklyData: [5750, 5780, 5800, 5790, 5820, 5800, 5850],
      monthlyData: [5600, 5700, 5750, 5800, 5850]
    },
    {
      id: '8',
      name: 'Turmeric',
      nameHindi: 'हल्दी',
      currentPrice: 16500,
      previousPrice: 16200,
      change: 300,
      changePercent: 1.85,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/646696672/photo/close-up-of-turmeric.jpg?s=612x612&w=0&k=20&c=HTY0dFeLbYslyOldrplKt_BmmT_ltX43ndbRacKiqGM=',
      trending: true,
      category: 'Spices',
      unit: 'क्विंटल',
      lastUpdated: '6 hours ago',
      weeklyData: [15800, 16000, 16200, 16100, 16300, 16200, 16500],
      monthlyData: [15000, 15500, 16000, 16200, 16500]
    },
    {
      id: '9',
      name: 'Lentil',
      nameHindi: 'मसूर',
      currentPrice: 6100,
      previousPrice: 6150,
      change: -50,
      changePercent: -0.81,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/1715808882/photo/the-lentil-or-masoor-dal-is-an-edible-legume-in-cuisines-of-the-indian-subcontinent-where.jpg?s=612x612&w=0&k=20&c=iq6_tnpzIlaFC0h5tlcgC8f6ceZYEDyGR-iiQrJYWnU=',
      trending: false,
      category: 'Pulses',
      unit: 'क्विंटल',
      lastUpdated: '2 hours ago',
      weeklyData: [6200, 6180, 6150, 6160, 6140, 6150, 6100],
      monthlyData: [6300, 6250, 6200, 6150, 6100]
    },
    {
      id: '10',
      name: 'Onion',
      nameHindi: 'प्याज',
      currentPrice: 2800,
      previousPrice: 2700,
      change: 100,
      changePercent: 3.70,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/171158822/photo/red-onions-background.jpg?s=612x612&w=0&k=20&c=-jkt0464Xku9H0_eSrcz6RJc8TqeQwUFNI2AF9oFGL8=',
      trending: true,
      category: 'Vegetables',
      unit: 'क्विंटल',
      lastUpdated: '45 mins ago',
      weeklyData: [2600, 2650, 2700, 2680, 2720, 2700, 2800],
      monthlyData: [2400, 2500, 2600, 2700, 2800]
    },
    {
      id: '11',
      name: 'Potato',
      nameHindi: 'आलू',
      currentPrice: 1650,
      previousPrice: 1700,
      change: -50,
      changePercent: -2.94,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/1224918845/photo/farmers-market-organic-potatoes.jpg?s=612x612&w=0&k=20&c=OKNglpi8Cc1IG78-jXiws2E-8qNKb7dJGB2nXvdncfM=',
      trending: false,
      category: 'Vegetables',
      unit: 'क्विंटल',
      lastUpdated: '3 hours ago',
      weeklyData: [1750, 1720, 1700, 1710, 1680, 1700, 1650],
      monthlyData: [1800, 1750, 1700, 1680, 1650]
    },
    {
      id: '12',
      name: 'Garlic',
      nameHindi: 'लहसुन',
      currentPrice: 14000,
      previousPrice: 13800,
      change: 200,
      changePercent: 1.45,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/454629131/photo/garlic.jpg?s=612x612&w=0&k=20&c=NSu-Qg1tAZ6mJin_FiKfUCLmIbxoGYeTVMCdEybjvTo=',
      trending: true,
      category: 'Spices',
      unit: 'क्विंटल',
      lastUpdated: '7 hours ago',
      weeklyData: [13500, 13600, 13800, 13750, 13850, 13800, 14000],
      monthlyData: [13000, 13200, 13500, 13800, 14000]
    },
    {
      id: '13',
      name: 'Coriander',
      nameHindi: 'धनिया',
      currentPrice: 7200,
      previousPrice: 7250,
      change: -50,
      changePercent: -0.69,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/170931923/photo/group-on-cilantro-tied-together.jpg?s=612x612&w=0&k=20&c=LwCbYdyJlbyToiB6B51hFLPw_pU9yFjw1pe2Db2X2Zc=',
      trending: false,
      category: 'Spices',
      unit: 'क्विंटल',
      lastUpdated: '2 hours ago',
      weeklyData: [7300, 7280, 7250, 7260, 7240, 7250, 7200],
      monthlyData: [7400, 7350, 7300, 7250, 7200]
    },
    {
      id: '14',
      name: 'Sugarcane',
      nameHindi: 'गन्ना',
      currentPrice: 380,
      previousPrice: 375,
      change: 5,
      changePercent: 1.33,
      market: 'Itarsi Mandi',
      image: 'https://media.gettyimages.com/id/182159812/photo/detail-of-sugar-cane.jpg?s=612x612&w=0&k=20&c=8_i2iZugh1ReRjiExIObaqkRHYIaY9u8-4dfqDBJY3o=',
      trending: false,
      category: 'Cash Crops',
      unit: 'क्विंटल',
      lastUpdated: '8 hours ago',
      weeklyData: [370, 372, 375, 374, 376, 375, 380],
      monthlyData: [360, 365, 370, 375, 380]
    }
  ];

  const featuredCrops = cropsData.filter(crop => crop.trending).slice(0, 3);

  const filteredCrops = cropsData.filter(crop =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.nameHindi.includes(searchQuery)
  );

  const sortedCrops = [...filteredCrops].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.nameHindi.localeCompare(b.nameHindi);
      case 'price':
        return b.currentPrice - a.currentPrice;
      case 'change':
        return b.changePercent - a.changePercent;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Poppins' }}>
              बाजार भाव
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">आज की ताजी कीमतें और बाजार का विश्लेषण</p>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              रीफ्रेश करें
            </Button>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              अलर्ट सेट करें
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-2.5 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <Input
            placeholder="फसल खोजें जैसे सोयाबीन..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-2 sm:py-3 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Market Toggle */}
      <div className="mb-6">
        <Tabs value={selectedMarket} onValueChange={(value) => setSelectedMarket(value as any)}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="local">स्थानीय बाजार</TabsTrigger>
            <TabsTrigger value="national">राष्ट्रीय औसत</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Featured Crops Carousel */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">आज की खास फसलें</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {featuredCrops.map((crop) => (
            <motion.div
              key={crop.id}
              whileHover={{ scale: 1.02, y: -2 }}
              className="cursor-pointer"
              onClick={() => setSelectedCrop(crop)}
            >
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all">
                <div className="relative h-24 sm:h-32">
                  <ImageWithFallback
                    src={crop.image}
                    alt={crop.nameHindi}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-yellow-500 text-white text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      ट्रेंडिंग
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm sm:text-base">{crop.nameHindi}</h3>
                    <div className="flex items-center">
                      {crop.changePercent > 0 ? (
                        <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                      )}
                      <span className={`text-xs sm:text-sm ${
                        crop.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {crop.changePercent > 0 ? '+' : ''}{crop.changePercent}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-primary">₹{crop.currentPrice.toLocaleString()}</p>
                      <p className="text-xs sm:text-sm text-gray-600">प्रति {crop.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs sm:text-sm text-gray-600">{crop.market}</p>
                      <div className="w-16 sm:w-20">
                        <SimpleSparkline data={crop.weeklyData} color={crop.changePercent > 0 ? '#10B981' : '#EF4444'} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Crops List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <CardTitle className="text-base sm:text-lg">सभी फसलों की कीमतें</CardTitle>
              <div className="flex items-center space-x-2">
                <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs sm:text-sm border rounded px-2 py-1"
                >
                  <option value="change">परिवर्तन के अनुसार</option>
                  <option value="price">कीमत के अनुसार</option>
                  <option value="name">नाम के अनुसार</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {sortedCrops.map((crop) => (
                  <motion.div
                    key={crop.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedCrop(crop)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all space-y-2 sm:space-y-0"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={crop.image}
                          alt={crop.nameHindi}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm sm:text-base">{crop.nameHindi}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{crop.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end sm:space-x-4 lg:space-x-6">
                      <div className="text-right">
                        <p className="font-bold text-sm sm:text-base">₹{crop.currentPrice.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">प्रति {crop.unit}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className={`flex items-center ${
                          crop.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {crop.changePercent > 0 ? (
                            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          )}
                          <span className="font-medium text-xs sm:text-sm">
                            {crop.changePercent > 0 ? '+' : ''}₹{Math.abs(crop.change)}
                          </span>
                        </div>
                        <p className={`text-xs sm:text-sm ${
                          crop.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {crop.changePercent > 0 ? '+' : ''}{crop.changePercent}%
                        </p>
                      </div>

                      <div className="hidden sm:block w-16 sm:w-20 h-8 sm:h-10">
                        <SimpleSparkline 
                          data={crop.weeklyData} 
                          color={crop.changePercent > 0 ? '#10B981' : '#EF4444'} 
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Insights Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                बाजार सूझ-बूझ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="p-2.5 sm:p-3 bg-green-50 rounded-lg">
                <div className="flex items-center text-green-700 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  <span className="font-medium text-sm sm:text-base">तेजी</span>
                </div>
                <p className="text-xs sm:text-sm text-green-600">सोयाबीन और मसालों की कीमतों में वृद्धि</p>
              </div>
              
              <div className="p-2.5 sm:p-3 bg-red-50 rounded-lg">
                <div className="flex items-center text-red-700 mb-1">
                  <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  <span className="font-medium text-sm sm:text-base">मंदी</span>
                </div>
                <p className="text-xs sm:text-sm text-red-600">गेहूं और दालों की मांग में कमी</p>
              </div>

              <div className="p-2.5 sm:p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center text-blue-700 mb-1">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  <span className="font-medium text-sm sm:text-base">मौसमी सुझाव</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-600">रबी की तैयारी का समय, बुवाई की योजना बनाएं</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">मंडी की जानकारी</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">स्थान</span>
                  <span className="font-medium text-sm sm:text-base">इटारसी मंडी</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">दूरी</span>
                  <span className="font-medium text-sm sm:text-base">15 किमी</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">समय</span>
                  <span className="font-medium text-sm sm:text-base">सुबह 6-12 बजे</span>
                </div>
                <Button variant="outline" className="w-full mt-3 sm:mt-4 text-xs sm:text-sm h-8 sm:h-9">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  दिशा देखें
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Crop Detail Modal */}
      {selectedCrop && (
        <CropDetailModal 
          crop={selectedCrop}
          isOpen={!!selectedCrop}
          onClose={() => setSelectedCrop(null)}
        />
      )}
    </div>
  );
}

function SimpleSparkline({ data, color }: { data: number[], color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = range === 0 ? 50 : 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
}

function CropDetailModal({ crop, isOpen, onClose }: {
  crop: CropPrice,
  isOpen: boolean,
  onClose: () => void
}) {
  if (!crop) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg max-w-4xl w-[95%] max-h-[90vh] overflow-auto m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden">
                <ImageWithFallback
                  src={crop.image}
                  alt={crop.nameHindi}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">{crop.nameHindi}</h2>
                <p className="text-sm sm:text-base text-gray-600">{crop.name} • {crop.category}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onClose} className="text-xs sm:text-sm h-8 sm:h-9">बंद करें</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">मूल्य ट्रेंड</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 sm:h-64 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-primary mb-3 sm:mb-4" />
                      <p className="text-base sm:text-lg font-medium">Interactive Chart</p>
                      <p className="text-xs sm:text-sm text-gray-600">7-day, 1-month, 6-month trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">वर्तमान कीमत</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-primary">
                      ₹{crop.currentPrice.toLocaleString()}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">प्रति {crop.unit}</p>
                    <div className={`flex items-center justify-center mt-2 ${
                      crop.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {crop.changePercent > 0 ? (
                        <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                      )}
                      <span className="text-xs sm:text-sm">{crop.changePercent > 0 ? '+' : ''}₹{Math.abs(crop.change)} ({crop.changePercent}%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">बाजार की जानकारी</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm">मंडी</span>
                    <span className="font-medium text-xs sm:text-sm">{crop.market}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm">अंतिम अपडेट</span>
                    <span className="font-medium text-xs sm:text-sm">{crop.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm">श्रेणी</span>
                    <span className="font-medium text-xs sm:text-sm">{crop.category}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}