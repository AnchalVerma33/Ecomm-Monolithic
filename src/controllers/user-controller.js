const { RedisUtils } = require("../database/cache");
const UserService = require("../services/user-service");
const { CanSendOtp } = require("../utils/helpers");
const SendEmail = require("../utils/mails");


class UserController{
    constructor(){
        this.servcie = new UserService();
        this.redis = new RedisUtils();
        this.mail = new SendEmail();
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
            let profile = await this.redis.RedisGET(id);
            let from_cache = true;

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


    // SendOtp

    sendOtp = async (req,res,next) => {
        try{
            const { email } = req.body;
            const data = await CanSendOtp(this.redis, email);

            if(!data.canSend){
                return res.json({success : false, data: `Can't send otp until ${data.remainingTime} seconds.`})
            }

            const otp = await GenerateOtp();  

            const message = `Thank you for using our Shopping App\n ONE TIME PASSWORD : ${otp}`;
            
            await this.mail.sendEmail(message);

            await this.redis.RedisSET(email, otp, 60);

            return res.json({success:true, data:"OTP successfully sent to email"}); 
        }catch (e){
            next(e);
        }
    }


    // Delete Profile

    deleteUserProfile = async(req, res, next) => {
        try{
            const data = req.user;
            const {email, id} = data;
            console.log(data);
            const result = await this.servcie.DeleteUser({email});
            await this.redis.RedisDEL(id);
            return res.json({success:true, data:result});
        }catch(e){
            next(e);
        }
    }


    
}

module.exports = UserController;