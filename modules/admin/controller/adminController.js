const logFormat = require('../../../config/log_format');
const logger = require('noogger').init(logFormat.INTERNAL_ERROR);
const response = require('../../../config/response_format');
const errorFormat = require('../../../config/error_format');

const AdminLogic = require('../logic/adminLogic');

module.exports.auth = async (req, res) => {
	try{
		const {email, password} = req.body;
		const adminExist = await AdminLogic.doesExist(email);

		if(!adminExist) {
			return response.not_processible(res, "User does not exist");
		}

		const {result, err} = await AdminLogic.auth(email, password);
		
		if(err) {
			return response.not_processible(res, "Invalid Credentials.");
		}
		
		return response.success(res, result);
	}
	catch(err) {
		logger.error(errorFormat.format("adminController", "auth", req, err));
		return response.internal_error(res);
	}
}

module.exports.register = async (req, res) => {
	try{
		const {name, email, password} = req.body;
		const adminExist = await AdminLogic.doesExist(email);

		if(adminExist) {
			return response.not_processible(res, "User already exists.");
		}
		
		const result = await AdminLogic.register(name, email, password);

		return response.created(res, result);	
	}
	catch(err) {
		logger.error(errorFormat.format("adminController", "register", req, err));
		return response.internal_error(res, err);
	}
}