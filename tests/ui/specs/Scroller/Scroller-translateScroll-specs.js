const ScrollerPage = require('./ScrollerPage');

describe('Scroller', function () {

	it('should meet initial conditions', function () {
		ScrollerPage.open();
		expect(ScrollerPage.buttonHideScrollbar.isFocused(), 'focus').to.be.true();
	});

	describe('FocusableScrollbar knobs', function () {
		beforeEach(function () {
			ScrollerPage.open();
			ScrollerPage.buttonNativeScroll.moveTo();
			ScrollerPage.spotlightSelect();
		});

		it('should focus on scroll up button with focusableScrollbar `true`', function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();
			// Step 4: Hover on the vertical Scroller.
			ScrollerPage.showPointerByKeycode();
			ScrollerPage.button('scroll up').moveTo();
			// Step 4 Verify: Spotlight is on the Scroll up button.
			expect(ScrollerPage.button('scroll up').isFocused()).to.be.true();
		});

		it('should focus on scroll up button with 5-way key and focusableScrollbar `true`', function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();

			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightUp();
			ScrollerPage.spotlightRight();

			expect(ScrollerPage.button('scroll up').isFocused()).to.be.true();
		});

		it('should Scrolling via 5-way Key with Spotlight on the scroll down button', function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();

			// Step 4 Verify: Scroll thumb's position is at the top of the verticalScrollbar track.
			const initialVerticalScrollThumbPosition = ScrollerPage.getScrollThumbPosition().vertical;
			expect(initialVerticalScrollThumbPosition).to.equal('0');

			// Step 5: Focus on the Scroll down button in verticalScrollbar.
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightRight();
			ScrollerPage.spotlightDown();

			expect(ScrollerPage.button('scroll down').isFocused()).to.be.true();

			// Step 6: 5-Way Select.
			ScrollerPage.spotlightSelect();
			ScrollerPage.delay(1000);

			// Step 7 Verify: Scroll thumb moves down.
			expect((ScrollerPage.getScrollThumbPosition().vertical > initialVerticalScrollThumbPosition)).to.be.true();
		});
	});

	describe('RTL Locale', function () {
		beforeEach(function () {
			ScrollerPage.open('', '?locale=ar-SA');
			ScrollerPage.buttonNativeScroll.moveTo();
			ScrollerPage.spotlightSelect();
		});

		it('should focus on scroll left button with focusableScrollbar `true`', function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();
			// Step 4: Hover on the horizontal Scroller.
			ScrollerPage.showPointerByKeycode();
			ScrollerPage.button('scroll left').moveTo();
			// Step 4 Verify: Spotlight is on the Scroll left button.
			expect(ScrollerPage.button('scroll left').isFocused()).to.be.true();
		});

		it('should focus on scroll right button with 5-way key and focusableScrollbar `true`', function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();

			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();

			expect(ScrollerPage.button('scroll right').isFocused()).to.be.true();
		});

		it('should Scrolling via 5-way Key with Spotlight on the scroll left button', function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();

			// Step 4 Verify: Scroll thumb's position is at right=0 of the horizontalScrollbar track.
			const initialVerticalScrollThumbPosition = ScrollerPage.getScrollThumbPosition().horizontal;
			expect(initialVerticalScrollThumbPosition).to.equal('0');

			// Step 5: Focus on the Scroll left button in horizontalScrollbar.
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightLeft();

			expect(ScrollerPage.button('scroll left').isFocused()).to.be.true();

			// Step 6: 5-Way Select.
			ScrollerPage.spotlightSelect();
			ScrollerPage.delay(1000);

			// Step 7 Verify: Scroll thumb moves left.
			expect((ScrollerPage.getScrollThumbPosition().horizontal > initialVerticalScrollThumbPosition)).to.be.true();
		});
	});
});
