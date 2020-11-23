const Page = require('./RangePickerPage');
const {extractValue} = require('./RangePicker-utils.js');

describe('RangePicker', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const rangePicker = Page.components.rangePickerDefault;

			describe('5-way', function () {
				it('should change the value forward when incrementing the rangePicker', function () {
					browser.waitUntil(() => rangePicker.decrementer(rangePicker.self).isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightDown();
					browser.waitUntil(() => rangePicker.incrementer(rangePicker.self).isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(5);
				});

				it('should change the value backward when decrementing the rangePicker', function () {
					browser.waitUntil(() => rangePicker.decrementer(rangePicker.self).isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightDown();
					browser.waitUntil(() => rangePicker.incrementer(rangePicker.self).isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightSelect();
					Page.spotlightUp();
					browser.waitUntil(() => rangePicker.decrementer(rangePicker.self).isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the rangePicker', function () {
					rangePicker.incrementer(rangePicker.self).click();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(5);
				});

				it('should decrease the value when decrementing the rangePicker', function () {
					rangePicker.incrementer(rangePicker.self).click();
					browser.waitUntil(() => rangePicker.incrementer(rangePicker.self).isFocused(), {timeout: 1500,  interval: 100});
					rangePicker.decrementer(rangePicker.self).click();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(0);
				});
			});
		});

		describe('disabled', function () {
			const rangePicker = Page.components.rangePickerDisabled;

			describe('5-way', function () {
				it('should not update on select', function () {
					const oldValue = extractValue(rangePicker);
					Page.spotlightSelect();
					rangePicker.focus();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(oldValue);
				});
			});

			describe('pointer', function () {
				it('should not increase the value when clicking the incrementer', function () {
					const oldValue = extractValue(rangePicker);
					rangePicker.incrementer(rangePicker.self).click();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(oldValue);
				});

				it('should not decrease the value when clicking the decrementer', function () {
					const oldValue = extractValue(rangePicker);
					rangePicker.decrementer(rangePicker.self).click();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(oldValue);
				});
			});
		});

		describe('with \'negativeValues\'', function () {
			const rangePicker = Page.components.rangePickerWithNegativeValues;

			it('should have the default value selected', function () {
				browser.pause(500);
				const newValue = extractValue(rangePicker);
				expect(newValue).to.equal(0);
			});

			it('should decrement to negative number', function () {
				rangePicker.decrementer(rangePicker.self).click();
				browser.pause(500);
				const newValue = extractValue(rangePicker);
				expect(newValue).to.equal(-1);
			});
		});
	});
});
