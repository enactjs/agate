const Page = require('./Agate-Picker-Page');
const {extractValue} = require('./Agate-TimePicker-utils.js');

describe('Picker', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const picker = Page.components.pickerDefault;

			describe('5-way', function () {
				it('should change the value backwards when decrementing the picker', function () {
					const oldValue = extractValue(picker);
					browser.waitUntil(() => picker.decrementer.isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightSelect();
					const {newValue} = extractValue(picker);
					const expected = oldValue;
					expect(newValue).to.equal(expected);
				});

				// it('should increase the hour when incrementing the picker', function () {
				// 	const {hour} = extractValues(timePicker);
				// 	Page.spotlightDown();
				// 	browser.waitUntil(() => timePicker.incrementer(timePicker.hour).isFocused(), {timeout: 1500,  interval: 100});
				// 	Page.spotlightSelect();
				// 	const {hour: value} = extractValues(timePicker);
				// 	const expected = hour > 1 ? hour + 1 : 12;
				// 	expect(value).to.equal(expected);
				// });

			});

			describe('pointer', function () {
				// it('should select hour when opened', function () {
				// 	timePicker.decrementer(timePicker.hour).click();
				// 	browser.waitUntil(() => timePicker.decrementer(timePicker.hour).isFocused(), {timeout: 1500,  interval: 100});
				// });
				//
				//
				// it('should increase the hour when incrementing the picker', function () {
				// 	const {hour} = extractValues(timePicker);
				// 	timePicker.incrementer(timePicker.hour).click();
				// 	const {hour: value} = extractValues(timePicker);
				// 	const expected = hour < 12 ? hour + 1 : 1;
				// 	expect(value).to.equal(expected);
				// });
				//
				// it('should decrease the hour when decrementing the picker', function () {
				// 	const {hour} = extractValues(timePicker);
				// 	timePicker.decrementer(timePicker.hour).click();
				// 	const {hour: value} = extractValues(timePicker);
				// 	const expected = hour > 1 ? hour - 1 : 12;
				// 	expect(value).to.equal(expected);
				// });
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const picker = Page.components.pickerWithDefaultValue;

			describe('5-way', function () {
				// it('should not update on select', function () {
				// 	timePicker.focus();
				// 	Page.spotlightSelect();
				//
				// 	const {hour, minute, meridiem} = extractValues(timePicker);
				//
				// 	expect(hour).to.equal(12);
				// 	expect(minute).to.equal(0);
				// 	expect(meridiem).to.equal('AM');
				// });
			});
		});

		describe('disabled', function () {
			const picker = Page.components.pickerDisabled;

			describe('5-way', function () {
				// it('should not update on select', function () {
				// 	Page.spotlightSelect();
				// 	timePicker.focus();
				// });
			});

			describe('pointer', function () {
				// it('should not update hour on click', function () {
				// 	const {hour} = extractValues(timePicker);
				// 	timePicker.decrementer(timePicker.hour).click();
				// 	expect(timePicker.decrementer(timePicker.hour).isFocused()).to.be.true();
				// 	browser.pause(500);
				// 	const {hour: value} = extractValues(timePicker);
				// 	expect(value).to.equal(hour);
				// });
			});
		});

		describe('horizontal', function () {
			const picker = Page.components.pickerHorizontal;

			// it('should not update \'defaultValue\' on click', function () {
			// 	const {hour, minute, meridiem} = extractValues(timePicker);
			//
			// 	timePicker.decrementer(timePicker.minute).click();
			// 	expect(timePicker.decrementer(timePicker.minute).isFocused()).to.be.true();
			//
			// 	timePicker.decrementer(timePicker.hour).click();
			// 	expect(timePicker.decrementer(timePicker.hour).isFocused()).to.be.true();
			//
			// 	timePicker.decrementer(timePicker.meridiem).click();
			// 	expect(timePicker.decrementer(timePicker.meridiem).isFocused()).to.be.true();
			//
			// 	browser.pause(500);
			// 	expect(hour).to.equal(12);
			// 	expect(minute).to.equal(0);
			// 	expect(meridiem).to.equal('AM');
			// });

		});
	});

	describe('RTL locale for horizontal picker', function () {
		const picker = Page.components.pickerHorizontal;

		// it('should have minute-hour-meridiem order', function () {
		// 	browser.waitUntil(() => timePicker.decrementer(timePicker.hour).isFocused(), {timeout: 1500,  timeoutMsg: 'initial', interval: 100});
		// 	Page.spotlightRight();
		// 	browser.waitUntil(() => timePicker.decrementer(timePicker.minute).isFocused(), {timeout: 1500,  timeoutMsg: 'minute', interval: 100});
		// 	Page.spotlightLeft();
		// 	browser.waitUntil(() => timePicker.decrementer(timePicker.hour).isFocused(), {timeout: 1500,  timeoutMsg: 'hour', interval: 100});
		// 	Page.spotlightLeft();
		// 	browser.waitUntil(() => timePicker.decrementer(timePicker.meridiem).isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem', interval: 100});
		// });
	});
});
