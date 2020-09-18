const valueToAngle = (value, min, max, startAngle, endAngle) => {
	const ratio = (value - min) / (max - min);
	const angle = ratio * (endAngle - startAngle) + startAngle;
	return angle;
};

const angleToValue = (angle, min, max, startAngle, endAngle) => {
	if (angle < startAngle) {
		return min;
	} else if (angle > endAngle) {
		return max;
	} else {
		const ratio = (angle - startAngle) / (endAngle - startAngle);
		const value = ratio * (max - min) + min;
		// round to the nearest int value
		return Math.round(value);
	}
};

export {
	valueToAngle,
	angleToValue
};
