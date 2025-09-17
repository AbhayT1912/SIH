import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage, SpeakerButton } from "./language-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { 
  Search,
  Filter,
  TrendingUp,
  Droplets,
  Sun,
  DollarSign,
  Leaf,
  Target,
  Clock,
  MapPin,
  Star,
  ArrowRight
} from "lucide-react";

interface CropRecommendation {
  id: string;
  name: string;
  nameHindi: string;
  image: string;
  profitMargin: number;
  estimatedYield: string;
  waterRequirement: 'low' | 'medium' | 'high';
  marketDemand: 'low' | 'medium' | 'high';
  climateSuitability: 'excellent' | 'good' | 'fair';
  season: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  investment: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
}

export function CropRecommendationsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("profit");
  const [filterSeason, setFilterSeason] = useState("all");

  const recommendations: CropRecommendation[] = [
    {
      id: '1',
      name: 'Wheat',
      nameHindi: 'गेहूं',
      image: 'https://media.gettyimages.com/id/171553200/photo/wheat-berries-background.jpg?s=612x612&w=0&k=20&c=907B7IcP8MieoXvLzLILSqy05gTjehDBcSb-R2Wzmj4=',
      profitMargin: 65000,
      estimatedYield: '22-24 क्विंटल/एकड़',
      waterRequirement: 'medium',
      marketDemand: 'high',
      climateSuitability: 'excellent',
      season: 'रबी',
      duration: '120-130 दिन',
      difficulty: 'easy',
      investment: 25000,
      riskLevel: 'low',
      description: 'स्थिर मांग और अच्छी कीमत के साथ पारंपरिक फसल'
    },
    {
      id: '2',
      name: 'Chickpea',
      nameHindi: 'चना',
      image: 'https://media.gettyimages.com/id/1942086498/photo/full-frame-macro-shot-of-chickpeas-background-food-texture.jpg?s=612x612&w=0&k=20&c=zLjXaUvILVOIqYU8cxgVERW4N4UJ45RmZfJce5-EJ3w=',
      profitMargin: 55000,
      estimatedYield: '12-15 क्विंटल/एकड़',
      waterRequirement: 'low',
      marketDemand: 'high',
      climateSuitability: 'excellent',
      season: 'रबी',
      duration: '95-110 दिन',
      difficulty: 'easy',
      investment: 20000,
      riskLevel: 'low',
      description: 'कम पानी की आवश्यकता, दलहन की बढ़ती मांग'
    },
    {
      id: '3',
      name: 'Mustard',
      nameHindi: 'सरसों',
      image: 'https://media.gettyimages.com/id/157608978/photo/corn.jpg?s=612x612&w=0&k=20&c=X6MWiwZw-qTF4NKW3KmPx9kcVDJSSmhaC5xztgsd9Ls=',
      profitMargin: 48000,
      estimatedYield: '18-20 क्विंटल/एकड़',
      waterRequirement: 'low',
      marketDemand: 'medium',
      climateSuitability: 'good',
      season: 'रबी',
      duration: '90-100 दिन',
      difficulty: 'easy',
      investment: 18000,
      riskLevel: 'medium',
      description: 'तेल की बढ़ती कीमत, कम निवेश'
    },
    {
      id: '4',
      name: 'Maize',
      nameHindi: 'मक्का',
      image: 'https://media.gettyimages.com/id/157608978/photo/corn.jpg?s=612x612&w=0&k=20&c=X6MWiwZw-qTF4NKW3KmPx9kcVDJSSmhaC5xztgsd9Ls=',
      profitMargin: 72000,
      estimatedYield: '25-30 क्विंटल/एकड़',
      waterRequirement: 'medium',
      marketDemand: 'high',
      climateSuitability: 'excellent',
      season: 'खरीफ',
      duration: '110-120 दिन',
      difficulty: 'medium',
      investment: 30000,
      riskLevel: 'medium',
      description: 'उच्च उत्पादन क्षमता, पशु आहार की मांग'
    },
    {
      id: '5',
      name: 'Potato',
      nameHindi: 'आलू',
      image: 'https://media.gettyimages.com/id/184878412/photo/soybean.jpg?s=612x612&w=0&k=20&c=y2ErWVIJEIZ2o_O2YGjfLHePuMLyRwf_5_felYaD-Qc=',
      profitMargin: 85000,
      estimatedYield: '200-250 क्विंटल/एकड़',
      waterRequirement: 'high',
      marketDemand: 'high',
      climateSuitability: 'good',
      season: 'रबी',
      duration: '90-110 दिन',
      difficulty: 'hard',
      investment: 45000,
      riskLevel: 'high',
      description: 'उच्च लाभ लेकिन अधिक जोखिम और निवेश'
    },
    {
      id: '6',
      name: 'Onion',
      nameHindi: 'प्याज',
      image: 'https://media.gettyimages.com/id/184878412/photo/soybean.jpg?s=612x612&w=0&k=20&c=y2ErWVIJEIZ2o_O2YGjfLHePuMLyRwf_5_felYaD-Qc=',
      profitMargin: 58000,
      estimatedYield: '150-180 क्विंटल/एकड़',
      waterRequirement: 'medium',
      marketDemand: 'high',
      climateSuitability: 'good',
      season: 'रबी',
      duration: '120-150 दिन',
      difficulty: 'medium',
      investment: 35000,
      riskLevel: 'medium',
      description: 'निरंतर मांग, अच्छी भंडारण क्षमता'
    },
    // === NEW ITEMS ADDED BELOW ===
    {
      id: '7',
      name: 'Soybean',
      nameHindi: 'सोयाबीन',
      image: 'https://media.gettyimages.com/id/184878412/photo/soybean.jpg?s=612x612&w=0&k=20&c=y2ErWVIJEIZ2o_O2YGjfLHePuMLyRwf_5_felYaD-Qc=',
      profitMargin: 60000,
      estimatedYield: '10-12 क्विंटल/एकड़',
      waterRequirement: 'medium',
      marketDemand: 'high',
      climateSuitability: 'excellent',
      season: 'खरीफ',
      duration: '90-100 दिन',
      difficulty: 'easy',
      investment: 22000,
      riskLevel: 'medium',
      description: 'प्रमुख तिलहन फसल, सरकारी खरीद का लाभ'
    },
    {
      id: '8',
      name: 'Paddy (Rice)',
      nameHindi: 'धान',
      image: 'https://media.gettyimages.com/id/1339259986/photo/raw-whole-rice-background.jpg?s=612x612&w=0&k=20&c=hIk5zO8rtmbIFNrTjV-DQPrI6pgSgA62Lsg9V-p_8_U=',
      profitMargin: 70000,
      estimatedYield: '25-28 क्विंटल/एकड़',
      waterRequirement: 'high',
      marketDemand: 'high',
      climateSuitability: 'good',
      season: 'खरीफ',
      duration: '120-140 दिन',
      difficulty: 'medium',
      investment: 32000,
      riskLevel: 'medium',
      description: 'भारत की मुख्य खाद्य फसल, स्थिर मांग'
    },
    {
      id: '9',
      name: 'Sugarcane',
      nameHindi: 'गन्ना',
      image: 'https://media.gettyimages.com/id/182159812/photo/detail-of-sugar-cane.jpg?s=612x612&w=0&k=20&c=8_i2iZugh1ReRjiExIObaqkRHYIaY9u8-4dfqDBJY3o=',
      profitMargin: 120000,
      estimatedYield: '400-500 क्विंटल/एकड़',
      waterRequirement: 'high',
      marketDemand: 'high',
      climateSuitability: 'good',
      season: 'वार्षिक',
      duration: '300-365 दिन',
      difficulty: 'hard',
      investment: 50000,
      riskLevel: 'medium',
      description: 'लंबी अवधि की फसल, चीनी मिलों से जुड़ाव'
    },
    {
      id: '10',
      name: 'Cotton',
      nameHindi: 'कपास',
      image: 'https://media.istockphoto.com/id/672093700/photo/uncleaned-cotton-harvest-from-farm.jpg?s=612x612&w=0&k=20&c=rXmJeqFonnHiVSU2-7LxSAWyNfdbncegqopHxHLrarI=',
      profitMargin: 75000,
      estimatedYield: '10-15 क्विंटल/एकड़',
      waterRequirement: 'medium',
      marketDemand: 'high',
      climateSuitability: 'excellent',
      season: 'खरीफ',
      duration: '150-180 दिन',
      difficulty: 'hard',
      investment: 40000,
      riskLevel: 'high',
      description: 'नकदी फसल, कपड़ा उद्योग की रीढ़, कीटों का खतरा'
    },
    {
      id: '11',
      name: 'Tomato',
      nameHindi: 'टमाटर',
      image: 'https://media.istockphoto.com/id/171589415/photo/tomatoes.jpg?s=612x612&w=0&k=20&c=meLJRFAyGEM6zt6dkpW7uM0x2Wvwr3THCzTA5mFQgFI=',
      profitMargin: 95000,
      estimatedYield: '300-400 क्विंटल/एकड़',
      waterRequirement: 'medium',
      marketDemand: 'high',
      climateSuitability: 'good',
      season: 'रबी/जायद',
      duration: '100-120 दिन',
      difficulty: 'medium',
      investment: 38000,
      riskLevel: 'high',
      description: 'उच्च लाभ की संभावना, बाजार भाव अस्थिर'
    },
    {
      id: '12',
      name: 'Pigeon Pea (Arhar)',
      nameHindi: 'अरहर (तुअर)',
      image: 'https://media.istockphoto.com/id/1010386252/photo/toor-dal.jpg?s=612x612&w=0&k=20&c=8XgBFT1xGcTpbjw_xJfmbCzyreEYcSsSuo9FY0r5ldE=',
      profitMargin: 52000,
      estimatedYield: '8-10 क्विंटल/एकड़',
      waterRequirement: 'low',
      marketDemand: 'high',
      climateSuitability: 'excellent',
      season: 'खरीफ',
      duration: '160-180 दिन',
      difficulty: 'easy',
      investment: 15000,
      riskLevel: 'low',
      description: 'प्रमुख दलहनी फसल, सूखे के प्रति सहनशील'
    }
  ];

  const getWaterIcon = (level: string) => {
    const color = level === 'low' ? 'text-green-600' : level === 'medium' ? 'text-yellow-600' : 'text-red-600';
    return <Droplets className={`w-4 h-4 ${color}`} />;
  };

  const getDemandIcon = (level: string) => {
    const color = level === 'high' ? 'text-green-600' : level === 'medium' ? 'text-yellow-600' : 'text-red-600';
    return <TrendingUp className={`w-4 h-4 ${color}`} />;
  };

  const getSuitabilityIcon = (level: string) => {
    const color = level === 'excellent' ? 'text-green-600' : level === 'good' ? 'text-yellow-600' : 'text-orange-600';
    return <Sun className={`w-4 h-4 ${color}`} />;
  };

  const getRiskBadge = (level: string) => {
    const colors: { [key: string]: string } = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800'
    };
    const labels: { [key: string]: string } = {
        low: 'कम जोखिम',
        medium: 'मध्यम जोखिम',
        high: 'उच्च जोखिम'
    };
    return <Badge className={colors[level]}>{labels[level]}</Badge>;
  };

  const sortedAndFilteredRecommendations = recommendations
    .filter(crop => {
      const matchesSearch = crop.nameHindi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            crop.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeason = filterSeason === 'all' || crop.season.includes(filterSeason);
      return matchesSearch && matchesSeason;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'profit':
          return b.profitMargin - a.profitMargin;
        case 'water':
          const waterOrder = { low: 1, medium: 2, high: 3 };
          return waterOrder[a.waterRequirement] - waterOrder[b.waterRequirement];
        case 'demand':
          const demandOrder = { high: 3, medium: 2, low: 1 };
          return demandOrder[b.marketDemand] - demandOrder[a.marketDemand];
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Poppins' }}>
              {t('crop-recommendations', 'फसल सुझाव')}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
              आपके खेत और जलवायु के अनुकूल सर्वोत्तम फसल विकल्प
            </p>
          </div>
          <div className="flex justify-end">
            <SpeakerButton text="फसल सुझाव - आपके लिए सबसे उपयुक्त फसलों की सूची" />
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 sm:mb-8"
      >
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col space-y-3 sm:space-y-4">
              {/* Search */}
              <div className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="फसल खोजें..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-sm sm:text-base h-9 sm:h-10"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Sort By */}
                <div className="w-full sm:w-48">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="text-sm sm:text-base h-9 sm:h-10">
                      <SelectValue placeholder="क्रमबद्ध करें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profit">सर्वाधिक लाभ</SelectItem>
                      <SelectItem value="water">कम पानी उपयोग</SelectItem>
                      <SelectItem value="demand">सर्वाधिक मांग</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter by Season */}
                <div className="w-full sm:w-48">
                  <Select value={filterSeason} onValueChange={setFilterSeason}>
                    <SelectTrigger className="text-sm sm:text-base h-9 sm:h-10">
                      <SelectValue placeholder="सीज़न चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">सभी सीज़न</SelectItem>
                      <SelectItem value="खरीफ">खरीफ</SelectItem>
                      <SelectItem value="रबी">रबी</SelectItem>
                      <SelectItem value="जायद">जायद</SelectItem>
                      <SelectItem value="वार्षिक">वार्षिक</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sortedAndFilteredRecommendations.map((crop, index) => (
          <motion.div
            key={crop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                <ImageWithFallback
                  src={crop.image}
                  alt={crop.nameHindi}
                  className="w-full h-36 sm:h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  {getRiskBadge(crop.riskLevel)}
                </div>
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                  <Badge className="bg-primary text-white text-xs sm:text-sm">
                    {crop.season}
                  </Badge>
                </div>
              </div>

              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl" style={{ fontFamily: 'Poppins' }}>
                    {crop.nameHindi}
                  </CardTitle>
                  <SpeakerButton text={`${crop.nameHindi} - अनुमानित लाभ ${crop.profitMargin} रुपए प्रति एकड़`} />
                </div>
                <p className="text-xs sm:text-sm text-gray-600">{crop.name}</p>
              </CardHeader>

              <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
                {/* Profit Margin */}
                <div className="bg-green-50 p-2.5 sm:p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">अनुमानित लाभ</span>
                    <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">
                    ₹{crop.profitMargin.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">प्रति एकड़</p>
                </div>

                {/* Estimated Yield */}
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">अनुमानित उत्पादन</span>
                  <span className="text-xs sm:text-sm font-semibold">{crop.estimatedYield}</span>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="text-center p-1.5 sm:p-2 bg-gray-50 rounded">
                    {getWaterIcon(crop.waterRequirement)}
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-1">पानी</p>
                    <p className="text-[10px] sm:text-xs font-medium capitalize">{crop.waterRequirement}</p>
                  </div>
                  <div className="text-center p-1.5 sm:p-2 bg-gray-50 rounded">
                    {getDemandIcon(crop.marketDemand)}
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-1">मांग</p>
                    <p className="text-[10px] sm:text-xs font-medium capitalize">{crop.marketDemand}</p>
                  </div>
                  <div className="text-center p-1.5 sm:p-2 bg-gray-50 rounded">
                    {getSuitabilityIcon(crop.climateSuitability)}
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-1">जलवायु</p>
                    <p className="text-[10px] sm:text-xs font-medium capitalize">{crop.climateSuitability}</p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">अवधि:</span>
                    <span className="text-xs sm:text-sm font-medium">{crop.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">निवेश:</span>
                    <span className="text-xs sm:text-sm font-medium">₹{crop.investment.toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600">{crop.description}</p>

                {/* Action Button */}
                <Button className="w-full group-hover:bg-primary/90 transition-colors h-8 sm:h-9 text-xs sm:text-sm">
                  <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  विस्तृत जानकारी
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {sortedAndFilteredRecommendations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 sm:py-12"
        >
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Search className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">कोई फसल नहीं मिली</h3>
          <p className="text-sm sm:text-base text-gray-600">कृपया अन्य खोज शब्द या फिल्टर का उपयोग करें</p>
        </motion.div>
      )}
    </div>
  );
}