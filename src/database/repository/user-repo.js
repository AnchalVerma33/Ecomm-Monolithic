const { APIError,
    BadRequestError,
	STATUS_CODES,
 } = require("../../utils/errors/app-errors");
const UserModel = require("../models/User");
const connectDB = require("../connect")

class UserRepository {
  constructor() {
    this.User = new UserModel().schema;
  }


  // SignUp
  async CreateUser({
    id,
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    gender,
    salt,
  }) {
    try {
      const user = {
        id,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        gender,
        salt,
      };

      const newUser = await this.User.create(user);
      return newUser;
    } catch (e) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Error while adding user ${e}`
      );
    }
  }


  // Find User Count

  async FindUserCount(filter){
    try{
        const count = await this.User.count({where : filter});
        return count;
    }
    catch(e) {
        throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            `Error while fetching Users count ${e}`
        )
    }
  }


  // Find Unique User By email or phone

  async FindOneUser(filter){
    try{
        const user = await this.User.findOne({where : filter});
        return user.dataValues;
    }
    catch(e) {
        throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            `Error while fetching Users count ${e}`
        );
    }
  }

  // Update User details

  async UpdateUserDetails(id, updateDetails, returnUpdatedDetails=true) {
    try{
        const [updatedCount, updatedUsers] = await this.User.update(
            updateDetails,
            {
                where : {id},
                returning : returnUpdatedDetails,
            }
        );
        const user = updatedUsers[0].dataValues;
        return user; 
    } catch(e) {
        throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            `Error while updating the user details ${e}`
        );
    }
  }



}


module.exports = UserRepository;
