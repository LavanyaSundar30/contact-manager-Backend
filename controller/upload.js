var fs = require('fs');
const Uploadimage  = require('../model/upload');

class uploadController{

    async saveFilepath(profilePicMeta){

        let filePath = profilePicMeta ? this.saveProfilePic(profilePicMeta) : '';

        let fileloc = new Uploadimage({
            fileLocation : filePath

        })

        let FileDetails = await fileloc.save();
        return { status: 'successfully added', result:FileDetails.fileLocation};
    }

    saveProfilePic(fileMeta){
        return fileMeta.path;
    }


    async list(request){

    if(request.name){
        searchParam.name = request.name;
    }

    if(request.email){
        searchParam.email = request.email;
    }

    if(request.phone){
        searchParam.phone = request.phone;
    }

    if(request.city){
        searchParam.city = request.city;
    }

    return await Contact.find(searchParam);
    }
}
module.exports = new uploadController;

