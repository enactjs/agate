const Page = require('./KeypadPage');

describe('Keypad', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('5-way', function () {
		const keypad = Page.components.keypadDefault;

		it('should have focus on first button at start', async function () {
			expect(await (await keypad.button(1)).isFocused()).to.be.true();
		});

		it('can navigate down/left/right/up between keys', async function () {
			expect(await (await keypad.button(1)).isFocused()).to.be.true();
			await Page.spotlightDown();
			expect(await (await keypad.button(4)).isFocused()).to.be.true();
			await Page.spotlightRight();
			expect(await (await keypad.button(5)).isFocused()).to.be.true();
			await Page.spotlightUp();
			expect(await (await keypad.button(2)).isFocused()).to.be.true();
			await Page.spotlightLeft();
			expect(await (await keypad.button(1)).isFocused()).to.be.true();
		});
	});

	describe('5-way disabled', function () {
		const keypad = Page.components.keypadDisabled;

		it('buttons are focusable when navigating down/left/right/up', async function () {
			await browser.pause(500);
			await keypad.focus();
			expect(await (await keypad.button(1)).isFocused()).to.be.true();
			await Page.spotlightDown();
			expect(await (await keypad.button(4)).isFocused()).to.be.true();
			await Page.spotlightRight();
			expect(await (await keypad.button(5)).isFocused()).to.be.true();
			await Page.spotlightUp();
			expect(await (await keypad.button(2)).isFocused()).to.be.true();
			await Page.spotlightLeft();
			expect(await (await keypad.button(1)).isFocused()).to.be.true();
		});
	});

	describe('5-way Spotlight disabled', function () {
		const keypad = Page.components.keypadSpotlightDisabled;

		it('buttons are not focusable when navigating down/left/right/up', async function () {
			await browser.pause(500);
			await keypad.focus();
			expect(await (await keypad.button(1)).isFocused()).to.not.be.true();
			await Page.spotlightDown();
			expect(await (await keypad.button(4)).isFocused()).to.not.be.true();
			await Page.spotlightRight();
			expect(await (await keypad.button(5)).isFocused()).to.not.be.true();
			await Page.spotlightUp();
			expect(await (await keypad.button(2)).isFocused()).to.not.be.true();
			await Page.spotlightLeft();
			expect(await (await keypad.button(1)).isFocused()).to.not.be.true();
		});
	});
});
