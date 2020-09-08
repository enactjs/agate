import PropTypes from 'prop-types';

const svgSize = 350;
const innerRadius = svgSize / 2 - 20;

const angleToValue = (angle, minValue, maxValue, startAngle, endAngle) => {
	//const { angle, minValue, maxValue, startAngle, endAngle } = params;
	if (endAngle <= startAngle) {
		// math assumes endAngle > startAngle
		throw new Error("endAngle must be greater than startAngle");
	}

	if (angle < startAngle) {
		return minValue;
	} else if (angle > endAngle) {
		return maxValue;
	} else {
		const ratio = (angle - startAngle) / (endAngle - startAngle);
		const value = ratio * (maxValue - minValue) + minValue;
		return value;
	}
}

const valueToAngle = (value, minValue, maxValue, startAngle, endAngle) =>
 {
	if (endAngle <= startAngle) {
		// math assumes endAngle > startAngle
		throw new Error("endAngle must be greater than startAngle");
	}
	const ratio = (value - minValue) / (maxValue - minValue);
	const angle = ratio * (endAngle - startAngle) + startAngle;
	return angle;
}


const  convertAngle = (degree, from, to) => {
	to = to || { direction: "ccw", axis: "+x" };
console.log(from);
	console.log(to);
	if (from.direction !== to.direction) {
		degree = degree === 0 ? 0 : 360 - degree;
	}

	if (from.axis === to.axis) {
		// e.g. +x to +x
		return degree;
	}

	if (from.axis[1] === to.axis[1]) {
		// e.g. +x to -x
		return (180 + degree) % 360;
	}

	switch (to.direction + from.axis + to.axis) {
		case "ccw+x-y":
		case "ccw-x+y":
		case "ccw+y+x":
		case "ccw-y-x":
		case "cw+y-x":
		case "cw-y+x":
		case "cw-x-y":
		case "cw+x+y":
			return (90 + degree) % 360;
		case "ccw+y-x":
		case "ccw-y+x":
		case "ccw+x+y":
		case "ccw-x-y":
		case "cw+x-y":
		case "cw-x+y":
		case "cw+y+x":
		case "cw-y-x":
			return (270 + degree) % 360;
		default:
			throw new Error("Unhandled conversion");
	}
}

const  angleToPosition = (angle,	radius) => {
	// js functions need radians, counterclockwise from positive x axis
	console.log(angle);
	const angleConverted = convertAngle(angle.degree, angle, {
		direction: "ccw",
		axis: "+x"
	});
	const angleInRad = (angleConverted / 180) * Math.PI;
	let dX;
	let dY;

	if (angleInRad <= Math.PI) {
		// we are in the upper two quadrants
		if (angleInRad <= Math.PI / 2) {
			dY = Math.sin(angleInRad) * radius;
			dX = Math.cos(angleInRad) * radius;
		} else {
			dY = Math.sin(Math.PI - angleInRad) * radius;
			dX = Math.cos(Math.PI - angleInRad) * radius * -1;
		}
	} else {
		// we are in the lower two quadrants
		if (angleInRad <= Math.PI * 1.5) {
			dY = Math.sin(angleInRad - Math.PI) * radius * -1;
			dX = Math.cos(angleInRad - Math.PI) * radius * -1;
		} else {
			dY = Math.sin(2 * Math.PI - angleInRad) * radius * -1;
			dX = Math.cos(2 * Math.PI - angleInRad) * radius;
		}
	}

	// dX and dY are calculated based on having (0, 0) at the center
	// Now, translate dX and dY to svg coordinates, where (0, 0) is at the top left
	const x = dX + svgSize / 2;
	const y = svgSize / 2 - dY;

	return { x, y };
}

const positionToAngle = (position, direction, axis) => {
	const dX = position.x - svgSize / 2;
	const dY = svgSize / 2 - position.y; // position.y increases downwards in svg
	let theta = Math.atan2(dY, dX); // radians, counterclockwise from positive x axis
	if (theta < 0) {
		theta = theta + 2 * Math.PI;
	}
	const degree = (theta / Math.PI) * 180; // degrees, counterclockwise from positive x axis
	return convertAngle(
		degree,
		{
			direction: "ccw",
			axis: "+x"
		},
		{
			direction: direction,
			axis: axis
		}
	);
}


const arcPathWithRoundedEnds = (startAngle,	endAngle, direction, axis) => {
	if (startAngle % 360 === endAngle % 360 && startAngle !== endAngle) {
		// if it is a full circle, slightly offset end angle because of known issue
		endAngle = endAngle - 0.001;
	}
	const largeArc = endAngle - startAngle >= 180;
	const outerRadius = innerRadius + 6;

	const innerArcStart = angleToPosition({ degree: startAngle, direction, axis }, innerRadius);

	const startPoint = `M ${innerArcStart.x},${innerArcStart.y}`;

	const innerArcEnd = angleToPosition({ degree: endAngle, direction, axis }, innerRadius);

	const innerArc = `
    A ${innerRadius} ${innerRadius} 0
      ${largeArc ? "1" : "0"}
      ${direction === "cw" ? "1" : "0"}
      ${innerArcEnd.x} ${innerArcEnd.y}
  `;

	const outerArcStart = angleToPosition({ degree: endAngle, direction, axis }, outerRadius);
	const firstButt = `
    A 3 3 0
      ${largeArc ? "1" : "0"}
      ${direction === "cw" ? "0" : "1"}
      ${outerArcStart.x} ${outerArcStart.y}
  `;

	const outerArcEnd = angleToPosition({ degree: startAngle, direction, axis }, outerRadius);

	const outerArc = `
    A ${outerRadius} ${outerRadius} 0
      ${largeArc ? "1" : "0"}
      ${direction === "cw" ? "0" : "1"}
      ${outerArcEnd.x} ${outerArcEnd.y}
  `;

	const secondButt = `
    A 3 3 0
      ${largeArc ? "1" : "0"}
      ${direction === "cw" ? "0" : "1"}
      ${innerArcStart.x} ${innerArcStart.y}
  `;

	return startPoint + innerArc + firstButt + outerArc + secondButt + " Z";
}

export {
	valueToAngle,
	angleToValue,
	angleToPosition,
	positionToAngle,
	arcPathWithRoundedEnds,
	svgSize,
	innerRadius
};