import { TouchableOpacityProps } from "react-native";

export interface OnboardingLayoutProps {
  headerText: React.ReactNode;
  heroText: string;
  ctaText: string;
  skippable?: Boolean;
}

export interface ButtonProps extends TouchableOpacityProps {
  variant?:
    | "highlight" //piros
    | "highlight-light" //világos piros
    | "highlight-dark" //sötét piros
    | "transparent" //fill és border nélkül
    | "outline"; //csak border
  type?: 
     "icon" //kerek, w=h
   | "fit" //tartalom szélességéhez igazodik
   | "fill"; //container szélességéhez igazodik
  children?: React.ReactNode;
  hapticFeedback?: | "light" | "medium" | "heavy";
}
