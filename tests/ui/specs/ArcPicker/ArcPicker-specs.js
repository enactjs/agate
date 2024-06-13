const Page = require('./ArcPickerPage');
const accentColor = 'rgb(139,126,254)'; // selected and focused
const selectedColor = 'rgb(0,0,0)';
const unselectedColor = 'rgb(136,136,136)';

describe('ArcPicker', function () {

	beforeEach(async function () {
		await Page.open();
	});

	describe('default', function () {
		const arcPicker = Page.components.arcPickerDefault;

		it('should have the first arc selected by default', async function () {
			await Page.spotlightSelect();

			expect((await arcPicker.coloredPath(1).getCSSProperty('stroke')).value).toBe(accentColor);
		});

		it('should select the third arc when it is clicked', async function () {
			await arcPicker.clickablePath(3).click();
			expect((await arcPicker.coloredPath(3).getCSSProperty('stroke')).value).toBe(accentColor);
			// previous arcs should remain unselected
			expect((await arcPicker.coloredPath(1).getCSSProperty('stroke')).value).toBe(unselectedColor);
			expect((await arcPicker.coloredPath(2).getCSSProperty('stroke')).value).toBe(unselectedColor);
		});
	});

	describe('cumulative', function () {
		const arcPicker = Page.components.arcPickerCumulative;

		it('should select all arcs up to the clicked arc', async function () {
			await arcPicker.clickablePath(3).click();
			expect((await arcPicker.coloredPath(1).getCSSProperty('stroke')).value).toBe(accentColor);
			expect((await arcPicker.coloredPath(2).getCSSProperty('stroke')).value).toBe(accentColor);
			expect((await arcPicker.coloredPath(3).getCSSProperty('stroke')).value).toBe(accentColor);
			// next one is unselected
			expect((await arcPicker.coloredPath(4).getCSSProperty('stroke')).value).toBe(unselectedColor);
		});
	});

	describe('disabled', function () {
		const arcPicker = Page.components.arcPickerDisabled;

		it('should have the first arc selected by default', async function () {
			expect((await arcPicker.coloredPath(1).getCSSProperty('stroke')).value).toBe(selectedColor);
		});

		it('should not select the third arc when it is clicked', async function () {
			await arcPicker.clickablePath(3).click();
			expect((await arcPicker.coloredPath(3).getCSSProperty('stroke')).value).toBe(unselectedColor);
			// first arc should remain selected
			expect((await arcPicker.coloredPath(1).getCSSProperty('stroke')).value).toBe(accentColor);
		});
	});
});
