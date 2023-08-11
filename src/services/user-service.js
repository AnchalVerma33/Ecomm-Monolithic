const UserRepository = require("../database/repository/user-repo");
const { BadRequestError, APIError } = require("../utils/errors/app-errors");
const { FilterValues, ValidateEmail, ValidatePassword, GenerateSalt, GeneratePassword, GenerateUUID, FormatData, ComparePass, GenerateToken } = require("../utils/helpers");



class UserService{
    constructor(){
        this.repository  = new UserRepository();
    }
  
    // Register User
    async SignUp(userInput) {
        try{
            const {
                firstName,
                lastName,
                email,
                password,
                gender,
                phoneNumber,
            } = userInput;

            let existingUser = 0;

            FilterValues(
                [
                    firstName,
                    lastName,
                    email,
                    password,
                    gender,
                    phoneNumber,
                ],
                [null, ""],
                {
					firstName,
					lastName,
					email,
					password,
					gender,
					phoneNumber,
				}
            );

           ValidateEmail(email);
           ValidatePassword(password);

           existingUser = await this.repository.FindUserCount({ email });
           if(existingUser > 0){
                throw new BadRequestError("Email Already Exist");
           }

           existingUser = await this.repository.FindUserCount({ phoneNumber });

			if (existingUser > 0){
                throw new BadRequestError("Phone Number already exist");
            }


            const salt = await GenerateSalt();
            const userPassword = await GeneratePassword(salt);
            const id = GenerateUUID();

            const newUser = await this.repository.CreateUser(
                {
                    id,
                    email,
                    password : userPassword,
                    firstName,
                    lastName,
                    phoneNumber,
                    gender,
                    salt,
                    verified : false
                }
            );

            return FormatData({
                id: newUser.id,
				email: newUser.email,
				first_name: newUser.firstName,
				last_name: newUser.lastName,
				phone_number: newUser.phoneNumber,
				gender: newUser.gender,
            });

        } catch(e) {
            throw new APIError(e, e.statusCode);
        }

    }

 // Login User
    async Login(userInput){
        try{
            const {
                email,
                password
            } = userInput;

           ValidateEmail(email);
           ValidatePassword(password);

           const existingUser = this.repository.FindOneUser({ email });
           if(!existingUser){
            throw new BadRequestError(`User dosen't exist`)
           }

           const {password : user_password, salt : user_salt} = existingUser;

           const validPassword = await ComparePass(password, user_password, user_salt);

           if(!validPassword){
            throw new BadRequestError("Wrong Password")
           }

           // Generate Token
           const token = GenerateToken({email : existingUser.email, id : existingUser.id});


           return FormatData({
            id: existingUser.id,
            email: existingUser.email,
            first_name: existingUser.firstName,
            last_name: existingUser.lastName,
            phone_number: existingUser.phoneNumber,
            token: token,
        });
    } catch (e) {
        throw new APIError(e, e.statusCode);
    }

  } 
}


module.exports = UserService;