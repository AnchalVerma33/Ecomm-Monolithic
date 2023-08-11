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
        const count = this.User.count({where : filter});
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
        const user = this.User.findOne({where : filter});
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



}


module.exports = UserRepository;
