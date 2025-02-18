class AdminCurrentCountDTO {
    constructor(data) {
        this.userCount = data.userCount;
        this.communityCount = data.communityCount;
    }
}

module.exports = { AdminCurrentCountDTO };
