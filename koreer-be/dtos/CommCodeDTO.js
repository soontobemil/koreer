class CommCodeDTO {
    constructor(data) {
        this.group_code = data.group_code;
        this.group_code_name = data.group_code_name;
        this.code = data.code;
        this.code_name = data.code_name;
    }
}

module.exports = { CommCodeDTO };
