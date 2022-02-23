const Page = require('./InputPage');

describe('Input', function () {
	it('should have focus on first input at start', async function () {
		await Page.open();
		expect(await Page.input1.isFocused()).to.be.true();
	});

	it('should focus input element on enter', async function () {
		await Page.open();
		await Page.spotlightSelect();
		expect(await Page.input1.$('input').isFocused()).to.be.true();
	});

	it('should focus input 2 on 5-way right', async function () {
		await Page.open();
		await Page.spotlightRight();
		expect(await Page.input2.isFocused()).to.be.true();
	});

	it('should focus input 3 on 5-way down', async function () {
		await Page.open();
		await Page.spotlightDown();
		expect(await Page.input3.isFocused()).to.be.true();
	});

	it('should focus input 4 on 5-way down and 5-way right', async function () {
		await Page.open();
		await Page.spotlightDown();
		await Page.spotlightRight();
		expect(await Page.input4.isFocused()).to.be.true();
	});

	it('should focus small input on 5-way down and 5-way right', async function () {
		await Page.open();
		await Page.spotlightDown();
		await Page.spotlightDown();
		await Page.spotlightRight();
		expect(await Page.smallInput.isFocused()).to.be.true();
	});

	describe('input with clearButton', function () {
		it('should focus input with clear button on 5-way down', async function () {
			await Page.open();
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightDown();
			expect(await Page.inputWithClearButton.isFocused()).to.be.true();
		});

		it('should have a clearButton', async function () {
			await Page.open();
			expect(await Page.inputWithClearButtonElement).to.be.true();
		});

		it('should have `cancel` icon by default', async function () {
			await Page.open();
			expect(await Page.inputWithClearButtonIconValue()).to.equal(983097); // decimal converted charCode of Unicode 'cancel' character
		});
	});

	describe('input with custom clearButton', function () {
		it('should focus input with custom clear button on 5-way right and 5-way down', async function () {
			await Page.open();
			await Page.spotlightRight();
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightDown();
			expect(await Page.inputWithCustomClearButton.isFocused()).to.be.true();
		});

		it('should have a custom clearButton', async function () {
			await Page.open();
			expect(await Page.inputWithCustomClearButtonElement).to.be.true();
		});

		it('should have a `closex` icon when providing a custom icon', async function () {
			await Page.open();
			expect(await Page.inputWithCustomClearButtonIconValue()).to.equal(983029); // decimal converted charCode of Unicode 'closex' character
		});
	});

	it('should have text-align to "right" when in ar-SA locale', async function () {
		await Page.open('?locale=ar-SA');
		expect((await Page.inputElement1.getCSSProperty('text-align')).value).to.equal('right');
	});

	describe('disabled', function () {
		it('should be spottable', async function () {
			await Page.open();
			await Page.spotlightDown();
			await Page.spotlightDown();
			expect(await Page.disabledInput.isFocused()).to.be.true();
		});
	});
});
