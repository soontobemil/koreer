export interface UserInfoFormData {
    school: string;
    major: string;
    graduationYear: string;
    location: string;
    desiredCountry: string;
    skills: string[];
    interests: string[];
    introduction: string;
    githubUrl?: string;
    portfolioUrl?: string;
}

export interface UserInfoDTO {
    school: string;
    major: string;
    graduation_year: string;
    location: string;
    desired_country: string;
    skills: string[];
    interests: string[];
    introduction: string;
    github_url: string | null;
    portfolio_url: string | null;
    user_id: string | number;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';