export interface CompanyInformationDTO{
    id: number;
    created_at: string;
    updated_at: string;
    company_name: string;
    salary: string;
    job_description: string;
    job_title: string;
    country: string;
    location: string;
    api_category: string;
}

export enum CommunityType {
    COMMUNITY = "COMMUNITY",
    TIPS = "TIPS",
}

enum ApiCategory{
    ADZUNA = "ADZUNA",
}