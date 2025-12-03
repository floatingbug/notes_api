const {getDB} = require("@config/db");

async function getUserById({filter}) {
    const db = await getDB();

    const user = await db.collection("users").findOne(filter);

    return user;
}

module.exports = getUserById
