class ErrorHandler{
	parseMongoError(error){
		console.log(error);
		let errorMsg = 'Something went wrong';

		if(error.name !== 'MongoError' && error.name !== 'BulkWriteError' ){
			return errorMsg;
		}

		switch(error.code){
			case 11000:
				errorMsg = 'Contact already exist!';
			default:
				errorMsg = `${error.code} - ${error.errmsg}`;
		}



		return errorMsg;
	}
}

module.exports = new ErrorHandler();