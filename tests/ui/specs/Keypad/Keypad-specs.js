const Page = require('./KeypadPage');

describe('Keypad', function () {

	beforeEach(async function () {
		await Page.open();
	});

	describe('5-way', function () {
		const keypad = Page.components.keypadDefault;

		it('should have focus on first button at start', async function () {
			expect(await (await keypad.button(1)).isFocused()).toBe(true);
		});

		it('can navigate down/left/right/up between keys', async function () {
			expect(await (await keypad.button(1)).isFocused()).toBe(true);
			await Page.spotlightDown();
			expect(await (await keypad.button(4)).isFocused()).toBe(true);
			await Page.spotlightRight();
			expect(await (await keypad.button(5)).isFocused()).toBe(true);
			await Page.spotlightUp();
			expect(await (await keypad.button(2)).isFocused()).toBe(true);
			await Page.spotlightLeft();
			expect(await (await keypad.button(1)).isFocused()).toBe(true);
		});
	});

	describe('5-way disabled', function () {
		const keypad = Page.components.keypadDisabled;

		it('buttons are focusable when navigating down/left/right/up', async function () {
			await keypad.focus();
			expect(await (await keypad.button(1)).isFocused()).toBe(true);
			await Page.spotlightDown();
			expect(await (await keypad.button(4)).isFocused()).toBe(true);
			await Page.spotlightRight();
			expect(await (await keypad.button(5)).isFocused()).toBe(true);
			await Page.spotlightUp();
			expect(await (await keypad.button(2)).isFocused()).toBe(true);
			await Page.spotlightLeft();
			expect(await (await keypad.button(1)).isFocused()).toBe(true);
		});
	});

	describe('5-way Spotlight disabled', function () {
		const keypad = Page.components.keypadSpotlightDisabled;

		it('buttons are not focusable when navigating down/left/right/up', async function () {
			await keypad.focus();
			expect(await (await keypad.button(1)).isFocused()).not.toBe(true);
			await Page.spotlightDown();
			expect(await (await keypad.button(4)).isFocused()).not.toBe(true);
			await Page.spotlightRight();
			expect(await (await keypad.button(5)).isFocused()).not.toBe(true);
			await Page.spotlightUp();
			expect(await (await keypad.button(2)).isFocused()).not.toBe(true);
			await Page.spotlightLeft();
			expect(await (await keypad.button(1)).isFocused()).not.toBe(true);
		});
	});
});
