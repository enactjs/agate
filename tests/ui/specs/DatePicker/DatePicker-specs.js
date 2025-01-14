const Page = require('./DatePickerPage');
const {daysInMonth, extractValues} = require('./DatePicker-utils.js');

describe('DatePicker', function () {

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('default', function () {
			const datePicker = Page.components.datePickerDefault;

			it('should have month-day-year order', async function () {
				expect(await datePicker.decrementer('month').isFocused()).toBe(true);
				await Page.spotlightRight();
				expect(await datePicker.decrementer('day').isFocused()).toBe(true);
				await Page.spotlightRight();
				expect(await datePicker.decrementer('year').isFocused()).toBe(true);
			});

			describe('5-way', function () {
				it('should increase the month when incrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					expect(await datePicker.decrementer('month').isFocused()).toBe(true);
					await Page.spotlightDown();
					await Page.spotlightSelect();
					const {month: value} = await extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).toBe(expected);
				});

				it('should decrease the month when decrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					expect(await datePicker.decrementer('month').isFocused()).toBe(true);
					await Page.spotlightSelect();
					const {month: value} = await extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).toBe(expected);
				});

				it('should increase the day when incrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await Page.spotlightRight();
					expect(await datePicker.decrementer('day').isFocused()).toBe(true);
					await Page.spotlightDown();
					await Page.spotlightSelect();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).toBe(expected);
				});

				it('should decrease the day when decrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await Page.spotlightRight();
					expect(await datePicker.decrementer('day').isFocused()).toBe(true);
					await Page.spotlightSelect();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).toBe(expected);
				});

				it('should increase the year when incrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await datePicker.decrementer('year').isFocused()).toBe(true);
					await Page.spotlightDown();
					await Page.spotlightSelect();
					const {year: value} = await extractValues(datePicker);
					const expected = year + 1;
					expect(value).toBe(expected);
				});

				it('should decrease the year when decrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await datePicker.decrementer('year').isFocused()).toBe(true);
					await Page.spotlightSelect();
					const {year: value} = await extractValues(datePicker);
					const expected = year - 1;
					expect(value).toBe(expected);
				});
			});

			describe('pointer', function () {
				it('should increase the month when incrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					await datePicker.incrementer('month').click();
					expect(await datePicker.incrementer('month').isFocused()).toBe(true);
					const {month: value} = await extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).toBe(expected);
				});

				it('should decrease the month when decrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					await datePicker.decrementer('month').click();
					expect(await datePicker.decrementer('month').isFocused()).toBe(true);
					const {month: value} = await extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).toBe(expected);
				});

				it('should increase the day when incrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await datePicker.incrementer('day').click();
					expect(await datePicker.incrementer('day').isFocused()).toBe(true);
					const {day: value} = await extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).toBe(expected);
				});

				it('should decrease the day when decrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await datePicker.decrementer('day').click();
					expect(await datePicker.decrementer('day').isFocused()).toBe(true);
					const {day: value} = await extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).toBe(expected);
				});

				it('should increase the year when incrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await datePicker.incrementer('year').click();
					expect(await datePicker.incrementer('year').isFocused()).toBe(true);
					const {year: value} = await extractValues(datePicker);
					const expected = year + 1;
					expect(value).toBe(expected);
				});

				it('should decrease the year when decrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await datePicker.decrementer('year').click();
					expect(await datePicker.decrementer('year').isFocused()).toBe(true);
					const {year: value} = await extractValues(datePicker);
					const expected = year - 1;
					expect(value).toBe(expected);
				});
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2020, 5, 6)`
			const datePicker = Page.components.datePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update on select', async function () {
					await datePicker.focus();
					await Page.spotlightSelect();

					const {day, month, year} = await extractValues(datePicker);

					expect(day).toBe(6);
					expect(month).toBe(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).toBe(2020);
				});
			});
		});


		describe('disabled', function () {
			const datePicker = Page.components.datePickerDisabled;

			it('should focus the disabled month picker', async function () {
				await datePicker.decrementer('month').click();
				expect(await datePicker.decrementer('month').isFocused()).toBe(true);
			});

			it('should not increase the day when incrementing disabled picker', async function () {
				await datePicker.incrementer('day').click();
				expect(await datePicker.incrementer('day').isFocused()).toBe(true);
				await browser.pause(500);
				const {day: value} = await extractValues(datePicker);
				expect(value).toBe(1);
			});

			it('should not decrease the day when decrementing disabled picker', async function () {
				await datePicker.decrementer('day').click();
				expect(await datePicker.decrementer('day').isFocused()).toBe(true);
				await browser.pause(500);
				const {day: value} = await extractValues(datePicker);
				expect(value).toBe(1);
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const datePicker = Page.components.datePickerDisabledWithDefaultValue;

			it('should display default date', async function () {
				const {day, month, year} = await extractValues(datePicker);

				expect(day).toBe(6);
				expect(month).toBe(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
				expect(year).toBe(2020);

			});

			it('should not update \'defaultValue\' on decrementing disabled picker', async function () {
				const {day, month, year} = await extractValues(datePicker);
				await datePicker.decrementer('month').click();
				expect(await datePicker.decrementer('month').isFocused()).toBe(true);

				await datePicker.decrementer('day').click();
				expect(await datePicker.decrementer('day').isFocused()).toBe(true);

				await datePicker.decrementer('year').click();
				expect(await datePicker.decrementer('year').isFocused()).toBe(true);

				await browser.pause(500);

				expect(day).toBe(6);
				expect(month).toBe(6);
				expect(year).toBe(2020);
			});

			it('should not update \'defaultValue\' on incrementing disabled picker', async function () {
				const {day, month, year} = await extractValues(datePicker);

				await datePicker.incrementer('month').click();
				expect(await datePicker.incrementer('month').isFocused()).toBe(true);

				await datePicker.incrementer('day').click();
				expect(await datePicker.incrementer('day').isFocused()).toBe(true);

				await datePicker.incrementer('day').click();
				expect(await datePicker.incrementer('day').isFocused()).toBe(true);

				await browser.pause(500);

				expect(day).toBe(6);
				expect(month).toBe(6);
				expect(year).toBe(2020);
			});
		});
	});

	describe('RTL locale', async function () {
		const datePicker = Page.components.datePickerDefault;

		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should focus rightmost picker (day) when selected', async function () {
			expect(await datePicker.decrementer('day').isFocused()).toBe(true);
		});

		it('should have day-month-year order', async function () {
			expect(await datePicker.decrementer('day').isFocused()).toBe(true);
			await Page.spotlightLeft();
			expect(await datePicker.decrementer('month').isFocused()).toBe(true);
			await Page.spotlightLeft();
			expect(await datePicker.decrementer('year').isFocused()).toBe(true);
		});
	});
});
