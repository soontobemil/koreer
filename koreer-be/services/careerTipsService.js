const db = require("../models");

async function getCareerTips() {
    const result = await db.CareerTips.findAll({});
    console.log(result)
}

module.exports = {
    getCareerTips
};
