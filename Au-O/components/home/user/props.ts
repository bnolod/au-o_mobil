import { Car } from '@/lib/entity/Car';
import { Post } from '@/lib/entity/Post';
import { User } from '@/lib/entity/User';

export interface FollowerSheetProps {
  followers: User[];
  following: User[];
  dismissSheet: () => void;
  isOwner: boolean;
}
export interface ProfileProps {
  user: User;
  profile: User;
  id: string;
  refreshing: boolean
  garage: Car[];
  followers: User[];
  following: User[];
  setFollowing: (users: User[]) => void;
  setFollowers: (users: User[]) => void;
  posts: Post[];
}
export type TabOptions = "SAVED" | "POST" | "GARAGE" | "GROUPS"
export interface ProfileTabSelectorProps {
    colorScheme: "light" | "dark",
    selectedTab: TabOptions
    setSelectedTab: (tab: TabOptions) => void
}