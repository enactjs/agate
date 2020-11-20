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

		describe('horizontal', function () {
			const picker = Page.components.pickerHorizontal;

			describe('5-way', function () {
				it('should change the value forward when incrementing the picker', function () {
					//browser.waitUntil(() => picker.decrementer(picker.self).isFocused(), {timeout: 1500,  interval: 100});
					//Page.spotlightRight();
					browser.waitUntil(() => picker.incrementer(picker.self).isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightSelect();
					browser.pause(1000);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Korea');
				});

				it('should change the value backward when decrementing the picker', function () {
					//browser.waitUntil(() => picker.decrementer(picker.self).isFocused(), {timeout: 1500,  interval: 100});
					//Page.spotlightRight();
					browser.waitUntil(() => picker.decrementer(picker.self).isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightSelect();
					Page.spotlightRight();
					browser.waitUntil(() => picker.incrementer(picker.self).isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Romania');
				});
			});

		});
	});

	describe('RTL locale for horizontal picker', function () {
		const picker = Page.components.pickerHorizontal;

		function getFocusedTextContent () {
			// eslint-disable-next-line no-undef
			return document.activeElement.textContent;
		}

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should have decrementer on the right and incrementer on the left', function () {
			picker.focus();
			const actual = browser.execute(getFocusedTextContent);
			console.log(actual);
			//  browser.execute(() => {
			// 	 return console.log(document.activeElement.textContent);
			// });


			//picker.decrementer(picker.focus);
			expect(picker.decrementer(picker.self).isFocused()).to.be.true();
			Page.spotlightLeft();
			//expect(picker.decrementer(picker.self).isFocused()).to.be.true();
		});
	});
});
