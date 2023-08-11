const UserService = require("../services/user-service");


class UserController{
    constructor(){
        this.servcie = new UserService();
    }

    register = async (req,res,next) => {
        try{
            const {
                firstName,
				lastName,
				phoneNumber,
				email,
				password,
				gender,
            } = req.body;

            const { data } = await this.servcie.SignUp({
                firstName,
				lastName,
				phoneNumber,
				email,
				password,
				gender,
            });
            return res.json({success : true, data});
        } catch(e) {
            next(e);
        }

    }
}

module.exports = UserController;