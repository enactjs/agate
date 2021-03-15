/* eslint-disable no-undefined */
const Page = require('./DropdownInScrollerPage');

describe('DropdownInScroller', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('in scroller', function () {

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
