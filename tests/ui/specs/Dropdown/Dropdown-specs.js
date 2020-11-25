/* eslint-disable no-undefined */
const Page = require('./DropdownPage');

describe('Dropdown', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('focus management', function () {

		it('should focus the `#dropdownDefault` when page loads', function () {
			expect(Page.components.dropdownDefault.childItem.isFocused()).to.be.true();
		});
	});

	describe('5-way', function () {

		it('should focus the `#dropdownDirectionRight` when 5-way right', function () {
			expect(Page.components.dropdownDefault.childItem.isFocused()).to.be.true();

			Page.spotlightRight();
			expect(Page.components.dropdownDirectionRight.childItem.isFocused()).to.be.true();
		});

		it('should focus `#dropdownDisabled` when 5-way down', function () {
			expect(Page.components.dropdownDefault.childItem.isFocused()).to.be.true();

			Page.spotlightDown();
			expect(Page.components.dropdownDisabled.childItem.isFocused()).to.be.true();
		});

		it('should focus the first item in `#dropdownDefault` option list when 5-way enter and down', function () {
			expect(Page.components.dropdownDefault.childItem.isFocused()).to.be.true();

			Page.spotlightSelect();
			browser.pause(1000);
			Page.spotlightDown();

			expect(Page.components.dropdownDefault.item(0).isFocused()).to.be.true();
		});
	});

	describe('pointer', function () {

		it('should dismiss dropdown when clicking outside', function () {
			const dropdown = Page.components.dropdownDefault;

			// Open the first dropdown and wait for the first list item to be focused
			Page.spotlightSelect();
			browser.pause(1000);
			Page.spotlightDown();

			// Click in the area outside the Dropdown (in the empty space created by the wrapper)
			const wrapper = $('#wrapper');
			wrapper.click({x: 0, y: 0});

			browser.pause(1000);

			// Verify that the floating list no longer exists (Dropdown is closed)
			expect(dropdown.isOpen).to.not.be.true();
		});
	});
});
