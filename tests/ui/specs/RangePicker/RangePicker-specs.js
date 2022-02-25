const Page = require('./RangePickerPage');
const {extractValue} = require('./RangePicker-utils.js');

describe('RangePicker', function () {

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('default', function () {
			const rangePicker = Page.components.rangePickerDefault;

			describe('5-way', function () {
				it('should change the value forward when incrementing the rangePicker', async function () {
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).to.equal(5);
				});

				it('should change the value backward when decrementing the rangePicker', async function () {
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await Page.spotlightUp();
					expect(await rangePicker.decrementer(rangePicker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).to.equal(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).to.equal(5);
				});

				it('should decrease the value when decrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).to.equal(0);
				});
			});
		});

		describe('disabled', function () {
			const rangePicker = Page.components.rangePickerDisabled;

			describe('5-way', function () {
				it('should not update on select', async function () {
					const oldValue = await extractValue(rangePicker);
					await Page.spotlightSelect();
					await rangePicker.focus();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).to.equal(oldValue);
				});
			});

			describe('pointer', function () {
				it('should not increase the value when clicking the incrementer', async function () {
					const oldValue = await extractValue(rangePicker);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).to.equal(oldValue);
				});

				it('should not decrease the value when clicking the decrementer', async function () {
					const oldValue = await extractValue(rangePicker);
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).to.equal(oldValue);
				});
			});
		});

		describe('with \'negativeValues\'', function () {
			const rangePicker = Page.components.rangePickerWithNegativeValues;

			it('should have the default value selected', async function () {
				const newValue = await extractValue(rangePicker);
				expect(newValue).to.equal(0);
			});

			it('should decrement to negative number', async function () {
				await rangePicker.decrementer(rangePicker.self).click();
				await browser.pause(500);
				const newValue = await extractValue(rangePicker);
				expect(newValue).to.equal(-1);
			});
		});
	});
});
