const { logger } = require("../logger");
const { AppError } = require('./app-errors')



class ErrorLog {
    constructor() {}
    async logError(err) {
        logger.log({
            private : true,
            level :  "error",
            message : `Name : ${err.name} | Descriptiion : ${err.description} | Status Code : ${err.statusCode} | IsOperational : ${err.isOperational}`,
        });
    }

    isTrustError(err) {
        if(err instanceof AppError){
            return err.isOperational;
        }
        else{
            return false;
        }
    }
}


const ErrorHandler = async(err, req, res, next) =>{
    const errorLog = new ErrorLog();
    if(err){
        console.log(err)
        const error = {
			name: err.name,
			description: err.description,
			statusCode: err.statusCode,
			isOperational: err.isOperational,
			errorStack: err.errorStack,
			logError: err.logError,
		};
        errorLog.logError(error)
    }
    next();
}


module.exports = ErrorHandler;

