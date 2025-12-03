const {getDB} = require("@config/db");


async function getUser({filter}){
	try{
		const db = await getDB();
		const result = await db.collection("users").findOne(filter);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getUser;
