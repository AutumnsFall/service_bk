const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminService = require('../service/adminService');
require('dotenv').config({path: "./../../.env"});

class AdminLogic {
	// auth

	async auth(email, password) {
		const object = await AdminService.getUserPassword(email);
		const doesMatch = await this.comparePasswords(password, object.password);
		
		if(!doesMatch) {
			return {result:null, err:true};
		}
		
		const token = await this.generateJwt(object._id);
		const result = this.format(object, token);

		return {result, err:false};
		
	}

	format(object, token){
		return {
			token,
            user: {
                name: object.name,
                email: object.email
            }
		}
	}

	async generateJwt(id) {
		const payload = await jwt.sign(
			{id}, 
			process.env.JWT_SECRET, 
			{expiresIn: parseInt(process.env.TOKEN_LIFE)}
		);

		return payload;
	}

	async comparePasswords(x, y) {
		const result = await bcrypt.compare(x, y);

		return result;
	}


	// Registration

	async register(name, email, password) {
		const hashedPassword = await this.hashPassword(password);
		
		const result = await AdminService.register(name, email, hashedPassword);

		return result;
	}

	async doesExist(email) {
		const result = await AdminService.findByEmail(email);

		return result?true: false;
	}

	async hashPassword(password) {
		const salt = await this.generateSalt(10);
		const hash = await bcrypt.hash(password, salt);
		
		return hash;
	}

	async generateSalt(count) {
		const salt = await bcrypt.genSalt(count);

		return salt;
	}

}

module.exports = new AdminLogic();