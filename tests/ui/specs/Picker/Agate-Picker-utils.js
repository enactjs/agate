// Utility methods for testing

const extractValue = (picker) => {
	console.log(parseInt(picker.active.getText()));
	return parseInt(picker.active.getText());
};

module.exports = {
	extractValue
};