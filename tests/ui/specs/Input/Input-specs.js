const Page = require('./InputPage');

describe('Input', function () {
	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		it('should have focus on first input at start', async function () {
			expect(await Page.input1.isFocused()).toBe(true);
		});

		it('should focus input element on enter', async function () {
			await Page.spotlightSelect();
			expect(await Page.input1.$('input').isFocused()).toBe(true);
		});

		it('should focus input 2 on 5-way right', async function () {
			await Page.spotlightRight();
			expect(await Page.input2.isFocused()).toBe(true);
		});

		it('should focus input 3 on 5-way down', async function () {
			await Page.spotlightDown();
			expect(await Page.input3.isFocused()).toBe(true);
		});

		it('should focus input 4 on 5-way down and 5-way right', async function () {
			await Page.spotlightDown();
			await Page.spotlightRight();
			expect(await Page.input4.isFocused()).toBe(true);
		});

		it('should focus small input on 5-way down and 5-way right', async function () {
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightRight();
			expect(await Page.smallInput.isFocused()).toBe(true);
		});

		describe('input with clearButton', function () {
			it('should focus input with clear button on 5-way down', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightDown();
				expect(await Page.inputWithClearButton.isFocused()).toBe(true);
			});

			it('should have a clearButton', async function () {
				expect(await Page.inputWithClearButtonElement).toBe(true);
			});

			it('should have `cancel` icon by default', async function () {
				expect(await Page.inputWithClearButtonIconValue()).toBe(983097); // decimal converted charCode of Unicode 'cancel' character
			});
		});

		describe('input with custom clearButton', function () {
			it('should focus input with custom clear button on 5-way right and 5-way down', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightDown();
				expect(await Page.inputWithCustomClearButton.isFocused()).toBe(true);
			});

			it('should have a custom clearButton', async function () {
				expect(await Page.inputWithCustomClearButtonElement).toBe(true);
			});

			it('should have a `closex` icon when providing a custom icon', async function () {
				expect(await Page.inputWithCustomClearButtonIconValue()).toBe(983029); // decimal converted charCode of Unicode 'closex' character
			});
		});

		describe('disabled', function () {
			it('should be spottable', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				expect(await Page.disabledInput.isFocused()).toBe(true);
			});
		});
	});

	describe('RTL locale', function () {
		it('should have text-align to "right" when in ar-SA locale', async function () {
			await Page.open('?locale=ar-SA');
			expect((await Page.inputElement1.getCSSProperty('text-align')).value).toBe('right');
		});
	});
});
