
export interface UserPostDTO{
    nation: string;
    user_email: string;
    username: string;
    password: string;
}

export enum ValidateStatus{
    UNFILLED = "UNFILLED", // 작성이나 체크 되지 않은 상태
    BELOW_REQUIRED_LENGTH = "BELOW_REQUIRED_LENGTH", // 길이가 부족한 상태
    INVALID = "INVALID", // 유효하지 않은 상태
    NONE = "NONE",
}