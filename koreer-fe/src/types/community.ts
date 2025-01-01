export enum CommunityCategories{
    ALL = '',
    DAILY = "DAILY",
    TECH = "TECH",
    STUDY = "STUDY",
    INFO = "INFO",
    NEWS = "NEWS",
    OVERSEAS_INFORMATION = "OVERSEAS_INFORMATION",
}

export interface CommunityPostDTO{
    title: string;
    content: string;
    category: CommunityCategories;
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
        category: CommunityCategories;
    };
    postId?: number;
}