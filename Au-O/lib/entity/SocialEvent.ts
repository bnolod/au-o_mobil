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
