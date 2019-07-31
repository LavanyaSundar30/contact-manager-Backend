const adminSchema = require('./../model/admin');

class adminController{
    constructor(){ }

    async register(username, password){
        try{
            await adminSchema.create({
                username: username,
                password: password
            });

            return {
                status: 'success',
                msg: 'Admin created'
            }
        } catch(err){
            return {
                status: 'error',
                msg: 'Admin creation failed'
            }
        }
    }

    async fetch(){
		try{
			let response = await adminSchema.find({});
			return {
				response: response
			};
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
    }
    async login(username, password){
        try{
            let admin = await adminSchema.findOne({
                username: username,
                password: password,
            });

            if(!admin){
                throw new Error('invalid creds');
            }

            let token = this.generateToken();

            this.saveToken(admin._id, token);

            admin.token = token;

            return {
                status: "success",
                data: admin,
            };

        } catch(error){
            return {
                status: 'error',
                msg: 'username or password invalid'
            }
        }
    }

    async saveToken(adminID, token){
        try{
            await adminSchema.update({_id: adminID}, {token: token})
        } catch(err){
            console.log(err);
        }
    }

    generateToken() {
        let timeStamp = `${new Date().getTime()}`;

        return require('crypto').createHash('md5').update(timeStamp).digest('hex')
    }

    async validateToken(res, token, adminID){
        try{
            let admin = await adminSchema.findOne({
                token: token
            });

            if(!admin){
                throw new Error('invalid token');
            }

            global.userSession = admin;
        } catch(error){
            res.send({
                status: 'error',
                msg: 'Invalid token'
            });
        }
    }
}


module.exports = new adminController();

