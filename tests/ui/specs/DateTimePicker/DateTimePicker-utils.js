// Utility methods for testing

// adapted from https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
const daysInMonth = ({month, year}) => new Date(year, month, 0).getDate();

const extractValues = async (picker) => {
	const day = parseInt(await picker.dateActive('day').getText());
	const month = parseInt(await picker.dateActive('month').getText());
	const year = parseInt(await picker.dateActive('year').getText());
	const hour = parseInt(await picker.timeActive('hour').getText());
	const minute = parseInt(await picker.timeActive('minute').getText());
	const meridiem = await picker.meridiem.isExisting() ? await picker.timeActive('meridiem').getText() : null;

	return {day, month, year, hour, minute, meridiem};
};

module.exports = {
	daysInMonth,
	extractValues
};
