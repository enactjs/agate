const Page = require('./TemperatureControlPage');

describe('TemperatureControl', function () {

	beforeEach(async function () {
		await Page.open();
	});

	describe('default', function () {
		const temperatureControl = Page.components.temperatureControlDefault;

		it('should change the position of the slider knob on each different click position', async function () {
			const {cx: originalCx, cy: originalCy} = await temperatureControl.knobPosition();

			await temperatureControl.self.click({x: 0, y: -10});
			const {cx: cx1, cy: cy1} = await temperatureControl.knobPosition();
			expect(cx1 !== originalCx).toBe(true);
			expect(cy1 !== originalCy).toBe(true);

			await temperatureControl.self.click({x: -15, y: -20});
			const {cx: cx2, cy: cy2} = await temperatureControl.knobPosition();
			expect(cx2 !== cx1).toBe(true);
			expect(cy2 !== cy1).toBe(true);
		});

		it('should change value of the temperature on  different click position', async function () {
			const originalValue = temperatureControl.valueText;

			await temperatureControl.self.click({x: 0, y: -10});
			const value1 = await temperatureControl.valueText;
			expect(value1 !== originalValue).toBe(true);

			await temperatureControl.self.click({x: -15, y: -20});
			const value2 = await temperatureControl.valueText;
			expect(value2 !== value1).toBe(true);
		});

		it('should have blue foregroundColor if value < half of the scale', async function () {
			// click on the left side of the component
			await temperatureControl.self.click({x: -5, y: -10});
			// second slider has the foreground color
			expect((await temperatureControl.coloredPath(2).getCSSProperty('stroke')).value).toBe('rgb(0,122,255)');
		});

		it('should have red foregroundColor if value >= half of the scale', async function () {
			// click on the right side of the component
			await temperatureControl.self.click({x: 5, y: -10});
			// second slider has the foreground color
			expect((await temperatureControl.coloredPath(2).getCSSProperty('stroke')).value).toBe('rgb(242,73,73)');
		});

	});

	describe('custom', function () {
		// slider has 3 values. first value is active in the bottom-left quarter. second value is active for top half and third value is active for bottom-right quarter
		const temperatureControl = Page.components.temperatureControlCustom;

		it('should not change the position of the slider knob on click on the bottom-left part of the circle', async function () {
			const {cx: originalCx, cy: originalCy} = await temperatureControl.knobPosition();
			// bottom-left part means negative x and positive y
			await temperatureControl.self.click({x: -5, y: 5});

			const {cx, cy} = await temperatureControl.knobPosition();

			expect(cx === originalCx).toBe(true);
			expect(cy === originalCy).toBe(true);
		});

		it('should change the position of the slider knob on click on the top part of the circle', async function () {
			const {cx: originalCx, cy: originalCy} = await temperatureControl.knobPosition();
			// top part means any value x and negative value for y
			await temperatureControl.self.click({x: 10, y: -10});

			const {cx, cy} = await temperatureControl.knobPosition();

			expect(cx !== originalCx).toBe(true);
			expect(cy !== originalCy).toBe(true);
		});

		it('should not change value of the temperature on click on the bottom-left part of the circle', async function () {
			const originalValue = await temperatureControl.valueText;

			await temperatureControl.self.click({x: -5, y: 5});
			const newValue = await temperatureControl.valueText;
			expect(newValue === originalValue).toBe(true);
		});

		it('should change value of the temperature on click on the top part of the circle', async function () {
			const originalValue = await temperatureControl.valueText;

			await temperatureControl.self.click({x: 10, y: -10});
			const newValue = await temperatureControl.valueText;
			expect(newValue !== originalValue).toBe(true);
		});

	});

	describe('disabled', function () {
		const temperatureControl = Page.components.temperatureControlDisabled;

		it('should not change the position of the slider knob on click', async function () {
			const {cx: originalCx, cy: originalCy} = await temperatureControl.knobPosition();

			await temperatureControl.self.click({x: -5, y: 0});

			const {cx, cy} = await temperatureControl.knobPosition();
			expect(cx === originalCx).toBe(true);
			expect(cy === originalCy).toBe(true);
		});
	});

	describe('RTL locale', function () {
		const temperatureControl = Page.components.temperatureControlDefault;

		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should have direction rtl', async function () {
			expect((await temperatureControl.self.getCSSProperty('direction')).value === 'rtl').toBe(true);
		});

		it('value should have arabic characters', async function () {
			// we test the character for temperature degrees
			expect((await temperatureControl.valueText).includes('°م')).toBe(true);
		});
	});
});
