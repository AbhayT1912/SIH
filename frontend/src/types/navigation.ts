export type Page = 'onboarding' | 'dashboard' | 'calendar' | 'market' | 'plant-analysis' | 'my-farm' | 'yield-prediction' | 'crop-recommendations' | 'inventory';

export interface NavigationProps {
  onNavigate: (page: Page) => void;
}