const Page = require('./DropdownPage');

describe('Dropdown', function () {

	beforeEach(async function () {
		await Page.open();
	});

	describe('focus management', function () {

		it('should focus the `#dropdownDefault` when page loads', async function () {
			expect(await Page.components.dropdownDefault.childItem.isFocused()).toBe(true);
		});
	});

	describe('default', function () {
		const dropdownSelected = Page.components.dropdownSelected;

		it('should have correct text', async function () {
			expect(await dropdownSelected.selectedValue).toBe('two');
		});

		it('should have correct text after changing selected value', async function () {
			expect(await Page.components.dropdownDefault.childItem.isFocused()).toBe(true);

			await Page.spotlightDown();
			expect(await dropdownSelected.childItem.isFocused()).toBe(true);
			expect(await dropdownSelected.selectedValue).toBe('two');

			await Page.spotlightSelect();
			await browser.pause(1000);
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightSelect();
			await browser.pause(1000);

			expect(await dropdownSelected.selectedValue).toBe('five');
		});
	});

	describe('5-way', function () {

		it('should focus the `#dropdownDirectionAbove` when 5-way right', async function () {
			expect(await Page.components.dropdownDefault.childItem.isFocused()).toBe(true);

			await Page.spotlightRight();
			expect(await Page.components.dropdownDirectionAbove.childItem.isFocused()).toBe(true);
		});

		it('should focus `#dropdownSelected` when 5-way down', async function () {
			expect(await Page.components.dropdownDefault.childItem.isFocused()).toBe(true);

			await Page.spotlightDown();
			expect(await Page.components.dropdownSelected.childItem.isFocused()).toBe(true);
		});

		it('should focus the first item in `#dropdownDefault` option list when 5-way enter and down', async function () {
			expect(await Page.components.dropdownDefault.childItem.isFocused()).toBe(true);

			await Page.spotlightSelect();

			expect(await Page.components.dropdownDefault.item(0).isFocused()).toBe(true);
		});
	});

	describe('pointer', function () {

		it('should dismiss dropdown when clicking outside', async function () {
			const dropdown = Page.components.dropdownDefault;

			// Open the first dropdown and wait for the first list item to be focused
			await Page.spotlightSelect();
			await browser.pause(1000);
			await Page.spotlightDown();

			// Click in the area outside the Dropdown (in the empty space created by the wrapper)
			const wrapper = $('#wrapper');
			await wrapper.click({x: 0, y: 0});

			await browser.pause(1000);

			// Verify that the floating list no longer exists (Dropdown is closed)
			expect(await dropdown.isOpen).not.toBe(true);
		});
	});
});
