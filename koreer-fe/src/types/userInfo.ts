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
    employmentStatus: 'employed' | 'student';  // 재직상태
    yearsOfExperience?: string;               // 경력 연차 (직장인인 경우)
    salaryRange?: string;                     // 연봉 수준 (직장인인 경우)
    workStyle?: string;                       // 근무 형태 (직장인인 경우)
    birthDate: string;                        // 생년월일
    location: string;
    desiredCountry: string;
    skills: string[];
    interests: string[];
    introduction: string;
    githubUrl?: string | undefined | null;
    portfolioUrl?: string | undefined | null;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';