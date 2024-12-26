import {CommunityCategory} from "./community";

export interface CommunitySubmitDTO {
    title: string;
    content: string;
    category: CommunityCategory;
}

export interface PostsDTO{
    id: number,
    title: string,
    content: string,
    user_email: string,
    created_at: string,
    updated_at: string,
    is_owner: boolean;
    category: CommunityCategory;
}