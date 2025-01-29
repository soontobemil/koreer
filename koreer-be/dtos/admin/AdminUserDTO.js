class AdminUserDTO {
    constructor(data) {
        this.id = data.id;
        this.name = data.username;
        this.email = data.user_email;
        this.is_active = data.is_active;
        this.is_email_verified = data.is_email_verified;
        this.role = data.role;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.nation = data.nation;
        // user_info 처리
        this.user_info = data.user_info || null; // user_info가 없으면 null로 처리
    }
}
class AdminUserInfoDTO {
    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.location = data.location;
        this.desired_country = data.desired_country;
        this.skills = data.skills;
        this.interests = data.interests;
        this.introduction = data.introduction;
        this.github_url = data.github_url;
        this.portfolio_url = data.portfolio_url;
        this.years_of_experience = data.years_of_experience;
        this.salary_range = data.salary_range;
        this.work_style = data.work_style;
        this.birth_date = data.birth_date;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
}

module.exports = { AdminUserDTO,AdminUserInfoDTO };
