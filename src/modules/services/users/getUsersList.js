const usersModel = require("@models/users");

async function getUsersList(){
    try{
        await usersModel.getUsersList({});

        return {
            success: true,
            code: 200,
            message: "",
        };
    }
    catch(error){
        throw error;
    }
}

module.exports = getUsersList;
