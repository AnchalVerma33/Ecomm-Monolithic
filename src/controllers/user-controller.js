const { RedisUtils } = require("../database/cache");
const UserService = require("../services/user-service");


class UserController{
    constructor(){
        this.servcie = new UserService();
        this.redis = new RedisUtils();
    }

    // Register User
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

  // Login User
    login = async (req,res,next) => {
        try{
            const {
                email,
                password
            } = req.body;

            const data = await this.servcie.Login({
                email,
                password
            })
            return res.json({success:true, data});
        } catch(e) {
            next(e);
        }
    }

    // User Profile
    getUserProfile = async (req,res,next) => {
        try{
            const id = req.user.id;
            var profile = await this.redis.RedisGET(id);
            var from_cache = true;

            if(!profile){
                const { data } = await this.servcie.UserProfile(id);
                profile = data;
                from_cache = false;

                await this.redis.RedisSET(id, JSON.stringify(profile)); 
            }else{
                profile = JSON.parse(profile);
            }

            return res.json({success : true, data:profile, from_cache}); 
        }catch(e) {
            next(e);
        }
    }


    
    // Update User
    updateUserProfile = async (req,res,next) => {
        try{
            const updates = req.body;
            const id = req.user.id;
            const data = await this.servcie.UpdateUser(id,updates);
            await this.redis.RedisDEL(id);
            return res.json({success : true, data});
        } catch(e) {
            next(e);
        }
    }



    
}

module.exports = UserController;