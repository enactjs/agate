const Page = require('./FanSpeedControlPage');
const accentColor = 'rgb(139,126,254)'; // selected and focused
const selectedColor = 'rgb(0,0,0)';
const unselectedColor = 'rgb(136,136,136)';

describe('FanSpeedControl', function () {
	beforeEach(async function () {
		await Page.open();
	});

	describe('default', function () {
		const fanSpeedControl = Page.components.fanSpeedControlDefault;

		it('should have the first arc selected by default', async function () {
			await Page.spotlightSelect();

			expect((await fanSpeedControl.coloredPath(1).getCSSProperty('stroke')).value).toBe(accentColor);
		});

		it('should select all arcs up to the clicked arc', async function () {
			await fanSpeedControl.clickablePath(3).click();
			expect((await fanSpeedControl.coloredPath(1).getCSSProperty('stroke')).value).toBe(accentColor);
			expect((await fanSpeedControl.coloredPath(2).getCSSProperty('stroke')).value).toBe(accentColor);
			expect((await fanSpeedControl.coloredPath(3).getCSSProperty('stroke')).value).toBe(accentColor);
			// next one is unselected
			expect((await fanSpeedControl.coloredPath(4).getCSSProperty('stroke')).value).toBe(unselectedColor);
		});

		it('should display `fan` icon', async function () {
			expect(await fanSpeedControl.iconValue()).toBe(983227); // decimal converted charCode of Unicode 'fan' character
		});

		it('should display value `1` by default', async function () {
			expect(await fanSpeedControl.fanValue()).toBe('1');
		});

		it('should display value `10` when selecting 10th arc', async function () {
			await fanSpeedControl.clickablePath(10).click();

			expect(await fanSpeedControl.fanValue()).toBe('10');
		});
	});

	describe('custom', function () {
		const fanSpeedControl = Page.components.fanSpeedControlCustom;

		it('should display custom icon', async function () {
			expect(await fanSpeedControl.iconValue()).toBe(983060); // decimal converted charCode of Unicode 'happyface' character
		});
	});

	describe('disabled', function () {
		const fanSpeedControl = Page.components.fanSpeedControlDisabled;

		it('should have the first arc selected by default', async function () {
			expect((await fanSpeedControl.coloredPath(1).getCSSProperty('stroke')).value).toBe(selectedColor);
		});

		it('should display `fan` icon', async function () {
			expect(await fanSpeedControl.iconValue()).toBe(983227); // decimal converted charCode of Unicode 'fan' character
		});

		it('should display value `1` by default', async function () {
			expect(await fanSpeedControl.fanValue()).toBe('1');
		});

		it('should not select the third arc when it is clicked', async function () {
			await fanSpeedControl.clickablePath(3).click();
			expect((await fanSpeedControl.coloredPath(3).getCSSProperty('stroke')).value).toBe(unselectedColor);
			// first arc should remain selected
			expect((await fanSpeedControl.coloredPath(1).getCSSProperty('stroke')).value).toBe(accentColor);
		});
	});
});
