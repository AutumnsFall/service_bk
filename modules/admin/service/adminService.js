const Admin = require('../model/Admin');

class AdminService {

	async getUserPassword(email) {
		const object = await Admin.findOne({email});

		return object;
	}

	async register(name, email, password) {		
		const admin = new Admin({name, email, password});

		const result = await Admin.create(admin);

		return result;
	}

	async findByEmail(email) {
		const result = await Admin.findOne({email});

		return result;
	}

}

module.exports = new AdminService();