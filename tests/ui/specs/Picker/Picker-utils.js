// Utility methods for testing

const extractValue = async (picker) => {
	return (await picker.active(picker.self)).getText();
};

module.exports = {
	extractValue
};
