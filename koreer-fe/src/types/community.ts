export enum CommunityCategory{
    DAILY = "DAILY",
    TECH = "TECH",
    STUDY = "STUDY",
}

export interface CommunityPostDTO{
    title: string;
    content: string;
    category: CommunityCategory;
}