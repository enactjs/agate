// Utility methods for testing

// adapted from https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
const daysInMonth = ({month, year}) => new Date(year, month, 0).getDate();

const extractValues = (picker) => {
	const day = parseInt(picker.active(picker.day).getText());
	const month = parseInt(picker.active(picker.month).getText());
	const year = parseInt(picker.active(picker.year).getText());

	return {day, month, year};
};

module.exports = {
	daysInMonth,
	extractValues
};
