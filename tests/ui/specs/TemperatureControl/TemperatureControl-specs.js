const Page = require('./TemperatureControlPage');

describe('TemperatureControl', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const temperatureControl = Page.components.temperatureControlDefault;

		it('should change the position of the slider knob on each different click position', function () {
			const {cx: originalCx, cy: originalCy} = temperatureControl.knobPosition;

			temperatureControl.self.click({x: 0, y: -10});
			const {cx: cx1, cy: cy1} = temperatureControl.knobPosition;
			expect(cx1 !== originalCx).to.be.true();
			expect(cy1 !== originalCy).to.be.true();

			temperatureControl.self.click({x: -15, y: -20});
			const {cx: cx2, cy: cy2} = temperatureControl.knobPosition;
			expect(cx2 !== cx1).to.be.true();
			expect(cy2 !== cy1).to.be.true();
		});

		it('should change value of the temperature on  different click position', function () {
			const originalValue = temperatureControl.valueText;

			temperatureControl.self.click({x: 0, y: -10});
			const value1 = temperatureControl.valueText;
			expect(value1 !== originalValue).to.be.true();

			temperatureControl.self.click({x: -15, y: -20});
			const value2 = temperatureControl.valueText;
			expect(value2 !== value1).to.be.true();
		});

		it('should have blue foregroundColor if value < half of the scale', function () {
			// click on the left side of the component
			temperatureControl.self.click({x: -5, y: -10});
			// second slider has the foreground color
			expect(temperatureControl.coloredPath(2).getCSSProperty('stroke').value).to.equal('rgb(0,122,255)');
		});

		it('should have red foregroundColor if value >= half of the scale', function () {
			// click on the right side of the component
			temperatureControl.self.click({x: 5, y: -10});
			// second slider has the foreground color
			expect(temperatureControl.coloredPath(2).getCSSProperty('stroke').value).to.equal('rgb(242,73,73)');
		});

	});

	describe('custom', function () {
		// slider has 3 values. first value is active in the bottom-left quarter. second value is active for top half and third value is active for bottom-right quarter
		const temperatureControl = Page.components.temperatureControlCustom;

		it('should not change the position of the slider knob on click on the bottom-left part of the circle', function () {
			const {cx: originalCx, cy: originalCy} = temperatureControl.knobPosition;
			// bottom-left part means negative x and positive y
			temperatureControl.self.click({x: -5, y: 5});

			const {cx, cy} = temperatureControl.knobPosition;
			expect(cx === originalCx).to.be.true();
			expect(cy === originalCy).to.be.true();
		});

		it('should change the position of the slider knob on click on the top part of the circle', function () {
			const {cx: originalCx, cy: originalCy} = temperatureControl.knobPosition;

			// top part means any value x and negative value for y
			temperatureControl.self.click({x: 10, y: -10});

			const {cx, cy} = temperatureControl.knobPosition;

			expect(cx !== originalCx).to.be.true();
			expect(cy !== originalCy).to.be.true();
		});

		it('should not change value of the temperature on click on the bottom-left part of the circle', function () {
			const originalValue = temperatureControl.valueText;

			temperatureControl.self.click({x: -5, y: 5});
			const newValue = temperatureControl.valueText;
			expect(newValue === originalValue).to.be.true();
		});

		it('should change value of the temperature on click on the top part of the circle', function () {
			const originalValue = temperatureControl.valueText;

			temperatureControl.self.click({x: 10, y: -10});
			const newValue = temperatureControl.valueText;
			expect(newValue !== originalValue).to.be.true();
		});

	});

	describe('disabled', function () {
		const temperatureControl = Page.components.temperatureControlDisabled;

		it('should not change the position of the slider knob on click', function () {
			const {cx: originalCx, cy: originalCy} = temperatureControl.knobPosition;

			temperatureControl.self.click({x: -5, y: 0});

			const {cx, cy} = temperatureControl.knobPosition;
			expect(cx === originalCx).to.be.true();
			expect(cy === originalCy).to.be.true();
		});
	});

	describe('RTL locale', function () {
		const temperatureControl = Page.components.temperatureControlDefault;

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should have direction rtl', function () {
			expect(temperatureControl.self.getCSSProperty('direction').value === 'rtl').to.be.true();
		});

		it('value should have arabic characters', function () {
			// we test the character for temperature degrees
			expect(temperatureControl.valueText.includes('°م')).to.be.true();
		});
	});
});
