// const Page = require('./WindDirectionControlPage');
import Page from './WindDirectionControlPage.mjs';
const accentColor = 'rgb(139,126,254)'; // selected and focused
const selectedColor = 'rgb(0,0,0)';
const unselectedColor = 'rgb(136,136,136)';

describe('WindDirectionControl', function () {
	beforeEach(async function () {
		await Page.open();
	});

	describe('default', function () {
		const windDirectionControl = Page.components.windDirectionControlDefault;

		it('should have the first arc selected by default', async function () {
			await Page.spotlightSelect();

			expect((await windDirectionControl.coloredPath(1).getCSSProperty('stroke')).value).to.equal(accentColor);
		});

		it('should display `airdown` icon', async function () {
			expect(await windDirectionControl.iconValue()).to.equal(983221); // decimal converted charCode of Unicode 'airdown' character
		});
	});

	describe('air right', function () {
		const windDirectionControl = Page.components.winDirectionControlAirRight;

		it('should have the second arc selected', async function () {
			expect((await windDirectionControl.coloredPath(2).getCSSProperty('stroke')).value).to.equal(selectedColor);
		});

		it('should display `airright` icon', async function () {
			expect(await windDirectionControl.iconValue()).to.equal(983223); // decimal converted charCode of Unicode 'airright' character
		});
	});

	describe('air up', function () {
		const windDirectionControl = Page.components.windDirectionControlAirUp;

		it('should have the third arc selected', async function () {
			expect((await windDirectionControl.coloredPath(3).getCSSProperty('stroke')).value).to.equal(selectedColor);
		});

		it('should display `airup` icon', async function () {
			expect(await windDirectionControl.iconValue()).to.equal(983222); // decimal converted charCode of Unicode 'airup' character
		});
	});

	describe('disabled', function () {
		const windDirectionControl = Page.components.windDirectionControlDisabled;

		it('should have the first arc selected by default', async function () {
			expect((await windDirectionControl.coloredPath(1).getCSSProperty('stroke')).value).to.equal(selectedColor);
		});

		it('should display `airdown` icon', async function () {
			expect(await windDirectionControl.iconValue()).to.equal(983221); // decimal converted charCode of Unicode 'airdown' character
		});

		it('should not select the third arc when clicked', async function () {
			windDirectionControl.clickablePath(3).click();
			expect((await windDirectionControl.coloredPath(3).getCSSProperty('stroke')).value).to.equal(unselectedColor);
			// first arc should remain selected
			expect((await windDirectionControl.coloredPath(1).getCSSProperty('stroke')).value).to.equal(accentColor);
		});
	});
});
