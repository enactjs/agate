// Utility methods for testing
const extractValues = async (picker) => {
	const hour = parseInt(await picker.active(picker.hour).getText());
	const minute = parseInt(await picker.active(picker.minute).getText());
	const meridiem = await picker.meridiem.isExisting() ? await picker.active(picker.meridiem).getText() : null;

	return {hour, minute, meridiem};
};

module.exports = {
	extractValues
};
