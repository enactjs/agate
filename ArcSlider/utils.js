const valueToAngle = (value, min, max, startAngle, endAngle) => {
	const ratio = (value - min) / (max - min);
	const angle = ratio * (endAngle - startAngle) + startAngle;
	return angle;
};

export {
	valueToAngle
};
