const Page = require('./RangePickerPage');
const {extractValue} = require('./RangePicker-utils.js');

describe('RangePicker', function () {

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('vertical', function () {
			describe('default', function () {
				const rangePicker = Page.components.rangePickerDefault;

				describe('5-way', function () {
					it('should change the value forward when incrementing the rangePicker', async function () {
						expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
						await Page.spotlightSelect();
						await browser.pause(500);
						const newValue = await extractValue(rangePicker);
						expect(newValue).toBe(5);
					});

					it('should change the value backward when decrementing the rangePicker', async function () {
						expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
						await Page.spotlightSelect();
						await Page.spotlightUp();
						expect(await rangePicker.decrementer(rangePicker.self).isFocused()).toBe(true);
						await Page.spotlightSelect();
						await browser.pause(500);
						const newValue = await extractValue(rangePicker);
						expect(newValue).toBe(0);
					});
				});

				describe('pointer', function () {
					it('should increase the value when incrementing the rangePicker', async function () {
						await rangePicker.incrementer(rangePicker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(rangePicker);
						expect(newValue).toBe(5);
					});

					it('should decrease the value when decrementing the rangePicker', async function () {
						await rangePicker.incrementer(rangePicker.self).click();
						expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
						await rangePicker.decrementer(rangePicker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(rangePicker);
						expect(newValue).toBe(0);
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
						expect(newValue).toBe(oldValue);
					});
				});

				describe('pointer', function () {
					it('should not increase the value when clicking the incrementer', async function () {
						const oldValue = await extractValue(rangePicker);
						await rangePicker.incrementer(rangePicker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(rangePicker);
						expect(newValue).toBe(oldValue);
					});

					it('should not decrease the value when clicking the decrementer', async function () {
						const oldValue = await extractValue(rangePicker);
						await rangePicker.decrementer(rangePicker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(rangePicker);
						expect(newValue).toBe(oldValue);
					});
				});
			});

			describe('with \'negativeValues\'', function () {
				const rangePicker = Page.components.rangePickerWithNegativeValues;

				it('should have the default value selected', async function () {
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(0);
				});

				it('should decrement to negative number', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(-1);
				});
			});

			describe('wrap', function () {
				const rangePicker = Page.components.rangePickerWrap;

				it('should decrease to max value', async function () {
					const oldValue = await extractValue(rangePicker);
					expect(oldValue).toBe(0);
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(10);
				});

				it('should increase to min value', async function () {
					for (let i = 0; i < 10; i++) {
						await rangePicker.incrementer(rangePicker.self).click();
						await browser.pause(100);
					}
					const oldValue = await extractValue(rangePicker);
					expect(oldValue).toBe(10);
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});
			});
		});

		describe('horizontal', function () {
			describe('default', function () {
				const rangePicker = Page.components.rangePickerHorizontalDefault;

				describe('5-way', function () {
					it('should change the value forward when incrementing the range picker', async function () {
						// 5-way down to increment button of horizontal RangePicker
						for (let i = 0; i <= 7; i++) {
							await Page.spotlightDown();
						}
						await Page.spotlightSelect();
						await browser.pause(500);
						const newValue = await extractValue(rangePicker);
						expect(newValue).toBe(5);
					});

					it('should change the value backward when decrementing the range picker', async function () {
						// 5-way down to increment button of horizontal RangePicker
						for (let i = 0; i <= 7; i++) {
							await Page.spotlightDown();
						}
						await Page.spotlightSelect();
						await browser.pause(500);
						await Page.spotlightLeft();
						await Page.spotlightSelect();
						await browser.pause(500);
						const newValue = await extractValue(rangePicker);
						expect(newValue).toBe(0);
					});
				});

				describe('pointer', function () {
					it('should increase the value when incrementing the range picker', async function () {
						await rangePicker.incrementer(rangePicker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(rangePicker);
						expect(newValue).toBe(5);
					});

					it('should decrease the value when decrementing the range picker', async function () {
						await rangePicker.incrementer(rangePicker.self).click();
						expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
						await rangePicker.decrementer(rangePicker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(rangePicker);
						expect(newValue).toBe(0);
					});
				});
			});

			describe('disabled', function () {
				const rangePicker = Page.components.rangePickerHorizontalDisabled;

				describe('5-way', function () {
					it('should not update on select', async function () {
						const oldValue = await extractValue(rangePicker);
						await Page.spotlightSelect();
						await rangePicker.focus();
						await browser.pause(500);
						const newValue = await extractValue(rangePicker);
						expect(newValue).toBe(oldValue);
					});
				});

				describe('pointer', function () {
					it('should not increase the value when clicking the incrementer', async function () {
						const oldValue = await extractValue(rangePicker);
						await rangePicker.incrementer(rangePicker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(rangePicker);
						expect(newValue).toBe(oldValue);
					});

					it('should not decrease the value when clicking the decrementer', async function () {
						const oldValue = await extractValue(rangePicker);
						await rangePicker.decrementer(rangePicker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(rangePicker);
						expect(newValue).toBe(oldValue);
					});
				});
			});

			describe('with \'negativeValues\'', function () {
				const rangePicker = Page.components.rangePickerHorizontalWithNegativeValues;

				it('should have the default value selected', async function () {
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(0);
				});

				it('should decrement to negative number', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(-1);
				});
			});

			describe('wrap', function () {
				const rangePicker = Page.components.rangePickerHorizontalWrap;

				it('should decrease to max value', async function () {
					const oldValue = await extractValue(rangePicker);
					expect(oldValue).toBe(0);
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(10);
				});

				it('should increase to min value', async function () {
					for (let i = 0; i < 10; i++) {
						await rangePicker.incrementer(rangePicker.self).click();
					}
					const oldValue = await extractValue(rangePicker);
					expect(oldValue).toBe(10);
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});
			});
		});
	});

	describe('RTL locale', function () {
		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		describe('vertical', function () {
			const rangePicker = Page.components.rangePickerDefault;

			describe('5-way', function () {
				it('should change the value forward when incrementing the range picker', async function () {
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(5);
				});

				it('should change the value backward when decrementing the range picker', async function () {
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await Page.spotlightUp();
					expect(await rangePicker.decrementer(rangePicker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the range picker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(5);
				});

				it('should decrease the value when decrementing the range picker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(0);
				});
			});
		});

		describe('horizontal', function () {
			const rangePicker = Page.components.rangePickerHorizontalDefault;

			describe('5-way', function () {
				it('should change the value forward when incrementing the range picker', async function () {
					// 5-way down to increment button of horizontal RangePicker
					for (let i = 0; i <= 7; i++) {
						await Page.spotlightDown();
					}
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(5);
				});

				it ('should change the value forward when decrementing the range picker', async function () {
					// 5-way down to increment button of horizontal RangePicker
					for (let i = 0; i <= 7; i++) {
						await Page.spotlightDown();
					}
					await Page.spotlightSelect();
					await Page.spotlightRight();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(0);
				});
			});

			describe('pointer', async function () {
				it('should increase the value when incrementing the range picker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(5);
				});

				it('should decrease the value when decrementing the range picker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(rangePicker);
					expect(newValue).toBe(0);
				});
			});
		});
	});
});
