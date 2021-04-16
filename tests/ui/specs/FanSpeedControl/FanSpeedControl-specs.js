const Page = require('./FanSpeedControlPage');
const accentColor = 'rgb(139,126,254)'; // selected and focused
const selectedColor = 'rgb(0,0,0)';
const unselectedColor = 'rgb(136,136,136)';

describe('FanSpeedControl', function () {
	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const fanSpeedControl = Page.components.fanSpeedControlDefault;

		it('should have the first arc selected by default', function () {
			Page.spotlightSelect();

			expect(fanSpeedControl.coloredPath(1).getCSSProperty('stroke').value).to.equal(accentColor);
		});

		it('should select all arcs up to the clicked arc', function () {
			fanSpeedControl.clickablePath(3).click();
			expect(fanSpeedControl.coloredPath(1).getCSSProperty('stroke').value).to.equal(accentColor);
			expect(fanSpeedControl.coloredPath(2).getCSSProperty('stroke').value).to.equal(accentColor);
			expect(fanSpeedControl.coloredPath(3).getCSSProperty('stroke').value).to.equal(accentColor);
			// next one is unselected
			expect(fanSpeedControl.coloredPath(4).getCSSProperty('stroke').value).to.equal(unselectedColor);
		});

		it('should display `fan` icon', function () {
			expect(fanSpeedControl.iconValue()).to.equal(983227); // decimal converted charCode of Unicode 'fan' character
		});

		it('should display value `1` by default', function () {
			expect(fanSpeedControl.fanValue()).to.equal('1');
		});

		it('should display value `10` when selecting 10th arc', function () {
			fanSpeedControl.clickablePath(10).click();

			expect(fanSpeedControl.fanValue()).to.equal('10');
		});
	});

	describe('custom', function () {
		const fanSpeedControl = Page.components.fanSpeedControlCustom;

		it('should display custom icon', function () {
			expect(fanSpeedControl.iconValue()).to.equal(983060); // decimal converted charCode of Unicode 'happyface' character
		});
	});

	describe('disabled', function () {
		const fanSpeedControl = Page.components.fanSpeedControlDisabled;

		it('should have the first arc selected by default', function () {
			expect(fanSpeedControl.coloredPath(1).getCSSProperty('stroke').value).to.equal(selectedColor);
		});

		it('should display `fan` icon', function () {
			expect(fanSpeedControl.iconValue()).to.equal(983227); // decimal converted charCode of Unicode 'fan' character
		});

		it('should display value `1` by default', function () {
			expect(fanSpeedControl.fanValue()).to.equal('1');
		});

		it('should not select the third arc when it is clicked', function () {
			fanSpeedControl.clickablePath(3).click();
			expect(fanSpeedControl.coloredPath(3).getCSSProperty('stroke').value).to.equal(unselectedColor);
			// first arc should remain selected
			expect(fanSpeedControl.coloredPath(1).getCSSProperty('stroke').value).to.equal(accentColor);
		});
	});
});
