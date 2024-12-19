// Utility methods for testing

const extractValue = async (picker) => {
	return (await picker.active()).getText();
};

module.exports = {
	extractValue
};
