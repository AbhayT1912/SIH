import { Page } from './navigation';

export interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export interface DashboardVariant {
  id: number;
  name: string;
  component: React.ComponentType<DashboardProps>;
}

export interface AppContentProps {
  currentPage: Page;
  activeVariation: number;
  setActiveVariation: (variation: number) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  handleNavigation: (page: Page) => void;
}