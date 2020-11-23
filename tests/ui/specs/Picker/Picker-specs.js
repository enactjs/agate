const Page = require('./PickerPage');
const {extractValue} = require('./Picker-utils.js');

describe('Picker', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const picker = Page.components.pickerDefault;

			describe('5-way', function () {
				it('should change the value forward when incrementing the picker', function () {
					browser.waitUntil(() => picker.decrementer(picker.self).isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightDown();
					browser.waitUntil(() => picker.incrementer(picker.self).isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Korea');
				});

				it('should change the value backward when decrementing the picker', function () {
					browser.waitUntil(() => picker.decrementer(picker.self).isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightDown();
					browser.waitUntil(() => picker.incrementer(picker.self).isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightSelect();
					Page.spotlightUp();
					browser.waitUntil(() => picker.decrementer(picker.self).isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Romania');
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the picker', function () {
					picker.incrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Korea');
				});

				it('should decrease the hour when decrementing the picker', function () {
					picker.incrementer(picker.self).click();
					browser.waitUntil(() => picker.incrementer(picker.self).isFocused(), {timeout: 1500,  interval: 100});
					picker.decrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Romania');
				});
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `Korea`
			const picker = Page.components.pickerWithDefaultValue;

			it('should have the default value selected', function () {
				browser.pause(500);
				const newValue = extractValue(picker);
				expect(newValue).to.equal('Korea');
			});
		});

		describe('disabled', function () {
			const picker = Page.components.pickerDisabled;

			describe('5-way', function () {
				it('should not update on select', function () {
					const oldValue = extractValue(picker);
					Page.spotlightSelect();
					picker.focus();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal(oldValue);
				});
			});

			describe('pointer', function () {
				it('should not increase the value when clicking the incrementer', function () {
					const oldValue = extractValue(picker);
					picker.incrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal(oldValue);
				});

				it('should not decrease the value when clicking the decrementer', function () {
					const oldValue = extractValue(picker);
					picker.decrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal(oldValue);
				});
			});
		});
	});
});
