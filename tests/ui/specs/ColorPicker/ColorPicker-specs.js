const Page = require('./ColorPickerPage');

describe('ColorPicker', function () {

	beforeEach(async function () {
		await Page.open();
	});

	describe('focus management', function () {
		it('should focus the `#colorPickerDefault` when page loads', async function () {
			expect(await Page.components.colorPickerDefault.button.isFocused()).to.be.true();
		});
	});

	describe('default', function () {
		const colorPickerDefault = Page.components.colorPickerDefault;

		it('should have correct value', async function () {
			expect(await colorPickerDefault.colorSwatch).to.equal('#FF7FAE');
		});
	});

	describe('5-way', function () {
		it('should have correct color code after changing selected value', async function () {
			const colorPickerDefault = Page.components.colorPickerDefault;

			expect(await colorPickerDefault.button.isFocused()).to.be.true();
			expect(await colorPickerDefault.colorSwatch).to.equal('#FF7FAE');

			await Page.spotlightSelect();
			await browser.pause(1000);
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await browser.pause(200);

			expect(await colorPickerDefault.colorSwatch).to.equal('#8333E9');
		});

		it('should not open the `#colorPickerDisabled` when 5-way down and select', async function () {
			const colorPickerDisabled = Page.components.colorPickerDisabled;

			expect(await Page.components.colorPickerDefault.button.isFocused()).to.be.true();

			await Page.spotlightDown();
			await Page.spotlightSelect();
			expect(colorPickerDisabled.isOpen).to.not.be.true();
		});

		it('should focus the `#colorPickerDirectionUp` when 5-way down, then down', async function () {
			const colorPickerDirectionUp = Page.components.colorPickerDirectionUp;

			expect(await Page.components.colorPickerDefault.button.isFocused()).to.be.true();

			await Page.spotlightDown();
			await Page.spotlightDown();
			expect(await colorPickerDirectionUp.button.isFocused()).to.be.true();
		});

		it('should focus the first color item in `#colorPickerOpen` option list when 5-way right', async function () {
			const colorPickerOpen = Page.components.colorPickerOpen;

			expect(await Page.components.colorPickerDefault.button.isFocused()).to.be.true();

			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightSelect();
			await Page.spotlightRight();

			expect(await colorPickerOpen.item(1).isFocused()).to.be.true();
		});
	});

	describe('pointer', function () {
		it('should open colorPicker on click and select a new color', async function () {
			const colorPicker = Page.components.colorPickerDefault;
			const oldColor = await colorPicker.colorSwatch;

			// Open the first colorPicker and wait for the first color list item to be focused
			await colorPicker.button.click();
			await browser.pause(1000);

			// Click on first button in palette
			await colorPicker.item(1).click();
			await browser.pause(1000);

			// Verify the selected color
			const newColor = await colorPicker.colorSwatch;
			expect(oldColor !== newColor).to.be.true();
		});

		it('should dismiss colorPicker when clicking outside', async function () {
			const colorPicker = Page.components.colorPickerDefault;

			// Open the first colorPicker and wait for the first color list item to be focused
			await Page.spotlightSelect();
			await browser.pause(1000);
			await Page.spotlightRight();

			// Click in the area outside the ColorPicker (in the empty space created by the wrapper)
			const wrapper = $('#wrapper');
			await wrapper.click({x: 0, y: 0});

			await browser.pause(1000);

			// Verify that the floating list no longer exists (ColorPicker is closed)
			expect(colorPicker.isOpen).to.not.be.true();
		});
	});
});
