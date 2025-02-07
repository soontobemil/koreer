class AdminComInfoDTO {
    constructor(data) {
        this.id = data.id;
        this.company_name = data.company_name;
        this.company_img_url = data.company_img_url;
        this.rating = data.rating;
        this.location = data.location;
        this.area = data.area;
        this.country = data.country;
        this.industry = data.industry;
        this.industry_detail = data.industry_detail;
        this.employees = data.employees;
        this.salary_range = data.salary_range;
        this.corporate_culture = data.corporate_culture;
        this.benefit = data.benefit;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
}

module.exports = { AdminComInfoDTO };
