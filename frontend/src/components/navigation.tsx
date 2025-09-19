import { useState } from "react";
import { Button } from "./ui/button";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  LayoutDashboard, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  User,
  Languages,
  Sun,
  CloudRain,
  Leaf,
  Droplets,
  Menu,
  X
} from "lucide-react";

export function TopNavigation() {
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationLinks = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard", primary: true },
    { icon: <MapPin className="w-4 h-4" />, label: "My Farm" },
    { icon: <Calendar className="w-4 h-4" />, label: "Calendar" },
    { icon: <TrendingUp className="w-4 h-4" />, label: "Market Prices" },
    { icon: <Leaf className="w-4 h-4" />, label: "Analyze Plant" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold">फ</span>
          </div>
          <span className="text-xl font-semibold text-primary" style={{ fontFamily: 'Poppins' }}>
            FasalSaathi
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navigationLinks.map((link, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`px-3 ${link.primary ? 'text-primary' : ''}`}
              size="sm"
            >
              <span className="mr-2">{link.icon}</span>
              <span className="hidden xl:inline">{link.label}</span>
            </Button>
          ))}
        </div>

        {/* Mobile/Tablet Menu Button and Dropdown */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {navigationLinks.map((link, index) => (
                <DropdownMenuItem key={index} className="flex items-center p-2">
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Languages className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">हिंदी</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedLanguage("hi")}>
                🇮🇳 हिंदी
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedLanguage("en")}>
                🇺🇸 English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedLanguage("mr")}>
                🇮🇳 मराठी
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
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button for Small Screens */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader className="mb-4">
                <SheetTitle>Menu</SheetTitle>
                <div className="flex items-center mt-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-white">R</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Ramesh</p>
                    <p className="text-xs text-gray-500">farmer@example.com</p>
                  </div>
                </div>
              </SheetHeader>

              {/* Weather Information */}
              <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-600" />
                    <span className="text-sm">Bhopal, MP</span>
                  </div>
                  {/* <div className="flex items-center">
                    <CloudRain className="w-4 h-4 mr-1 text-gray-600" />
                    <span className="text-sm font-semibold">26°C</span>
                  </div> */}
                </div>
                {/* <div className="flex items-center justify-between"> */}
                  {/* <span className="text-xs text-gray-600">Partly Cloudy</span>
                  <div className="flex items-center">
                    <Droplets className="w-4 h-4 mr-1 text-blue-500" />
                    <span className="text-xs">60% Humidity</span>
                  </div>
                </div> */}
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-2 mb-6">
                {navigationLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`justify-start ${link.primary ? 'text-primary' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    <span className="ml-2">{link.label}</span>
                  </Button>
                ))}
              </div>

              {/* Language Selector */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Select Language</p>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedLanguage("hi");
                      setIsMenuOpen(false);
                    }}
                  >
                    🇮🇳 हिंदी
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedLanguage("en");
                      setIsMenuOpen(false);
                    }}
                  >
                    🇺🇸 English
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedLanguage("mr");
                      setIsMenuOpen(false);
                    }}
                  >
                    🇮🇳 मराठी
                  </Button>
                </div>
              </div>

              {/* User Actions */}
              <div className="border-t pt-4">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-600" onClick={() => setIsMenuOpen(false)}>
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export function WeatherHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 px-4 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800" style={{ fontFamily: 'Poppins' }}>
              शुभ प्रभात, Anand! 
            </h1>
            <p className="text-gray-600 flex items-center mt-1 text-sm sm:text-base">
              <MapPin className="w-4 h-4 mr-1" />
              Bhopal, MP
            </p>
          </div>
          
          {/* <div className="flex items-center justify-between sm:justify-end sm:space-x-6 bg-white/50 p-2 sm:p-0 rounded-lg sm:rounded-none sm:bg-transparent">
            <div className="text-left sm:text-right">
              <div className="flex items-center">
                <CloudRain className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-lg sm:text-xl font-semibold">26°C</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Partly Cloudy</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="flex items-center">
                <Droplets className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm">60%</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Humidity</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}