const usersModel = require("@models/users");

async function deleteUser(){
    try{
        await usersModel.deleteUser({});

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

module.exports = deleteUser;
