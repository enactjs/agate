
const svgSize = 350;
const svgRadius = svgSize / 2 - 20;
const startAngle = 50;
const endAngle = 310;

const angleToValue = (angle, min, max) => {
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

const valueToAngle = (value, min, max) => {
	const ratio = (value - min) / (max - min);
	const angle = ratio * (endAngle - startAngle) + startAngle;
	return angle;
};

// this conversion is needed so the 0 degree position can be on the bottom, instead of the right + to avoid negative values
const convertAngle = (angle) => {
	return (270 + 360 - angle) % 360;
};

const angleToPosition = (angle, radius) => {
	// js functions need radians, counterclockwise from positive x axis
	const angleInRadians = (convertAngle(angle) / 180) * Math.PI;
	let dX;
	let dY;

	if (angleInRadians <= Math.PI) {
		// we are in the upper two quadrants
		if (angleInRadians <= Math.PI / 2) {
			dY = Math.sin(angleInRadians) * radius;
			dX = Math.cos(angleInRadians) * radius;
		} else {
			dY = Math.sin(Math.PI - angleInRadians) * radius;
			dX = Math.cos(Math.PI - angleInRadians) * radius * -1;
		}
	// we are in the lower two quadrants
	} else if (angleInRadians > Math.PI && angleInRadians <= Math.PI * 1.5) {
		dY = Math.sin(angleInRadians - Math.PI) * radius * -1;
		dX = Math.cos(angleInRadians - Math.PI) * radius * -1;
	} else {
		dY = Math.sin(2 * Math.PI - angleInRadians) * radius * -1;
		dX = Math.cos(2 * Math.PI - angleInRadians) * radius;
	}

	// dX and dY are calculated based on having (0, 0) at the center
	// Now, translate dX and dY to svg coordinates, where (0, 0) is at the top left
	const x = dX + svgSize / 2;
	const y = svgSize / 2 - dY;

	return {x, y};
};

const positionToAngle = (position) => {
	const dX = position.x - svgSize / 2;
	const dY = svgSize / 2 - position.y; // position.y increases downwards
	let theta = Math.atan2(dY, dX); // radians
	if (theta < 0) {
		theta = theta + 2 * Math.PI;
	}
	const angle = (theta / Math.PI) * 180; // angles, counterclockwise from positive x axis

	return convertAngle(angle);
};

// generates a circle arc path
const arcPath = (angle) => {
	const largeArc = angle - startAngle >= 180;

	const arcStart = angleToPosition(startAngle, svgRadius);

	const startPoint = `M ${arcStart.x},${arcStart.y}`;

	const arcEnd = angleToPosition(angle, svgRadius);

	const arc = `A ${svgRadius} ${svgRadius} 0 ${largeArc ? '1' : '0'} 1 ${arcEnd.x} ${arcEnd.y}`;

	return startPoint + arc;
};

export {
	angleToValue,
	angleToPosition,
	arcPath,
	positionToAngle,
	svgRadius,
	valueToAngle
};
