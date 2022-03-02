// Utility methods for testing

const extractValue = async (rangePicker) => {
	return parseInt(await rangePicker.active(rangePicker.self).getText());
};

module.exports = {
	extractValue
};
