export default interface SocialEventCreationRequest {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  groupId?: string;
  bannerImage: string;
  public: boolean;
}