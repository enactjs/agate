// Utility methods for testing

const extractValue = async (rangePicker) => {
	return parseInt(await rangePicker.active().getText());
};

module.exports = {
	extractValue
};
