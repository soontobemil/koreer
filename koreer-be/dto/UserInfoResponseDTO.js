class UserInfoResponseDTO {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
    }
}

module.exports = { UserInfoResponseDTO };
