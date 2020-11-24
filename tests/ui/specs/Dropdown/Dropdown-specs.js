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

	describe('in scroller', function () {
		beforeEach(function () {
			Page.open('InScroller');
		});

		function getDropdownOffset (dropdown, scroller) {
			return browser.execute((a, b) => {
				return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
			}, dropdown, scroller);
		}

		it('should scroll into view when navigating dropdown via 5-way', function () {
			expect(Page.components.dropdown1.childItem.isFocused()).to.be.true();

			Page.spotlightDown();
			Page.delay(1000);

			// Verify that we have scrolled down
			expect(getDropdownOffset(
				Page.components.dropdown1.self,
				$('#scroller')
			)).to.not.equal(0);

			Page.spotlightUp();
			Page.delay(1000);

			const expected = 0;
			const actual = getDropdownOffset(
				Page.components.dropdown1.self,
				$('#scroller')
			);
			expect(actual).to.equal(expected);
		});
	});
});
