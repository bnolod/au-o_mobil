
/**
 *  to be implemented
 * 
 */
export interface SocialEvent {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  attendees: number;
  groupId?: string;
  creationDate: string;
  bannerImage: string;
  public: boolean;
  isAttending: boolean;
}
/**
 *  to be implemented
 * 
 */

export interface EventPost {
  eventName: string;
  attendees: number;
  groupId?: string;
  location: string;
  startDate: string;
  endDate: string;
}