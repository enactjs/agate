const ScrollerPage = require('./ScrollerPage');

describe('Scroller', function () {

	it('should meet initial conditions', function () {
		ScrollerPage.open();
		expect(ScrollerPage.buttonHideScrollbar.isFocused(), 'focus').to.be.true();
	});

	describe('FocusableScrollbar knobs', function () {
		beforeEach(function () {
			ScrollerPage.open();
		});

		it('should focus on scroll up button with focusableScrollbar `true`', function () {
			// Set focusableScrollbar=true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();

			// Focus on scroll up button.
			ScrollerPage.showPointerByKeycode();
			ScrollerPage.button('scroll up').moveTo();

			// Verify if Spotlight is on the scroll up button.
			expect(ScrollerPage.button('scroll up').isFocused()).to.be.true();
		});

		it('should focus on scroll up button with 5-way key and focusableScrollbar `true`', function () {
			// Set focusableScrollbar=true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();

			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightRight();
			ScrollerPage.spotlightRight();
			ScrollerPage.spotlightUp();

			expect(ScrollerPage.button('scroll up').isFocused()).to.be.true();
		});

		it('should Scrolling via 5-way Key with Spotlight on the scroll down button', function () {
			// Set focusableScrollbar=true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();

			// Verify if scroll thumb's position is at the top of the verticalScrollbar track.
			const initialVerticalScrollThumbPosition = ScrollerPage.getScrollThumbPosition().vertical;
			expect(initialVerticalScrollThumbPosition).to.equal('0');

			// Focus on the scroll down button in verticalScrollbar.
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightRight();
			ScrollerPage.spotlightRight();

			expect(ScrollerPage.button('scroll down').isFocused()).to.be.true();

			// 5-Way Select.
			ScrollerPage.spotlightSelect();
			ScrollerPage.delay(1000);

			// Verify if scroll thumb moves down.
			expect((ScrollerPage.getScrollThumbPosition().vertical > initialVerticalScrollThumbPosition)).to.be.true();
		});
	});

	describe('RTL Locale', function () {
		beforeEach(function () {
			ScrollerPage.open('', '?locale=ar-SA');
		});

		it('should focus on scroll left button with focusableScrollbar `true`', function () {
			// Set focusableScrollbar=true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();

			// Focus on the scroll left button.
			ScrollerPage.showPointerByKeycode();
			ScrollerPage.button('scroll left').moveTo();

			// Verify if Spotlight is on the scroll left button.
			expect(ScrollerPage.button('scroll left').isFocused()).to.be.true();
		});

		it('should focus not on scroll right button with 5-way key and focusableScrollbar `false`', function () {
			// Set focusableScrollbar=false
			ScrollerPage.dropdownFocusableScrollbar.moveTo();

			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();

			expect(ScrollerPage.button('scroll right').isFocused()).to.not.be.true();
		});

		it('should Scrolling via 5-way Key with Spotlight on the scroll left button', function () {
			// Set focusableScrollbar=true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();

			// Verify if scroll thumb's position is at right=0 of the horizontalScrollbar track.
			const initialHorizontalScrollThumbPosition = ScrollerPage.getScrollThumbPosition().horizontal;
			expect(initialHorizontalScrollThumbPosition).to.equal('0');

			// Focus on the Scroll left button in horizontalScrollbar.
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightLeft();

			expect(ScrollerPage.button('scroll left').isFocused()).to.be.true();

			// 5-Way Select.
			ScrollerPage.spotlightSelect();
			ScrollerPage.delay(1000);

			// Verify if Scroll thumb moves left.
			expect((ScrollerPage.getScrollThumbPosition().horizontal > initialHorizontalScrollThumbPosition)).to.be.true();
		});
	});
});
