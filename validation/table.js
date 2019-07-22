const Validator = require("validator");
const isEmpty = require("is-empty");  

module.exports = function validateNewTableInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : "";
	data.status = !isEmpty(data.status) ? data.status : "";
	data.gameType = !isEmpty(data.gameType) ? data.gameType : "";


	if (Validator.isEmpty(data.name)) {
		errors.name = "You need to enter a name for this table."
	}	

	if (Validator.isEmpty(data.status)) {
		errors.name = "You need to give this table a status."
	}	

	if (Validator.isEmpty(data.gameType)) {
		errors.name = "You need to enter a game type for this table."
	}	

	return {
		errors,
		isValid: isEmpty(errors)
	}
}