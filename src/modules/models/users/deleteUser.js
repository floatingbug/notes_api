const {getDB} = require("@config/db");

async function deleteUser({}){
    try{
        const db = await getDB();
        // MongoDB insert operation intentionally omitted as requested.
    }
    catch(error){
        throw error;
    }
}

module.exports = deleteUser;
