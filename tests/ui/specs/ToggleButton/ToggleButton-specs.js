const Page = require('./ToggleButton-Page');

describe('ToggleButton', function () {

	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first item at start', async function () {
		expect(await Page.components.toggleDefault.self.isFocused()).toBe(true);
	});

	describe('default', function () {
		const toggleButton = Page.components.toggleDefault;

		it('should have correct text', async function () {
			expect((await toggleButton.textContent).toLowerCase()).toBe('missing toggle label');
		});

		it('should be unselected', async function () {
			expect(await toggleButton.isSelected).toBe(false);
		});
	});

	describe('labelled', function () {
		const toggleButton = Page.components.toggleWithLabels;

		it('should have correct text', async function () {
			expect((await toggleButton.textContent).toLowerCase()).toBe('off');
		});

		it('should be unselected', async function () {
			expect(await toggleButton.isSelected).toBe(false);
		});
	});

});
