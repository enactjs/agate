const ScrollerPage = require('./ScrollerPage');

describe('Scroller', function () {

	it('should meet initial conditions', async function () {
		await ScrollerPage.open();
		expect(await ScrollerPage.buttonHideScrollbar.isFocused(), 'focus').to.be.true();
	});

	describe('FocusableScrollbar knobs', function () {
		beforeEach(async function () {
			await ScrollerPage.open();
		});

		it('should focus on scroll up button with focusableScrollbar `true`', async function () {
			// Set focusableScrollbar=true
			await ScrollerPage.dropdownFocusableScrollbar.moveTo();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();

			// Focus on scroll up button.
			await ScrollerPage.showPointerByKeycode();
			await (await ScrollerPage.button('scroll up')).moveTo();

			// Verify if Spotlight is on the scroll up button.
			expect(await (await ScrollerPage.button('scroll up')).isFocused()).to.be.true();
		});

		it('should focus on scroll up button with 5-way key and focusableScrollbar `true`', async function () {
			// Set focusableScrollbar=true
			await ScrollerPage.dropdownFocusableScrollbar.moveTo();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();

			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightRight();
			await ScrollerPage.spotlightRight();
			await ScrollerPage.spotlightUp();

			expect(await (await ScrollerPage.button('scroll up')).isFocused()).to.be.true();
		});

		it.skip('should Scrolling via 5-way Key with Spotlight on the scroll down button', async function () {
			// Set focusableScrollbar=true
			await ScrollerPage.dropdownFocusableScrollbar.moveTo();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();

			// Verify if scroll thumb's position is at the top of the verticalScrollbar track.
			const initialVerticalScrollThumbPosition = await (await ScrollerPage.getScrollThumbPosition()).vertical;
			expect(initialVerticalScrollThumbPosition).to.equal('0');

			// Focus on the scroll down button in verticalScrollbar.
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightRight();
			await ScrollerPage.spotlightRight();
			expect(await (await ScrollerPage.button('scroll down')).isFocused()).to.be.true();

			// 5-Way Select.
			await ScrollerPage.spotlightSelect();
			await browser.pause(1000);

			// Verify if scroll thumb moves down.
			expect(await (await ScrollerPage.getScrollThumbPosition()).vertical > initialVerticalScrollThumbPosition).to.be.true();
		});
	});

	describe('RTL Locale', function () {
		beforeEach(async function () {
			await ScrollerPage.open('', '?locale=ar-SA');
		});

		it('should focus on scroll left button with focusableScrollbar `true`', async function () {
			// Set focusableScrollbar=true
			await ScrollerPage.dropdownFocusableScrollbar.moveTo();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();

			// Focus on the scroll left button.
			await ScrollerPage.showPointerByKeycode();
			await (await ScrollerPage.button('scroll left')).moveTo();

			// Verify if Spotlight is on the scroll left button.
			expect(await (await ScrollerPage.button('scroll left')).isFocused()).to.be.true();
		});

		it('should focus not on scroll right button with 5-way key and focusableScrollbar `false`', async function () {
			// Set focusableScrollbar=false
			await ScrollerPage.dropdownFocusableScrollbar.moveTo();

			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightDown();

			expect(await (await ScrollerPage.button('scroll right')).isFocused()).to.not.be.true();
		});

		it.skip('should Scrolling via 5-way Key with Spotlight on the scroll left button', async function () {
			// Set focusableScrollbar=true
			await ScrollerPage.dropdownFocusableScrollbar.moveTo();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();

			// Verify if scroll thumb's position is at right=0 of the horizontalScrollbar track.
			const initialHorizontalScrollThumbPosition = (await ScrollerPage.getScrollThumbPosition()).horizontal;
			expect(initialHorizontalScrollThumbPosition).to.equal('0');

			// Focus on the Scroll left button in horizontalScrollbar.
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightLeft();

			expect(await (await ScrollerPage.button('scroll left')).isFocused()).to.be.true();

			// 5-Way Select.
			await ScrollerPage.spotlightSelect();
			await browser.pause(1000);

			// Verify if Scroll thumb moves left.
			expect(await (await ScrollerPage.getScrollThumbPosition()).horizontal > initialHorizontalScrollThumbPosition).to.be.true();
		});
	});
});
