const Page = require('./DateTimePickerPage');
const {daysInMonth, extractValues} = require('./DateTimePicker-utils.js');

describe('DateTimePicker', function () {

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('default', function () {
			const dateTimePicker = Page.components.dateTimePickerDefault;

			it('should have hour-minute-meridiem-month-day-year order', async function () {
				const {meridiem} = await extractValues(dateTimePicker);
				if (meridiem === 'AM') {
					await Page.spotlightDown();
					await browser.waitUntil(async () => await dateTimePicker.incrementer(dateTimePicker.hour).isFocused(), {timeout: 1500,  timeoutMsg: 'hour focused'});
					await Page.spotlightRight();
					await browser.waitUntil(async () => await dateTimePicker.incrementer(dateTimePicker.minute).isFocused(), {timeout: 1500,  timeoutMsg: 'minute focused'});
					await Page.spotlightRight();
					await browser.waitUntil(async () => await dateTimePicker.incrementer(dateTimePicker.meridiem).isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem focused'});
					await Page.spotlightRight();
					expect(await dateTimePicker.incrementer(dateTimePicker.month).isFocused(), 'Month').to.be.true();
					await Page.spotlightRight();
					expect(await dateTimePicker.incrementer(dateTimePicker.day).isFocused(), 'Day').to.be.true();
					await Page.spotlightRight();
					expect(await dateTimePicker.incrementer(dateTimePicker.year).isFocused(), 'Year').to.be.true();
				} else {
					await browser.waitUntil(async () => await dateTimePicker.decrementer(dateTimePicker.hour).isFocused(), {timeout: 1500,  timeoutMsg: 'hour focused'});
					await Page.spotlightRight();
					await browser.waitUntil(async () => await dateTimePicker.decrementer(dateTimePicker.minute).isFocused(), {timeout: 1500,  timeoutMsg: 'minute focused'});
					await Page.spotlightRight();
					await browser.waitUntil(async () => await dateTimePicker.decrementer(dateTimePicker.meridiem).isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem focused'});
					await Page.spotlightRight();
					expect(await dateTimePicker.decrementer(dateTimePicker.month).isFocused(), 'Month').to.be.true();
					await Page.spotlightRight();
					expect(await dateTimePicker.decrementer(dateTimePicker.day).isFocused(), 'Day').to.be.true();
					await Page.spotlightRight();
					expect(await dateTimePicker.decrementer(dateTimePicker.year).isFocused(), 'Year').to.be.true();
				}
			});

			describe('pointer', function () {
				it('should increase the hour when incrementing the picker', async function () {
					const {hour} = await extractValues(dateTimePicker);
					await dateTimePicker.incrementer(dateTimePicker.hour).click();
					const {hour: value} = await extractValues(dateTimePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the hour when decrementing the picker', async function () {
					const {hour} = await extractValues(dateTimePicker);
					await dateTimePicker.decrementer(dateTimePicker.hour).click();
					const {hour: value} = await extractValues(dateTimePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the minute when incrementing the picker', async function () {
					const {minute} = await extractValues(dateTimePicker);
					await dateTimePicker.incrementer(dateTimePicker.minute).click();
					await browser.waitUntil(async () => await dateTimePicker.incrementer(dateTimePicker.minute).isFocused(), {timeout: 1500,  interval: 100});
					const {minute: value} = await extractValues(dateTimePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).to.equal(expected);
				});

				it('should decrease the minute when decrementing the picker', async function () {
					const {minute} = await extractValues(dateTimePicker);
					await dateTimePicker.decrementer(dateTimePicker.minute).click();
					await browser.waitUntil(async () => await dateTimePicker.decrementer(dateTimePicker.minute).isFocused(), {timeout: 1500,  interval: 100});
					const {minute: value} = await extractValues(dateTimePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).to.equal(expected);
				});

				it('should change the meridiem on hour boundaries', async function () {
					const {meridiem} = await extractValues(dateTimePicker);
					if (meridiem === 'AM') {
						// 12 hours ought to change the value text if meridiem changes
						for (let i = 12; i; i -= 1) {
							await dateTimePicker.incrementer(dateTimePicker.hour).click();
						}
					} else {
						// 12 hours ought to change the value text if meridiem changes
						for (let i = 12; i; i -= 1) {
							await dateTimePicker.decrementer(dateTimePicker.hour).click();
						}
					}

					const {meridiem: value} = await extractValues(dateTimePicker);
					expect(value !== meridiem).to.be.true();
				});

				it('should increase the month when incrementing the picker', async function () {
					const {month} = await extractValues(dateTimePicker);
					await dateTimePicker.incrementer(dateTimePicker.month).click();
					expect(await dateTimePicker.incrementer(dateTimePicker.month).isFocused()).to.be.true();
					const {month: value} = await extractValues(dateTimePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', async function () {
					const {month} = await extractValues(dateTimePicker);
					await dateTimePicker.decrementer(dateTimePicker.month).click();
					expect(await dateTimePicker.decrementer(dateTimePicker.month).isFocused()).to.be.true();
					const {month: value} = await extractValues(dateTimePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', async function () {
					const {day, month, year} = await extractValues(dateTimePicker);
					const numDays = daysInMonth({month, year});
					await dateTimePicker.incrementer(dateTimePicker.day).click();
					expect(await dateTimePicker.incrementer(dateTimePicker.day).isFocused()).to.be.true();
					const {day: value} = await extractValues(dateTimePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', async function () {
					const {day, month, year} = await extractValues(dateTimePicker);
					const numDays = daysInMonth({month, year});
					await dateTimePicker.decrementer(dateTimePicker.day).click();
					expect(await dateTimePicker.decrementer(dateTimePicker.day).isFocused()).to.be.true();
					const {day: value} = await extractValues(dateTimePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', async function () {
					const {year} = await extractValues(dateTimePicker);
					await dateTimePicker.incrementer(dateTimePicker.year).click();
					expect(await dateTimePicker.incrementer(dateTimePicker.year).isFocused()).to.be.true();
					const {year: value} = await extractValues(dateTimePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', async function () {
					const {year} = await extractValues(dateTimePicker);
					await dateTimePicker.decrementer(dateTimePicker.year).click();
					expect(await dateTimePicker.decrementer(dateTimePicker.year).isFocused()).to.be.true();
					const {year: value} = await extractValues(dateTimePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
				});
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2020, 5, 6, 12, 10)`
			const dateTimePicker = Page.components.dateTimePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update on select', async function () {
					await dateTimePicker.focus();
					await Page.spotlightSelect();

					const {day, hour, minute, meridiem,  month, year} = await extractValues(dateTimePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2020);
					expect(hour).to.equal(12);
					expect(minute).to.equal(10);
					expect(meridiem).to.equal('PM');
				});
			});
		});


		describe('disabled', function () {
			const dateTimePicker = Page.components.dateTimePickerDisabled;

			it('should not increase the day when incrementing disabled picker', async function () {
				await dateTimePicker.incrementer(dateTimePicker.day).click();
				expect(await dateTimePicker.incrementer(dateTimePicker.day).isFocused()).to.be.true();
				await browser.pause(500);
				const {day: value} = await extractValues(dateTimePicker);
				expect(value).to.equal(1);
			});

			it('should not decrease the day when decrementing disabled picker', async function () {
				await dateTimePicker.decrementer(dateTimePicker.day).click();
				expect(await dateTimePicker.decrementer(dateTimePicker.day).isFocused()).to.be.true();
				await browser.pause(500);
				const {day: value} = await extractValues(dateTimePicker);
				expect(value).to.equal(1);
			});

			it('should not update hour on click', async function () {
				const {hour} = await extractValues(dateTimePicker);
				await dateTimePicker.decrementer(dateTimePicker.hour).click();
				expect(await dateTimePicker.decrementer(dateTimePicker.hour).isFocused()).to.be.true();
				await browser.pause(500);
				const {hour: value} = await extractValues(dateTimePicker);
				expect(value).to.equal(hour);
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const dateTimePicker = Page.components.dateTimePickerDisabledWithDefaultValue;

			it('should display default date', async function () {
				const {day, hour, meridiem, minute, month, year} = await extractValues(dateTimePicker);

				expect(day).to.equal(6);
				expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
				expect(year).to.equal(2020);
				expect(hour).to.equal(12);
				expect(minute).to.equal(10);
				expect(meridiem).to.equal('PM');

			});

			it('should not update \'defaultValue\' on on click', async function () {
				const {day, hour, meridiem, minute, month, year} = await extractValues(dateTimePicker);
				await dateTimePicker.decrementer(dateTimePicker.month).click();
				expect(await dateTimePicker.decrementer(dateTimePicker.month).isFocused()).to.be.true();

				await dateTimePicker.decrementer(dateTimePicker.day).click();
				expect(await dateTimePicker.decrementer(dateTimePicker.day).isFocused()).to.be.true();

				await dateTimePicker.decrementer(dateTimePicker.year).click();
				expect(await dateTimePicker.decrementer(dateTimePicker.year).isFocused()).to.be.true();

				await dateTimePicker.decrementer(dateTimePicker.minute).click();
				expect(await dateTimePicker.decrementer(dateTimePicker.minute).isFocused()).to.be.true();

				await dateTimePicker.decrementer(dateTimePicker.hour).click();
				expect(await dateTimePicker.decrementer(dateTimePicker.hour).isFocused()).to.be.true();

				if (meridiem === 'AM') {
					await dateTimePicker.incrementer(dateTimePicker.meridiem).click();
					expect(await dateTimePicker.incrementer(dateTimePicker.meridiem).isFocused()).to.be.true();
				} else {
					await dateTimePicker.decrementer(dateTimePicker.meridiem).click();
					expect(await dateTimePicker.decrementer(dateTimePicker.meridiem).isFocused()).to.be.true();
				}

				await browser.pause(500);

				expect(day).to.equal(6);
				expect(month).to.equal(6);
				expect(year).to.equal(2020);
				expect(hour).to.equal(12);
				expect(minute).to.equal(10);
				expect(meridiem).to.equal('PM');
			});
		});
	});

	describe('RTL locale', function () {
		const dateTimePicker = Page.components.dateTimePickerDefault;

		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should focus hour picker when selected', async function () {
			await browser.waitUntil(async () => await dateTimePicker.decrementer(dateTimePicker.hour).isFocused(), {timeout: 1500,  interval: 100});
		});

		it('should have minute-hour-meridiem-day-month-year order', async function () {
			const {meridiem} = await extractValues(dateTimePicker);
			if (meridiem === 'ص') {
				await Page.spotlightDown();
				await browser.waitUntil(async () => await dateTimePicker.incrementer(dateTimePicker.hour).isFocused(), {timeout: 1500,  timeoutMsg: 'initial', interval: 100});
				await Page.spotlightRight();
				await browser.waitUntil(async () => await dateTimePicker.incrementer(dateTimePicker.minute).isFocused(), {timeout: 1500,  timeoutMsg: 'minute', interval: 100});
				await Page.spotlightLeft();
				await browser.waitUntil(async () => await dateTimePicker.incrementer(dateTimePicker.hour).isFocused(), {timeout: 1500,  timeoutMsg: 'hour', interval: 100});
				await Page.spotlightLeft();
				await browser.waitUntil(async () => await dateTimePicker.incrementer(dateTimePicker.meridiem).isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem', interval: 100});
				await Page.spotlightLeft();
				expect(await dateTimePicker.incrementer(dateTimePicker.day).isFocused()).to.be.true();
				await Page.spotlightLeft();
				expect(await dateTimePicker.incrementer(dateTimePicker.month).isFocused()).to.be.true();
				await Page.spotlightLeft();
				expect(await dateTimePicker.incrementer(dateTimePicker.year).isFocused()).to.be.true();
			} else {
				await browser.waitUntil(async () => await dateTimePicker.decrementer(dateTimePicker.hour).isFocused(), {timeout: 1500,  timeoutMsg: 'initial', interval: 100});
				await Page.spotlightRight();
				await browser.waitUntil(async () => await dateTimePicker.decrementer(dateTimePicker.minute).isFocused(), {timeout: 1500,  timeoutMsg: 'minute', interval: 100});
				await Page.spotlightLeft();
				await browser.waitUntil(async () => await dateTimePicker.decrementer(dateTimePicker.hour).isFocused(), {timeout: 1500,  timeoutMsg: 'hour', interval: 100});
				await Page.spotlightLeft();
				await browser.waitUntil(async () => await dateTimePicker.decrementer(dateTimePicker.meridiem).isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem', interval: 100});
				await Page.spotlightLeft();
				expect(await dateTimePicker.decrementer(dateTimePicker.day).isFocused()).to.be.true();
				await Page.spotlightLeft();
				expect(await dateTimePicker.decrementer(dateTimePicker.month).isFocused()).to.be.true();
				await Page.spotlightLeft();
				expect(await dateTimePicker.decrementer(dateTimePicker.year).isFocused()).to.be.true();
			}
		});
	});

	describe('24-hour locale', function () {
		const dateTimePicker = Page.components.dateTimePickerWithDefaultValue;

		beforeEach(async function () {
			await Page.open('?locale=fr-FR');
		});

		it('should not have a meridiem picker', async function () {
			expect(await dateTimePicker.meridiem.isExisting(), 'meridiem exists').to.be.false();
		});

		it('should display hours in 24-hour format', async function () {
			await dateTimePicker.incrementer(dateTimePicker.hour).click();
			expect((await extractValues(dateTimePicker)).hour).to.equal(13);
		});

		it('should increment hours from 23 to 0', async function () {
			// go to 23 first
			for (let i = 11; i; i -= 1) {
				await dateTimePicker.incrementer(dateTimePicker.hour).click();
			}
			expect((await extractValues(dateTimePicker)).hour).to.equal(23);
			// now increment
			await dateTimePicker.incrementer(dateTimePicker.hour).click();
			expect((await extractValues(dateTimePicker)).hour).to.equal(0);
		});

		it('should decrement hours from 0 to 23', async function () {
			// go to 0 first
			for (let i = 12; i; i -= 1) {
				await dateTimePicker.decrementer(dateTimePicker.hour).click();
			}
			expect((await extractValues(dateTimePicker)).hour).to.equal(0);
			await dateTimePicker.decrementer(dateTimePicker.hour).click();
			expect((await extractValues(dateTimePicker)).hour).to.equal(23);
		});
	});
});
