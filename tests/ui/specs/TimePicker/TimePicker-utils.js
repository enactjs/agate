// Utility methods for testing
const extractValues = (picker) => {
	const hour = parseInt(picker.active(picker.hour).getText());
	const minute = parseInt(picker.active(picker.minute).getText());
	const meridiem = picker.meridiem.isExisting() ? picker.active(picker.meridiem).getText() : null;

	return {hour, minute, meridiem};
};

module.exports = {
	extractValues
};
