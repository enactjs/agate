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
				expect(await datePicker.decrementer(datePicker.month).isFocused(), 'Month').to.be.true();
				await Page.spotlightRight();
				expect(await datePicker.decrementer(datePicker.day).isFocused(), 'Day').to.be.true();
				await Page.spotlightRight();
				expect(await datePicker.decrementer(datePicker.year).isFocused(), 'Year').to.be.true();
			});

			describe('5-way', function () {
				it('should increase the month when incrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					expect(await datePicker.decrementer(datePicker.month).isFocused()).to.be.true();
					await Page.spotlightDown();
					await Page.spotlightSelect();
					const {month: value} = await extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					expect(await datePicker.decrementer(datePicker.month).isFocused()).to.be.true();
					await Page.spotlightSelect();
					const {month: value} = await extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await Page.spotlightRight();
					expect(await datePicker.decrementer(datePicker.day).isFocused()).to.be.true();
					await Page.spotlightDown();
					await Page.spotlightSelect();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await Page.spotlightRight();
					expect(await datePicker.decrementer(datePicker.day).isFocused()).to.be.true();
					await Page.spotlightSelect();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await datePicker.decrementer(datePicker.year).isFocused()).to.be.true();
					await Page.spotlightDown();
					await Page.spotlightSelect();
					const {year: value} = await extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await datePicker.decrementer(datePicker.year).isFocused()).to.be.true();
					await Page.spotlightSelect();
					const {year: value} = await extractValues(datePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
				});
			});

			describe('pointer', function () {
				it('should increase the month when incrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					await datePicker.incrementer(datePicker.month).click();
					expect(await datePicker.incrementer(datePicker.month).isFocused()).to.be.true();
					const {month: value} = await extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					await datePicker.decrementer(datePicker.month).click();
					expect(await datePicker.decrementer(datePicker.month).isFocused()).to.be.true();
					const {month: value} = await extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await datePicker.incrementer(datePicker.day).click();
					expect(await datePicker.incrementer(datePicker.day).isFocused()).to.be.true();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await datePicker.decrementer(datePicker.day).click();
					expect(await datePicker.decrementer(datePicker.day).isFocused()).to.be.true();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await datePicker.incrementer(datePicker.year).click();
					expect(await datePicker.incrementer(datePicker.year).isFocused()).to.be.true();
					const {year: value} = await extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await datePicker.decrementer(datePicker.year).click();
					expect(await datePicker.decrementer(datePicker.year).isFocused()).to.be.true();
					const {year: value} = await extractValues(datePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
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

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2020);
				});
			});
		});


		describe('disabled', function () {
			const datePicker = Page.components.datePickerDisabled;

			it('should focus the disabled month picker', async function () {
				await datePicker.decrementer(datePicker.month).click();
				expect(await datePicker.decrementer(datePicker.month).isFocused()).to.be.true();
			});

			it('should not increase the day when incrementing disabled picker', async function () {
				await datePicker.incrementer(datePicker.day).click();
				expect(await datePicker.incrementer(datePicker.day).isFocused()).to.be.true();
				await browser.pause(500);
				const {day: value} = await extractValues(datePicker);
				expect(value).to.equal(1);
			});

			it('should not decrease the day when decrementing disabled picker', async function () {
				await datePicker.decrementer(datePicker.day).click();
				expect(await datePicker.decrementer(datePicker.day).isFocused()).to.be.true();
				await browser.pause(500);
				const {day: value} = await extractValues(datePicker);
				expect(value).to.equal(1);
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const datePicker = Page.components.datePickerDisabledWithDefaultValue;

			it('should display default date', async function () {
				const {day, month, year} = await extractValues(datePicker);

				expect(day).to.equal(6);
				expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
				expect(year).to.equal(2020);

			});

			it('should not update \'defaultValue\' on decrementing disabled picker', async function () {
				const {day, month, year} = await extractValues(datePicker);
				await datePicker.decrementer(datePicker.month).click();
				expect(await datePicker.decrementer(datePicker.month).isFocused()).to.be.true();

				await datePicker.decrementer(datePicker.day).click();
				expect(await datePicker.decrementer(datePicker.day).isFocused()).to.be.true();

				await datePicker.decrementer(datePicker.year).click();
				expect(await datePicker.decrementer(datePicker.year).isFocused()).to.be.true();

				await browser.pause(500);

				expect(day).to.equal(6);
				expect(month).to.equal(6);
				expect(year).to.equal(2020);
			});

			it('should not update \'defaultValue\' on incrementing disabled picker', async function () {
				const {day, month, year} = await extractValues(datePicker);

				await datePicker.incrementer(datePicker.month).click();
				expect(await datePicker.incrementer(datePicker.month).isFocused()).to.be.true();

				await datePicker.incrementer(datePicker.day).click();
				expect(await datePicker.incrementer(datePicker.day).isFocused()).to.be.true();

				await datePicker.incrementer(datePicker.year).click();
				expect(await datePicker.incrementer(datePicker.year).isFocused()).to.be.true();

				await browser.pause(500);

				expect(day).to.equal(6);
				expect(month).to.equal(6);
				expect(year).to.equal(2020);
			});
		});
	});

	describe('RTL locale', async function () {
		const datePicker = Page.components.datePickerDefault;

		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should focus rightmost picker (day) when selected', async function () {
			expect(await datePicker.decrementer(datePicker.day).isFocused()).to.be.true();
		});

		it('should have day-month-year order', async function () {
			expect(await datePicker.decrementer(datePicker.day).isFocused()).to.be.true();
			await Page.spotlightLeft();
			expect(await datePicker.decrementer(datePicker.month).isFocused()).to.be.true();
			await Page.spotlightLeft();
			expect(await datePicker.decrementer(datePicker.year).isFocused()).to.be.true();
		});
	});
});
