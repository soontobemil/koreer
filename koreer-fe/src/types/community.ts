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

export enum CommunityType {
    COMMUNITY = "COMMUNITY",
    TIPS = "TIPS",
}

export interface CommunityFormProps {
    mode: 'create' | 'edit';
    initialData?: {
        title: string;
        content: string;
        category: CommunityCategory;
    };
    postId?: number;
}