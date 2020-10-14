// this conversion is needed so the 0 degree position can be on the bottom, instead of the right + to avoid negative values
const convertAngle = (angle) => {
	return (270 + 360 - angle) % 360;
};

const angleToPosition = (angle, radius, svgSize) => {
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

const positionToAngle = (position, svgSize) => {
	const dX = position.x - svgSize / 2;
	const dY = svgSize / 2 - position.y; // position.y increases downwards
	let theta = Math.atan2(dY, dX); // radians
	if (theta < 0) {
		theta = theta + 2 * Math.PI;
	}
	const angle = (theta / Math.PI) * 180;

	return convertAngle(angle);
};

const arcPath = (startAngle, endAngle, svgRadius, svgSize) => {
	if (startAngle % 360 === endAngle % 360 && startAngle !== endAngle) {
		// Drawing a full circle, slightly offset end angle, so the circle can be rendered
		endAngle = endAngle - 0.001;
	}

	const largeArc = endAngle - startAngle >= 180;
	const arcStart = angleToPosition(startAngle, svgRadius, svgSize);
	const arcEnd = angleToPosition(endAngle, svgRadius, svgSize);

	return `M ${arcStart.x},${arcStart.y} A ${svgRadius} ${svgRadius} 0 ${largeArc ? '1' : '0'} 1 ${arcEnd.x} ${arcEnd.y}`;
};

export {
	angleToPosition,
	arcPath,
	positionToAngle
};
