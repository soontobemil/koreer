class AdminCommCodeDTO {
    constructor(data) {
        this.id = data.id;
        this.group_code = data.group_code;
        this.group_code_name = data.group_code_name;
        this.code = data.code;
        this.code_name = data.code_name;
        this.description = data.description;
        this.status = data.status;
        this.sort_order = data.sort_order;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
}

module.exports = { AdminCommCodeDTO };
