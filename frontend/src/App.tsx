import { useState } from "react";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { TopNavigation, WeatherHeader } from "./components/navigation";
import { OnboardingFlow } from "./components/onboarding";
import { CalendarPage } from "./components/calendar-page";
import { MarketPage } from "./components/market-page";
import { PlantAnalysisPage } from "./components/plant-analysis";
import { MyFarmPage } from "./components/my-farm-page";
import { BalancedDashboard } from "./components/balanced-dashboard";
import { YieldPredictionPage } from "./components/yield-prediction-page";
import { EnhancedYieldPredictionPage } from "./components/enhanced-yield-prediction-page";
import { PreciseYieldPrediction } from "./components/precise-yield-prediction";
import { CropRecommendationsPage } from "./components/crop-recommendations-page";
import { InventoryPage } from "./components/inventory-page";
import { AIChatAssistant } from "./components/ai-chat";
import { LanguageProvider, useLanguage } from "./components/language-context";
import { 
  DashboardVariation1, 
  DashboardVariation2, 
  DashboardVariation3 
} from "./components/dashboard-variants";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { 
  LayoutDashboard, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  User,
  Languages,
  Leaf,
  MessageCircle,
  Package,
  Target
} from "lucide-react";
import React from 'react';
import { Routes, Route } from 'react-router-dom';

type Page = 'onboarding' | 'dashboard' | 'calendar' | 'market' | 'plant-analysis' | 'my-farm' | 'yield-prediction' | 'crop-recommendations' | 'inventory';
type Language = 'hi' | 'en' | 'mr';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('onboarding');
  const [activeVariation, setActiveVariation] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOnboardingComplete = () => {
    setCurrentPage('dashboard');
  };

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
  };

  // Show onboarding first
  if (currentPage === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
  

      <LanguageProvider>
        <AppContent
          currentPage={currentPage}
          activeVariation={activeVariation}
          setActiveVariation={setActiveVariation}
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
          handleNavigation={handleNavigation}
        />
      </LanguageProvider>
    </>
  );
}

function AppContent({ 
  currentPage, 
  activeVariation, 
  setActiveVariation, 
  isChatOpen, 
  setIsChatOpen, 
  handleNavigation 
}: {
  currentPage: Page;
  activeVariation: number;
  setActiveVariation: (variation: number) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  handleNavigation: (page: Page) => void;
}) {
  const { t } = useLanguage();
  const variations = [
    { id: 1, name: "Balanced Grid", component: BalancedDashboard },
    { id: 2, name: "Feed Style", component: DashboardVariation2 },
    { id: 3, name: "Data-Centric", component: DashboardVariation3 }
  ];

  const ActiveComponent = variations.find(v => v.id === activeVariation)?.component || BalancedDashboard;

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'calendar':
        return <CalendarPage />;
      case 'market':
        return <MarketPage />;
      case 'plant-analysis':
        return <PlantAnalysisPage />;
      case 'my-farm':
        return <MyFarmPage />;

      case 'yield-prediction':
        return <PreciseYieldPrediction onBack={() => setCurrentPage('dashboard')} />;
      case 'crop-recommendations':
        return <CropRecommendationsPage />;
      case 'inventory':
        return <InventoryPage />;

      case 'dashboard':
      default:
        return (
          <>
            {/* Variation Selector - Only show for dashboard */}
            <div className="bg-white border-b border-gray-200 px-4 py-3">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Poppins' }}>
                      {t('dashboard-layout-variations')}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {t('choose-preferred-layout')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {variations.map((variation) => (
                      <Button
                        key={variation.id}
                        variant={activeVariation === variation.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveVariation(variation.id)}
                        className="relative"
                      >
                        {t(variation.id === 1 ? 'balanced-grid' : variation.id === 2 ? 'feed-style' : 'data-centric')}
                        {activeVariation === variation.id && (
                          <Badge className="ml-2 text-xs bg-accent text-accent-foreground">
                            {t('active')}
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <ActiveComponent onNavigate={handleNavigation} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigationWithRouter currentPage={currentPage} onNavigate={handleNavigation} />
      <WeatherHeader />
      
      {/* Main Content */}
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>

      {/* AI Chat Assistant */}
      <AIChatAssistant 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            {t('copyright-text')}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t('tagline')}
          </p>
        </div>
      </footer>
    </div>
  );
}

// Enhanced Navigation with routing
function TopNavigationWithRouter({ currentPage, onNavigate }: { 
  currentPage: Page, 
  onNavigate: (page: Page) => void 
}) {
  const { language, setLanguage, t } = useLanguage();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getLanguageDisplay = (lang: Language) => {
    switch (lang) {
      case 'hi': return 'हिंदी (Hindi)';
      case 'en': return 'English';
      case 'mr': return 'मराठी (Marathi)';
      default: return 'हिंदी (Hindi)';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold">फ</span>
          </div>
          <span className="text-xl font-semibold text-primary" style={{ fontFamily: 'Poppins' }}>
            FasalSaathi
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            className={currentPage === 'dashboard' ? 'text-primary bg-primary/10' : ''}
            onClick={() => onNavigate('dashboard')}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            {t('dashboard')}
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            className={currentPage === 'my-farm' ? 'text-primary bg-primary/10' : ''}
            onClick={() => onNavigate('my-farm')}
          >
            <MapPin className="w-4 h-4 mr-2" />
            {t('my-farm')}
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            className={currentPage === 'calendar' ? 'text-primary bg-primary/10' : ''}
            onClick={() => onNavigate('calendar')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t('calendar')}
          </Button>
          
          {/* Dropdown for More Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                {t('more')}
                <TrendingUp className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onNavigate('market')}>
                <TrendingUp className="w-4 h-4 mr-2" />
                {t('market-prices')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('crop-recommendations')}>
                <Leaf className="w-4 h-4 mr-2" />
                {t('crop-recommendations')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('inventory')}>
                <Package className="w-4 h-4 mr-2" />
                {t('inventory')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('plant-analysis')}>
                <Target className="w-4 h-4 mr-2" />
                {t('plant-analysis')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost"
            size="sm"
            className="bg-accent/20 hover:bg-accent/30 text-primary font-medium"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {t('ask-saathi')}
          </Button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Languages className="w-4 h-4 mr-2" />
                {getLanguageDisplay(language)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage("hi")}>
                🇮🇳 हिंदी (Hindi)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                🇺🇸 English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("mr")}>
                🇮🇳 मराठी (Marathi)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarFallback className="bg-primary text-white">R</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                {t('profile')}
              </DropdownMenuItem>
              <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
              <DropdownMenuItem>{t('logout')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* AI Chat Assistant - add it here too */}
        <AIChatAssistant 
          isOpen={isChatOpen} 
          onToggle={() => setIsChatOpen(!isChatOpen)} 
        />
      </div>
    </nav>
  );
}

// Main App component with routing
const MainApp: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<div>Welcome to FasalSaathi</div>} />
      </Routes>
    </div>
  );
};