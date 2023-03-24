// Generate an array of timestamps. ex [12:00, 12:05, 12:10...]
export const generateTimestamps = (step) => {
	const dt = new Date(1970, 0, 1);
	const timestamps = [];
	while (dt.getDate() === 1) {
		timestamps.push(dt.toLocaleTimeString('en-US', {hour12: false}).substring(0, 5));
		dt.setMinutes(dt.getMinutes() + step);
	}

	return timestamps;
};

// Get the color in HEX format and convert it in HSL format
const hexToHSL = (hex) => {
	// Convert hex to RGB first
	let r = 0, g = 0, b = 0;
	if (hex.length === 4) {
		r = parseInt(hex[1] + hex[1], 16);
		g = parseInt(hex[2] + hex[2], 16);
		b = parseInt(hex[3] + hex[3], 16);
	} else if (hex.length === 7) {
		r = parseInt(hex.slice(1, 3), 16);
		g = parseInt(hex.slice(3, 5), 16);
		b = parseInt(hex.slice(5), 16);
	}

	// Then convert RGB to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h, s, l;

	if (delta === 0) {
		h = 0;
	} else if (cmax === r) {
		h = ((g - b) / delta) % 6;
	} else if (cmax === g) {
		h = (b - r) / delta + 2;
	} else {
		h = (r - g) / delta + 4;
	}

	h = Math.round(h * 60);

	if (h < 0) {
		h += 360;
	}

	l = (cmax + cmin) / 2;
	s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return {h, s, l};
};

// Convert HSL color back to HEX color
const HSLToHex = ({h, s, l}) => {
	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs((h / 60) % 2 - 1)),
		m = l - c / 2,
		r = 0,
		g = 0,
		b = 0;

	if (0 <= h && h < 60) {
		r = c; g = x; b = 0;
	} else if (60 <= h && h < 120) {
		r = x; g = c; b = 0;
	} else if (120 <= h && h < 180) {
		r = 0; g = c; b = x;
	} else if (180 <= h && h < 240) {
		r = 0; g = x; b = c;
	} else if (240 <= h && h < 300) {
		r = x; g = 0; b = c;
	} else if (300 <= h && h < 360) {
		r = c; g = 0; b = x;
	}

	// Having obtained RGB, convert channels to hex
	r = Math.round((r + m) * 255).toString(16);
	g = Math.round((g + m) * 255).toString(16);
	b = Math.round((b + m) * 255).toString(16);

	// Prepend 0s, if necessary
	if (r.length === 1) {
		r = "0" + r;
	}

	if (g.length === 1) {
		g = "0" + g;
	}

	if (b.length === 1) {
		b = "0" + b;
	}

	return "#" + r + g + b;
};

// Generate colors
export const generateColorsDayMode = (baseColor, numColors) => {
	// Create an array to hold the colors
	let colors = [baseColor];

	// Calculate the step size for increasing saturation and luminosity
	let step = 0.3;

	// Loop through the number of colors requested
	for (let i = 0; i < numColors - 1; i++) {
		// Convert the base color to HSL format
		const currentColor = hexToHSL(colors[i]);

		// Calculate saturation and luminosity for the current color
		let luminosity,
			saturation;
		if (i % 2) {
			luminosity = currentColor.l - i / 2 * step;
			saturation = currentColor.s;
		} else {
			luminosity = currentColor.l;
			saturation = currentColor.s + i / 2 * step;
		}

		let hslColor;
		// Create the color in HSL format
		if (saturation <= 100 && luminosity >= 10) {
			hslColor = {h: currentColor.h, s: saturation, l: luminosity};
		} else if (saturation > 100 && luminosity >= 10) {
			hslColor = {h: currentColor.h, s: 100, l: luminosity};
		} else if (saturation <= 100 && luminosity < 10) {
			hslColor = {h: currentColor.h, s: saturation, l: 10};
		} else if (saturation > 100 && luminosity < 10) {
			hslColor = {h: currentColor.h, s: 100, l: 10};
		}

		// Convert the color back to HEX format and add it to the color array
		let hexColor = HSLToHex(hslColor);
		colors.push(hexColor);
	}

	return colors;
};

export const generateColorsNightMode = (baseColor, numColors) => {
	// Create an array to hold the colors
	let colors = [baseColor];

	// Calculate the step size for increasing saturation and luminosity
	let step = 0.3;

	// Loop through the number of colors requested
	for (let i = 0; i < numColors - 1; i++) {
		// Convert the base color to HSL format
		const currentColor = hexToHSL(colors[i]);

		// Calculate the saturation for this color
		let luminosity,
			saturation;

		if (i % 2) {
			luminosity = currentColor.l + i / 2 * step;
			saturation = currentColor.s;
		} else {
			luminosity = currentColor.l;
			saturation = currentColor.s - i / 2 * step;
		}

		let hslColor;
		// Create the color in HSL format
		if (saturation >= 25 && luminosity <= 80) {
			hslColor = {h: currentColor.h, s: saturation, l: luminosity};
		} else if (saturation < 25 && luminosity <= 80) {
			hslColor = {h: currentColor.h, s: 25, l: luminosity};
		} else if (saturation >= 25 && luminosity > 80) {
			hslColor = {h: currentColor.h, s: saturation, l: 80};
		} else if (saturation < 25 && luminosity > 80) {
			hslColor = {h: currentColor.h, s: 25, l: 80};
		}

		// Convert the color back to hex format and add it to the array
		let hexColor = HSLToHex(hslColor);
		colors.push(hexColor);
	}

	return colors;
}

// Time when the colors are changing
export const getIndex = () => {
	let minute = parseInt(new Date().toLocaleTimeString('en-US', {hour12: false}).substring(0, 5).slice(3));
	let hour = parseInt(new Date().toLocaleTimeString('en-US', {hour12: false}).substring(0, 8));
	let index;

	while (minute % 5 !== 0) minute++;
	if (minute >= 60) {
		minute = 0;
		hour++;
	}
	if (hour > 24) {
		hour = 1;
	}
	if (hour < 10) {
		index = '0' + hour + ':';
	} else {
		index = hour + ':';
	}
	if (minute < 10) {
		index = index + '0' + minute;
	} else {
		index = index + minute;
	}

	return index;
};
