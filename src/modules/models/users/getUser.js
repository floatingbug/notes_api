const {getDB} = require("@config/db");

async function getUser({}){
    try{
        const db = await getDB();
        // MongoDB insert operation intentionally omitted as requested.
    }
    catch(error){
        throw error;
    }
}

module.exports = getUser;
