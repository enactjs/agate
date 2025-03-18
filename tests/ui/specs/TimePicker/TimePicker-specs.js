const Page = require('./TimePickerPage');
const {extractValues} = require('./TimePicker-utils.js');

describe('TimePicker', function () {

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('default', function () {
			const timePicker = Page.components.timePickerDefault;

			it('should have hour-minute-meridiem order', async function () {
				const {meridiem} =  await extractValues(timePicker);
				if (meridiem === 'AM') {
					await Page.spotlightDown();
					await browser.waitUntil(async () => (await timePicker.incrementer('hour')).isFocused(), {timeout: 1500,  timeoutMsg: 'hour focused'});
					await Page.spotlightRight();
					await browser.waitUntil(async () => (await timePicker.incrementer('minute')).isFocused(), {timeout: 1500,  timeoutMsg: 'minute focused'});
					await Page.spotlightRight();
					await browser.waitUntil(async () => (await timePicker.incrementer('meridiem')).isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem focused'});
				} else {
					await browser.waitUntil(async () => (await timePicker.decrementer('hour')).isFocused(), {timeout: 1500,  timeoutMsg: 'hour focused'});
					await Page.spotlightRight();
					await browser.waitUntil(async () => (await timePicker.decrementer('minute')).isFocused(), {timeout: 1500,  timeoutMsg: 'minute focused'});
					await Page.spotlightRight();
					await browser.waitUntil(async () => (await timePicker.decrementer('meridiem')).isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem focused'});
				}
			});

			describe('5-way', function () {
				it('should decrease the hour when decrementing the picker', async function () {
					const {hour} = await extractValues(timePicker);
					await browser.waitUntil(async () => (await timePicker.decrementer('hour')).isFocused(), {timeout: 1500,  interval: 100});
					await Page.spotlightSelect();
					const {hour: value} = await extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).toBe(expected);
				});

				it('should increase the hour when incrementing the picker', async function () {
					const {hour} = await extractValues(timePicker);
					await Page.spotlightDown();
					await browser.waitUntil(async () => (await timePicker.incrementer('hour')).isFocused(), {timeout: 1500,  interval: 100});
					await Page.spotlightSelect();
					const {hour: value} = await extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).toBe(expected);
				});

				it('should decrease the minute when decrementing the picker', async function () {
					const {minute} = await extractValues(timePicker);
					await Page.spotlightRight();
					await browser.waitUntil(async () => (await timePicker.decrementer('minute')).isFocused(), {timeout: 1500,  interval: 100});
					await Page.spotlightSelect();
					const {minute: value} = await extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).toBe(expected);
				});

				it('should increase the minute when incrementing the picker', async function () {
					const {minute} = await extractValues(timePicker);
					await Page.spotlightRight();
					await browser.waitUntil(async () => (await timePicker.decrementer('minute')).isFocused(), {timeout: 1500,  interval: 100});
					await Page.spotlightDown();
					await browser.waitUntil(async () => (await timePicker.incrementer('minute')).isFocused(), {timeout: 1500,  interval: 100});
					await Page.spotlightSelect();
					const {minute: value} = await extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).toBe(expected);
				});

				it('should not change displayed hour when changing the meridiem picker', async function () {
					const {hour, meridiem} = await extractValues(timePicker);
					if (meridiem === 'AM') {
						// change to PM
						await Page.spotlightDown();
						await Page.spotlightRight();
						await Page.spotlightRight();
						await browser.waitUntil(async () => (await timePicker.incrementer('meridiem')).isFocused(), {timeout: 1500,  interval: 100});
					} else {
						// change to AM
						await Page.spotlightRight();
						await Page.spotlightRight();
						await browser.waitUntil(async () => (await timePicker.decrementer('meridiem')).isFocused(), {timeout: 1500,  interval: 100});
					}
					await Page.spotlightSelect();

					const {hour: value} = await extractValues(timePicker);
					expect(value).toBe(hour);
				});

				it('should change the meridiem on hour boundaries', async function () {
					const {meridiem} = await extractValues(timePicker);
					if (meridiem === 'AM') {
						await Page.spotlightDown();
						await browser.waitUntil(async () => (await timePicker.incrementer('hour')).isFocused(), {timeout: 1500,  interval: 100});
					} else {
						await browser.waitUntil(async () => (await timePicker.decrementer('hour')).isFocused(), {timeout: 1500,  interval: 100});
					}
					// 12 hours ought to change the value text if meridiem changes
					for (let i = 12; i; i -= 1) {
						await Page.spotlightSelect();
					}

					const {meridiem: value} = await extractValues(timePicker);
					expect(value !== meridiem).toBe(true);
				});
			});

			describe('pointer', function () {
				it('should select hour when opened', async function () {
					(await timePicker.decrementer('hour')).click();
					await browser.waitUntil(async () => await timePicker.decrementer('hour').isFocused(), {timeout: 1500,  interval: 100});
				});


				it('should increase the hour when incrementing the picker', async function () {
					const {hour} = await extractValues(timePicker);
					(await timePicker.incrementer('hour')).click();
					const {hour: value} = await extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).toBe(expected);
				});

				it('should decrease the hour when decrementing the picker', async function () {
					const {hour} = await extractValues(timePicker);
					(await timePicker.decrementer('hour')).click();
					const {hour: value} = await extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).toBe(expected);
				});

				it('should increase the minute when incrementing the picker', async function () {
					const {minute} = await extractValues(timePicker);
					(await timePicker.incrementer('minute')).click();
					await browser.waitUntil( async () => (await timePicker.incrementer('minute')).isFocused(), {timeout: 1500,  interval: 100});
					const {minute: value} = await extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).toBe(expected);
				});

				it('should decrease the minute when decrementing the picker', async function () {
					const {minute} = await extractValues(timePicker);
					(await timePicker.decrementer('minute')).click();
					await browser.waitUntil(async () => (await timePicker.decrementer('minute')).isFocused(), {timeout: 1500,  interval: 100});
					const {minute: value} = await extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).toBe(expected);
				});

				it('should change the meridiem on hour boundaries', async function () {
					const {meridiem} = await extractValues(timePicker);
					if (meridiem === 'AM') {
						// 12 hours ought to change the value text if meridiem changes
						for (let i = 12; i; i -= 1) {
							(await timePicker.incrementer('hour')).click();
						}
					} else {
						// 12 hours ought to change the value text if meridiem changes
						for (let i = 12; i; i -= 1) {
							(await timePicker.decrementer('hour')).click();
						}
					}

					const {meridiem: value} = await extractValues(timePicker);
					expect(value !== meridiem).toBe(true);
				});
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const timePicker = Page.components.timePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update on select', async function () {
					await timePicker.focus();
					await Page.spotlightSelect();

					const {hour, minute, meridiem} = await extractValues(timePicker);

					expect(hour).toBe(12);
					expect(minute).toBe(0);
					expect(meridiem).toBe('AM');
				});
			});
		});

		describe('disabled', function () {
			const timePicker = Page.components.timePickerDisabled;

			describe('5-way', function () {
				it('should not update on select', async function () {
					await Page.spotlightSelect();
					await timePicker.focus();
				});
			});

			describe('pointer', function () {
				it('should not update hour on click', async function () {
					const {hour} = await extractValues(timePicker);
					await timePicker.decrementer('hour').click();
					expect(await (await timePicker.decrementer('hour')).isFocused()).toBe(true);
					await browser.pause(500);
					const {hour: value} = await extractValues(timePicker);
					expect(value).toBe(hour);
				});
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const timePicker = Page.components.timePickerDisabledWithDefaultValue;
			it('should not update \'defaultValue\' on click', async function () {
				const {hour, minute, meridiem} = await extractValues(timePicker);

				(await timePicker.decrementer('minute')).click();
				expect(await timePicker.decrementer('minute').isFocused()).toBe(true);

				(await timePicker.decrementer('hour')).click();
				expect(await timePicker.decrementer('hour').isFocused()).toBe(true);

				if (meridiem === 'AM') {
					(await timePicker.incrementer('meridiem')).click();
					expect(await timePicker.incrementer('meridiem').isFocused()).toBe(true);
				} else {
					(await timePicker.decrementer('meridiem')).click();
					expect(await timePicker.decrementer('meridiem').isFocused()).toBe(true);
				}

				await browser.pause(500);
				expect(hour).toBe(12);
				expect(minute).toBe(0);
				expect(meridiem).toBe('AM');
			});

		});
	});

	describe('RTL locale', function () {
		const timePicker = Page.components.timePickerDefault;

		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should focus middle picker (hour) when selected', async function () {
			await browser.waitUntil(async () => (await timePicker.decrementer('hour')).isFocused(), {timeout: 1500,  interval: 100});
		});

		it('should have minute-hour-meridiem order', async function () {
			const {meridiem} = await extractValues(timePicker);
			if (meridiem === 'ص') {
				await Page.spotlightDown();
				await browser.waitUntil(async () => (await timePicker.incrementer('hour')).isFocused(), {timeout: 1500,  timeoutMsg: 'initial', interval: 100});
				await Page.spotlightRight();
				await browser.waitUntil(async () => (await timePicker.incrementer('minute')).isFocused(), {timeout: 1500,  timeoutMsg: 'minute', interval: 100});
				await Page.spotlightLeft();
				await browser.waitUntil(async () => (await timePicker.incrementer('hour')).isFocused(), {timeout: 1500,  timeoutMsg: 'hour', interval: 100});
				await Page.spotlightLeft();
				await browser.waitUntil(async () => (await timePicker.incrementer('meridiem')).isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem', interval: 100});
			} else {
				await browser.waitUntil(async () => (await timePicker.decrementer('hour')).isFocused(), {timeout: 1500,  timeoutMsg: 'initial', interval: 100});
				await Page.spotlightRight();
				await browser.waitUntil(async () => (await timePicker.decrementer('minute')).isFocused(), {timeout: 1500,  timeoutMsg: 'minute', interval: 100});
				await Page.spotlightLeft();
				await browser.waitUntil(async () => (await timePicker.decrementer('hour')).isFocused(), {timeout: 1500,  timeoutMsg: 'hour', interval: 100});
				await Page.spotlightLeft();
				await browser.waitUntil(async () => (await timePicker.decrementer('meridiem')).isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem', interval: 100});
			}


		});
	});

	describe('24-hour locale', function () {
		const timePicker = Page.components.timePickerWithDefaultValue;

		beforeEach(async function () {
			await Page.open('?locale=fr-FR');
		});

		it('should not have a meridiem picker', async function () {
			expect(await timePicker.meridiem.isExisting()).toBe(false);
		});

		it('should display hours in 24-hour format', async function () {
			expect((await extractValues(timePicker)).hour).toBe(0); // midnight hour
		});

		it('should increment hours from 23 to 0', async function () {
			// go to 23 first
			(await timePicker.decrementer('hour')).click();
			expect((await extractValues(timePicker)).hour).toBe(23);
			await browser.pause(500);
			// now increment
			(await timePicker.incrementer('hour')).click();
			expect((await extractValues(timePicker)).hour).toBe(0);
		});

		it('should decrement hours from 0 to 23', async function () {
			(await timePicker.decrementer('hour')).click();
			expect((await extractValues(timePicker)).hour).toBe(23);
		});
	});
});
