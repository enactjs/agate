const Page = require('./WindDirectionControlPage');
const accentColor = 'rgb(139,126,254)'; // selected and focused
const selectedColor = 'rgb(68,68,68)';
const unselectedColor = 'rgb(238,238,238)';

describe('WindDirectionControl', function () {
	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const windDirectionControl = Page.components.windDirectionControlDefault;

		it('should have the first arc selected by default', function () {
			expect(windDirectionControl.coloredPath(1).getCSSProperty('stroke').value).to.equal(accentColor);
		});

		it('should display `airdown` icon', function () {
			expect(windDirectionControl.iconValue()).to.equal(983221); // decimal converted charCode of Unicode 'airdown' character
		});
	});

	describe('air right', function () {
		const windDirectionControl = Page.components.winDirectionControlAirRight;

		it('should have the second arc selected', function () {
			expect(windDirectionControl.coloredPath(2).getCSSProperty('stroke').value).to.equal(selectedColor);
		});

		it('should display `airright` icon', function () {
			expect(windDirectionControl.iconValue()).to.equal(983223); // decimal converted charCode of Unicode 'airright' character
		});
	});

	describe('air up', function () {
		const windDirectionControl = Page.components.windDirectionControlAirUp;

		it('should have the third arc selected', function () {
			expect(windDirectionControl.coloredPath(3).getCSSProperty('stroke').value).to.equal(selectedColor);
		});

		it('should display `airup` icon', function () {
			expect(windDirectionControl.iconValue()).to.equal(983222); // decimal converted charCode of Unicode 'airup' character
		});
	});

	describe('disabled', function () {
		const windDirectionControl = Page.components.windDirectionControlDisabled;

		it('should have the first arc selected by default', function () {
			expect(windDirectionControl.coloredPath(1).getCSSProperty('stroke').value).to.equal(selectedColor);
		});

		it('should display `airdown` icon', function () {
			expect(windDirectionControl.iconValue()).to.equal(983221); // decimal converted charCode of Unicode 'airdown' character
		});

		it('should not select the third arc when clicked', function () {
			windDirectionControl.clickablePath(3).click();
			expect(windDirectionControl.coloredPath(3).getCSSProperty('stroke').value).to.equal(unselectedColor);
			// first arc should remain selected
			expect(windDirectionControl.coloredPath(1).getCSSProperty('stroke').value).to.equal(accentColor);
		});
	});
});
