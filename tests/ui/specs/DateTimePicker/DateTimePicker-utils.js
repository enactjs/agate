// Utility methods for testing

// adapted from https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
const daysInMonth = ({month, year}) => new Date(year, month, 0).getDate();

const extractValues = (picker) => {
	const day = parseInt(picker.active(picker.day).getText());
	const month = parseInt(picker.active(picker.month).getText());
	const year = parseInt(picker.active(picker.year).getText());
	const hour = parseInt(picker.active(picker.hour).getText());
	const minute = parseInt(picker.active(picker.minute).getText());
	const meridiem = picker.meridiem.isExisting() ? picker.active(picker.meridiem).getText() : null;

	return {day, month, year, hour, minute, meridiem};
};

module.exports = {
	daysInMonth,
	extractValues
};
