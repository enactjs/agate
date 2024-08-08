const Page = require('./PickerPage');
const {extractValue} = require('./Picker-utils.js');

describe('Picker', function () {

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('vertical', function () {
			describe('default', function () {
				const picker = Page.components.pickerDefault;

				describe('5-way', function () {
					it('should change the value forward when incrementing the picker', async function () {
						expect(await picker.incrementer(picker.self).isFocused()).toBe(true);
						await Page.spotlightSelect();
						await browser.pause(500);
						const newValue = await extractValue(picker);
						expect(newValue).toBe('Banana');
					});

					it('should change the value backward when decrementing the picker', async function () {
						expect(await picker.incrementer(picker.self).isFocused()).toBe(true);
						await Page.spotlightSelect();
						await Page.spotlightUp();
						expect(await picker.decrementer(picker.self).isFocused()).toBe(true);
						await Page.spotlightSelect();
						await browser.pause(500);
						const newValue = await extractValue(picker);
						expect(newValue).toBe('Apple');
					});
				});

				describe('pointer', function () {
					it('should increase the value when incrementing the picker', async function () {
						await picker.incrementer(picker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(picker);
						expect(newValue).toBe('Banana');
					});

					it('should decrease the value when decrementing the picker', async function () {
						await picker.incrementer(picker.self).click();
						expect(await picker.incrementer(picker.self).isFocused()).toBe(true);
						await picker.decrementer(picker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(picker);
						expect(newValue).toBe('Apple');
					});
				});
			});

			describe('with \'defaultValue\'', function () {
				// supplied value is `Banana`
				const picker = Page.components.pickerWithDefaultValue;

				it('should have the default value selected', async function () {
					const newValue = await extractValue(picker);
					expect(newValue).toBe('Banana');
				});
			});

			describe('disabled', function () {
				const picker = Page.components.pickerDisabled;

				describe('5-way', function () {
					it('should not update on select', async function () {
						const oldValue = await extractValue(picker);
						await Page.spotlightSelect();
						await picker.focus();
						await browser.pause(500);
						const newValue = await extractValue(picker);
						expect(newValue).toBe(oldValue);
					});
				});

				describe('pointer', function () {
					it('should not increase the value when clicking the incrementer', async function () {
						const oldValue = await extractValue(picker);
						await picker.incrementer(picker.self).click();
						browser.pause(500);
						const newValue = await extractValue(picker);
						expect(newValue).toBe(oldValue);
					});

					it('should not decrease the value when clicking the decrementer', async function () {
						const oldValue = await extractValue(picker);
						await picker.decrementer(picker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(picker);
						expect(newValue).toBe(oldValue);
					});
				});
			});
		});

		describe('horizontal', function () {
			describe('default', function () {
				const picker = Page.components.pickerHorizontalDefault;

				describe('5-way', function () {
					it('should change the value forward when incrementing the picker', async function () {
						// 5-way down to increment button of horizontal default picker increment button
						for (let i = 0; i <= 6; i++) {
							await Page.spotlightDown();
						}
						await Page.spotlightSelect();
						await browser.pause(500);
						const newValue = await extractValue(picker);
						expect(newValue).toBe('Banana');
					});

					it('should change the value backward when decrementing the picker', async function () {
						// 5-way down to increment button of horizontal default picker increment button
						for (let i = 0; i <= 6; i++) {
							await Page.spotlightDown();
						}
						await Page.spotlightSelect();
						await browser.pause(500);
						await Page.spotlightLeft();
						await Page.spotlightSelect();
						await browser.pause(500);
						const newValue = await extractValue(picker);
						expect(newValue).toBe('Apple');
					});
				});

				describe('pointer', function () {
					it('should increase the value when incrementing the picker', async function () {
						await picker.incrementer(picker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(picker);
						expect(newValue).toBe('Banana');
					});

					it('should decrease the value when decrementing the picker', async function () {
						await picker.incrementer(picker.self).click();
						expect(await picker.incrementer(picker.self).isFocused()).toBe(true);
						await picker.decrementer(picker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(picker);
						expect(newValue).toBe('Apple');
					});
				});
			});

			describe('with \'defaultValue\'', function () {
				// supplied value is `Banana`
				const picker = Page.components.pickerHorizontalWithDefaultValue;

				it('should have the default value selected', async function () {
					const newValue = await extractValue(picker);
					expect(newValue).toBe('Banana');
				});
			});

			describe('disabled', function () {
				const picker = Page.components.pickerHorizontalDisabled;

				describe('5-way', function () {
					it('should not update on select', async function () {
						const oldValue = await extractValue(picker);
						// 5-way down to increment button of horizontal default picker increment button
						for (let i = 0; i <= 6; i++) {
							await Page.spotlightSelect();
						}
						// focus decrement button of horizontal disabled picker and 5-way Select
						await Page.spotlightRight();
						await Page.spotlightSelect();
						const newValue = await extractValue(picker);
						expect(newValue).toBe(oldValue);
					});
				});

				describe('pointer', function () {
					it('should not increase the value when clicking the incrementer', async function () {
						const oldValue = await extractValue(picker);
						await picker.incrementer(picker.self).click();
						browser.pause(500);
						const newValue = await extractValue(picker);
						expect(newValue).toBe(oldValue);
					});

					it('should not decrease the value when decrementing the picker', async function () {
						const oldValue = await extractValue(picker);
						await picker.decrementer(picker.self).click();
						await browser.pause(500);
						const newValue = await extractValue(picker);
						expect(newValue).toBe(oldValue);
					});
				});
			});
		});
	});

	describe('RTL locale', function () {
		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		describe('vertical', function () {
			const picker = Page.components.pickerDefault;

			describe('5-way', function () {
				it('should change the value forward when incrementing the picker', async function () {
					expect(await picker.incrementer(picker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = await extractValue(picker);
					expect(newValue).toBe('Banana');
				});

				it('should change the value backward when decrementing the picker', async function () {
					expect(await picker.incrementer(picker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await Page.spotlightUp();
					expect(await picker.decrementer(picker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = await extractValue(picker);
					expect(newValue).toBe('Apple');
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the picker', async function () {
					await picker.incrementer(picker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(picker);
					expect(newValue).toBe('Banana');
				});

				it('should decrease the value when decrementing the picker', async function () {
					await picker.incrementer(picker.self).click();
					expect(await picker.incrementer(picker.self).isFocused()).toBe(true);
					await picker.decrementer(picker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(picker);
					expect(newValue).toBe('Apple');
				});
			});
		});

		describe('horizontal', function () {
			const picker = Page.components.pickerHorizontalDefault;

			describe('5-way', function () {
				it('should change the value forward when incrementing the picker', async function () {
					// 5-way down to increment button of horizontal default picker increment button
					for (let i = 0; i <= 6; i++) {
						await Page.spotlightDown();
					}
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = await extractValue(picker);
					expect(newValue).toBe('Banana');
				});

				it('should change the value backward when decrementing the picker', async function () {
					// 5-way down to increment button of horizontal default picker increment button
					for (let i = 0; i <= 6; i++) {
						await Page.spotlightDown();
					}
					await Page.spotlightSelect();
					await browser.pause(500);
					await Page.spotlightRight();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = await extractValue(picker);
					expect(newValue).toBe('Apple');
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the picker', async function () {
					await picker.incrementer(picker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(picker);
					expect(newValue).toBe('Banana');
				});

				it('should decrease the value when decrementing the picker', async function () {
					await picker.incrementer(picker.self).click();
					expect(await picker.incrementer(picker.self).isFocused()).toBe(true);
					await picker.decrementer(picker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(picker);
					expect(newValue).toBe('Apple');
				});
			});
		});
	});
});
