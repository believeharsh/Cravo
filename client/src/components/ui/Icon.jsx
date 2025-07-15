import React from "react";
import {
  // Importing all the lucide icons that are being used thorugh out the app
  ArrowLeft,
  Menu,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star, 
  Heart, 
  Bell, 
  Home,
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ShoppingCart,
  User,
  Tag,
  Search,
  Building2,
  X,
  ChevronDown,
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube,
  ShoppingBag,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

// A map from a friendly string name to the actual Lucide React component
const iconMap = {
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "search": Search,
  "shopping-cart": ShoppingCart,
  "user": User,
  "map-pin": MapPin,
  "star": Star,
  "heart": Heart,
  "bell": Bell,
  "home": Home,
  "menu": Menu,
  "x": X, 
  "check-circle": CheckCircle,
  "alert-circle": AlertCircle,
  "clock": Clock,
  "help-circle" : HelpCircle,
  "tag" : Tag, 
  "building2" : Building2 , 
  "menu" : Menu , 
  "chevrondown" : ChevronDown ,
  "facebook" : Facebook, 
  "instagram" : Instagram , 
  "twitter" : Twitter , 
  "linkedin" : Linkedin , 
  "youtube"  : Youtube ,  
  "arrow-left" : ArrowLeft, 
  "shopping-cart" : ShoppingBag,
  "heart" : Heart,
  "credit-card" : CreditCard,
  "settings" : Settings,
  "help-circle" : HelpCircle,
  "logout" : LogOut,
  "shopping-bag" : ShoppingBag

};

const Icon = ({
  name,
  size = 20, // Default size
  color = "currentColor", // Default color (inherits from text color)
  className = "", // For additional Tailwind or custom classes
  ...props // rest props
}) => {
  
  const LucideIconComponent = iconMap[name.toLowerCase()];

  if (!LucideIconComponent) {
    // Log a warning in development if an unmapped icon name is used
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `Icon "${name}" not found or not mapped in components/ui/Icon.jsx. ` +
          `Please import it from 'lucide-react' and add it to the 'iconMap'.`
      );
    }
    return null; 
  }

  // Rendering the specific Lucide icon component with the given props
  return (
    <LucideIconComponent
      size={size}
      color={color}
      className={className}
      {...props}
    />
  );
};

export default Icon;
