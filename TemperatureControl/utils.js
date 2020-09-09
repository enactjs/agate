
const svgSize = 350;
const innerRadius = svgSize / 2 - 20;
const outerRadius = innerRadius + 6;
const startAngle = 50;
const endAngle = 310;

//direction: PropTypes.oneOf(['cw', 'ccw']),
//axis: PropTypes.oneOf(['+x', '-x','+y','-y']),
const direction= "cw";
const axis= "-y";

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
}

const valueToAngle = (value, min, max) => {
	const ratio = (value - min) / (max - min);
	const angle = ratio * (endAngle - startAngle) + startAngle;
	return angle;
}

const convertAngle = (angle, from, to) => {
	console.log(angle);
	angle = 360 - angle;

	console.log(to.direction);
	switch (to.direction + from.axis + to.axis) {
		case "ccw+x-y":
		case "ccw-x+y":
		case "ccw+y+x":
		case "ccw-y-x":
		case "cw+y-x":
		case "cw-y+x":
		case "cw-x-y":
		case "cw+x+y":
			return (90 + angle) % 360;
		case "ccw+y-x":
		case "ccw-y+x":
		case "ccw+x+y":
		case "ccw-x-y":
		case "cw+x-y":
		case "cw-x+y":
		case "cw+y+x":
		case "cw-y-x":
			return (270 + angle) % 360;
		default:
			throw new Error("Unhandled conversion");
	}
}

const angleToPosition = (angle, radius) => {
	// js functions need radians, counterclockwise from positive x axis
	const angleConverted = convertAngle(
		angle,
		{
			direction: direction,
			axis: axis
		},
		{
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

const positionToAngle = (position) => {
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


const arcPath = (angle) => {
	if (startAngle % 360 === angle % 360 && startAngle !== angle) {
		// if it is a full circle, slightly offset end angle because of known issue
		angle = angle - 0.001;
	}
	const largeArc = angle - startAngle >= 180;

	const innerArcStart = angleToPosition(startAngle, innerRadius);

	const startPoint = `M ${innerArcStart.x},${innerArcStart.y}`;

	const innerArcEnd = angleToPosition( angle, innerRadius);

	const innerArc = `
    A ${innerRadius} ${innerRadius} 0
      ${largeArc ? "1" : "0"}
      1
      ${innerArcEnd.x} ${innerArcEnd.y}
  `;

	const outerArcStart = angleToPosition(angle, outerRadius);
	const firstButt = `
    A 3 3 0
      ${largeArc ? "1" : "0"}
      0
      ${outerArcStart.x} ${outerArcStart.y}
  `;

	const outerArcEnd = angleToPosition(startAngle, outerRadius);

	const outerArc = `
    A ${outerRadius} ${outerRadius} 0
      ${largeArc ? "1" : "0"}
      0
      ${outerArcEnd.x} ${outerArcEnd.y}
  `;

	const secondButt = `
    A 3 3 0
      ${largeArc ? "1" : "0"}
      0
      ${innerArcStart.x} ${innerArcStart.y}
  `;

	return startPoint + innerArc + firstButt + outerArc + secondButt + " Z";
}

export {
	valueToAngle,
	angleToValue,
	angleToPosition,
	positionToAngle,
	arcPath,
	innerRadius,
	outerRadius
};