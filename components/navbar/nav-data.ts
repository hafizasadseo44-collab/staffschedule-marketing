import { 
  Calendar, 
  Clock, 
  Users, 
  Bell, 
  BarChart3, 
  Utensils, 
  ShoppingBag, 
  HeartPulse, 
  ShieldCheck,
  BookOpen,
  FileText,
  Users2,
  HelpCircle,
  LucideIcon,
  Building2,
  Target,
  Briefcase,
  Newspaper
} from "lucide-react";

export interface NavItemType {
  title: string;
  description?: string;
  href: string;
  icon?: LucideIcon;
}

export interface MegaMenuCategory {
  title: string;
  items: NavItemType[];
}

export const PLATFORM_ITEMS: NavItemType[] = [
  {
    title: "Scheduling",
    description: "Automated dragging & drop shifts.",
    href: "/employee-schedule-maker",
    icon: Calendar,
  },
  {
    title: "Time Tracking",
    description: "Clock in from any device with GPS.",
    href: "/features/attendance",
    icon: Clock,
  },
  {
    title: "Payroll Connect",
    description: "Sync with ADP, Gusto & more.",
    href: "/features/payroll",
    icon: FileText,
  },
  {
    title: "Compliance",
    description: "Stay ahead of labor laws & OT.",
    href: "/features/compliance",
    icon: ShieldCheck,
  },
  {
    title: "Team Comms",
    description: "Instant alerts for shift changes.",
    href: "/features/announcements",
    icon: Bell,
  },
  {
    title: "AI Forecasting",
    description: "Predict demand with 98% accuracy.",
    href: "/features/ai",
    icon: BarChart3,
  },
];

export const SOLUTIONS_ITEMS: NavItemType[] = [
  {
    title: "Restaurants",
    description: "Staffing flow for busy kitchens.",
    href: "/solutions/hospitality",
    icon: Utensils,
  },
  {
    title: "Retail",
    description: "Scale your storefront workforce.",
    href: "/solutions/retail",
    icon: ShoppingBag,
  },
  {
    title: "Healthcare",
    description: "Critical shift coverage for clinics.",
    href: "/solutions/healthcare",
    icon: HeartPulse,
  },
  {
    title: "Security",
    description: "Precision scheduling for patrol.",
    href: "/solutions/security",
    icon: ShieldCheck,
  },
];

export const RESOURCES_ITEMS: NavItemType[] = [
  {
    title: "Blog",
    description: "Industry news and ops tips.",
    href: "/blog",
    icon: BookOpen,
  },
  {
    title: "Guides",
    description: "Step-by-step staffing blueprints.",
    href: "/guides",
    icon: FileText,
  },
  {
    title: "Case Studies",
    description: "Real-world ROI transformation.",
    href: "/customer-success",
    icon: Users2,
  },
/* {
    title: "Help Center",
    description: "Technical support & documentation.",
    href: "https://help.staffschedule.io",
    icon: HelpCircle,
  }, */
];

export const COMPANY_ITEMS: NavItemType[] = [
  {
    title: "About Us",
    description: "Our story and leadership team.",
    href: "/about",
    icon: Building2,
  },
  {
    title: "Mission & Values",
    description: "What drives us every single day.",
    href: "/about/mission",
    icon: Target,
  },
  {
    title: "Careers",
    description: "Join our fast-growing global team.",
    href: "/about/careers",
    icon: Briefcase,
  },
  {
    title: "Newsroom",
    description: "The latest press and announcements.",
    href: "/about/news",
    icon: Newspaper,
  },
];

export const STATIC_LINKS = [
  { title: "Pricing", href: "/pricing" },
  { title: "Contact", href: "/contact" },
];
