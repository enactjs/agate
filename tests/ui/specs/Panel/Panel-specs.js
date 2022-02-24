const Page = require('./PanelPage');

describe('Panel', function () {

	beforeEach(async () => {
		await Page.open();
	});

	function waitForFocused (node, timeout, timeoutMsg = 'timed out waiting for focus', interval = 250) {
		browser.waitUntil(function () {
			return node.isFocused();
		}, {timeout, timeoutMsg, interval});
	}

	describe('focus management', () => {
		it('should focus header buttons when no focusable content exists', async () => {
			expect(await Page.panel1.nextButton.isFocused()).to.be.true();
		});

		it('should focus the first button in the body when navigating forward and `autoFocus="last-focused"` ', async () => {
			await Page.focus(Page.panel1.nextButton);
			await Page.spotlightSelect();

			Page.panel2.waitForEnter();

			const expected = 'Panel2 Button 1';
			const actual = await Page.focusedText;

			expect(actual).to.equal(expected);
		});

		it('should restore focus when navigating backward and `autoFocus="last-focused"`', async () => {
			await Page.open('?defaultIndex=1');

			await Page.spotlightRight();
			await Page.spotlightUp();
			await Page.spotlightRight();

			waitForFocused(Page.panel2.nextButton);

			await Page.spotlightSelect();

			Page.panel3.waitForEnter();

			await Page.focus(Page.panel3.prevButton);
			await Page.spotlightSelect();

			Page.panel2.waitForEnter();

			waitForFocused(Page.panel2.nextButton);
		});

		it('should focus `.spottable-default` within body when `autoFocus="default-element"` ', async () => {
			await Page.focus(Page.panel1.nextButton);
			await Page.spotlightSelect();

			Page.panel2.waitForEnter();

			await Page.focus(Page.panel2.nextButton);
			await Page.spotlightSelect();

			Page.panel3.waitForEnter();

			const expected = 'Panel3 Button 2';
			const actual = Page.focusedText;

			expect(actual).to.equal(expected);
		});

		it('should focus nothing when `autoFocus="none"` ', async () => {
			await Page.focus(Page.panel1.nextButton);
			await Page.spotlightSelect();

			Page.panel2.waitForEnter();

			await Page.focus(Page.panel2.nextButton);
			await Page.spotlightSelect();

			Page.panel3.waitForEnter();

			await Page.focus(Page.panel3.nextButton);
			await Page.spotlightSelect();

			Page.panel4.waitForEnter();

			const expected = null;
			const actual = Page.focusedText;

			expect(actual).to.equal(expected);
		});

		it('should focus the first button when `hideChildren=false` ', async () => {
			await Page.open('?defaultIndex=3');

			await Page.focus(Page.panel4.nextButton);
			await Page.spotlightSelect();

			Page.panel5.waitForEnter();

			const expected = 'Panel5 Button 1';
			const actual = Page.focusedText;

			expect(actual).to.equal(expected);
		});

		it('should focus the `default-element` when moving forward', async () => {
			await Page.open('?defaultIndex=4');

			await Page.focus(Page.panel5.nextButton);
			await Page.spotlightSelect();

			Page.panel6.waitForEnter();

			const expected = 'Panel6 Button 2';
			const actual = Page.focusedText;

			expect(actual).to.equal(expected);
		});

		it('should focus the `last-focused` when moving backward', async () => {
			await Page.open('?defaultIndex=5');

			await Page.spotlightUp();
			await Page.spotlightRight();

			waitForFocused(Page.panel6.nextButton);

			await Page.spotlightSelect();

			Page.panel7.waitForEnter();

			await Page.focus(Page.panel7.prevButton);
			await Page.spotlightSelect();

			Page.panel6.waitForEnter();

			const expected = true;
			const actual = Page.panel6.nextButton.isFocused();

			expect(actual).to.equal(expected);
		});
	});

	describe('animation', () => {
		it('should reverse animation', async () => {
			await Page.focus(Page.panel1.nextButton);
			await Page.spotlightSelect();

			Page.panel2.self.waitForExist();

			// brief delay to allow the animation to start
			Page.delay(50);
			browser.execute(() => window.setPanelIndex(0));

			Page.panel2.self.waitForExist({reverse: true});

			const expected = true;
			const actual = Page.panel1.self.isDisplayedInViewport();

			expect(actual).to.equal(expected);
		});
	});
});
