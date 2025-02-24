import { Group } from "@/lib/entity/Group";
import { SocialEvent } from "@/lib/entity/SocialEvent";

export interface NewSocialProps {
    text: string;
    onPress?: () => void;
  }
  export interface SocialBannerProps {
    name: string;
    id: number;
    header?: boolean;
    image?: string;
    type?: 'GROUP' | 'EVENT';
    onPress?: () => void;
    count?: number | null;
  }
  
export interface SocialSortItemProps {
    bannerImage: string | null;
    name: string;
    memberCount: number;
    onSelect: () => void;
    colorScheme: "light" | "dark";
  }
  export interface SocialCardProps {
    group?: Group;
    event?: SocialEvent;
    preview?: 'CREATE' | 'DISPLAY' | undefined;
    type: 'GROUP' | 'EVENT';
    onCreatePress?: () => void;
  }