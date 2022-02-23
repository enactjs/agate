const Page = require('./IncrementSliderPage');

describe('IncrementSlider', function () {

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('default', function () {
			const incrementSlider = Page.components.incrementSliderDefault;

			describe('5-way', function () {
				it('should increment the value of horizontal incrementSlider on right arrow key when active', async function () {
					expect(await incrementSlider.decrementButton.isFocused()).to.be.true();
					await Page.spotlightRight();
					const originalValue = await incrementSlider.knobPositionHorizontal();
					await Page.spotlightSelect();
					await Page.spotlightRight();
					// expect knob `left` css prop to be bigger than original one
					const newValue = await incrementSlider.knobPositionHorizontal();
					expect(newValue > originalValue).to.be.true();
				});

				it('should decrement the value of horizontal incrementSlider on left arrow key when active', async function () {
					expect(await incrementSlider.decrementButton.isFocused()).to.be.true();
					await Page.spotlightRight();
					await Page.spotlightSelect();
					await Page.spotlightRight();
					await Page.spotlightRight();
					const originalValue = await incrementSlider.knobPositionHorizontal();
					await Page.spotlightLeft();
					// expect knob `left` css prop to be smaller than original one
					const newValue = await incrementSlider.knobPositionHorizontal();
					expect(newValue < originalValue).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should change the value of horizontal incrementSlider on incrementSlider click at position', async function () {
					expect(await incrementSlider.decrementButton.isFocused()).to.be.true();
					const originalValue = await incrementSlider.knobPositionHorizontal();
					await incrementSlider.self.click();
					// expect knob `left` css prop to be bigger than original one
					const newValue = await incrementSlider.knobPositionHorizontal();
					expect(newValue > originalValue).to.be.true();
				});
			});

			describe('buttons click', function () {
				it('should change the value of horizontal incrementSlider on increment/decrement button click', async function () {
					const originalValue = await incrementSlider.knobPositionHorizontal();
					await incrementSlider.incrementButton.click();
					await incrementSlider.incrementButton.click();
					// expect knob `left` css prop to be bigger than original one
					const value1 = await incrementSlider.knobPositionHorizontal();
					expect(value1 > originalValue).to.be.true();

					await incrementSlider.decrementButton.click();
					// expect knob `left` css prop to be less than value1
					const value2 = await incrementSlider.knobPositionHorizontal();
					expect(value2 < value1).to.be.true();
				});
			});
		});

		describe('with custom `progressAnchor`', function () {
			const incrementSlider = Page.components.incrementSliderCustomProgressAnchor;

			it('fill bar should be greater than 0 when value is at minimum', async function () {
				expect(await incrementSlider.incrementSliderFillWidth() > 0).to.be.true();
			});
		});

		describe('with tooltip', function () {
			const incrementSlider = Page.components.incrementSliderWithTooltip;

			it('should display a tooltip on focus', async function () {
				await incrementSlider.focusSlider();
				expect(await incrementSlider.tooltip.isExisting()).to.be.true();
			});
		});

		describe('vertical incrementSlider', function () {
			const incrementSlider = Page.components.incrementSliderVertical;

			describe('5-way', function () {
				it('should increment the value of vertical incrementSlider on up arrow key when active', async function () {
					await incrementSlider.focusSlider();
					const originalValue = await incrementSlider.knobPositionVertical();
					await Page.spotlightSelect();
					await Page.spotlightUp();
					await Page.spotlightUp();
					// expect knob `bottom` css prop to be greater than original one
					const newValue = await incrementSlider.knobPositionVertical();
					expect(newValue > originalValue).to.be.true();
				});

				it('should decrement the value of vertical incrementSlider on down arrow key when active', async function () {
					await incrementSlider.focusSlider();
					await Page.spotlightSelect();
					await Page.spotlightUp();
					const originalValue = await incrementSlider.knobPositionVertical();
					await Page.spotlightDown();
					// expect knob `bottom` css prop to be less than original one
					const newValue = await incrementSlider.knobPositionVertical();
					expect(newValue < originalValue).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should change the value of vertical incrementSlider on incrementSlider click at position', async function () {
					const originalValue = await incrementSlider.knobPositionVertical();
					await incrementSlider.self.click();
					// expect knob `left` css prop to be greater than original one
					const newValue = await incrementSlider.knobPositionVertical();
					expect(newValue > originalValue).to.be.true();
				});
			});
		});

		describe('disabled', function () {
			const incrementSlider = Page.components.incrementSliderDisabled;

			describe('5-way', function () {
				it('should not increment the value of horizontal incrementSlider on right arrow key when active', async function () {
					await incrementSlider.focusSlider();
					const originalValue = await incrementSlider.knobPositionHorizontal();
					await Page.spotlightSelect();
					await Page.spotlightRight();
					// expect knob `left` css prop to be equal to original one
					const newValue = await incrementSlider.knobPositionHorizontal();
					expect(newValue).to.equal(originalValue);
				});

				it('should not decrement the value of horizontal incrementSlider on left arrow key when active', async function () {
					await incrementSlider.focusSlider();
					await Page.spotlightSelect();
					await Page.spotlightRight();
					await Page.spotlightRight();
					const originalValue = await incrementSlider.knobPositionHorizontal();
					await Page.spotlightLeft();
					// expect knob `left` css prop to be equal to original one
					const newValue = await incrementSlider.knobPositionHorizontal();
					expect(newValue === originalValue).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should not change the value of horizontal incrementSlider on incrementSlider click at position', async function () {
					const originalValue = await incrementSlider.knobPositionHorizontal();
					await incrementSlider.self.click();
					// expect knob `left` css prop to be equal to original one
					const newValue = await incrementSlider.knobPositionHorizontal();
					expect(newValue === originalValue).to.be.true();
				});
			});

			describe('buttons click', function () {
				it('should not change the value of horizontal incrementSlider on increment/decrement button click', async function () {
					const originalValue = await incrementSlider.knobPositionHorizontal();
					await incrementSlider.incrementButton.click();
					await incrementSlider.incrementButton.click();
					// expect knob `left` css prop to be bigger than original one
					const value1 = await incrementSlider.knobPositionHorizontal();
					expect(value1).to.equal(originalValue);

					await incrementSlider.decrementButton.click();
					// expect knob `left` css prop to be less than value1
					const value2 = await incrementSlider.knobPositionHorizontal();
					expect(value2).to.equal(value1);
				});
			});
		});

		describe('vertical disabled incrementSlider', function () {
			const incrementSlider = Page.components.incrementSliderVerticalDisabled;

			describe('5-way', function () {
				it('should not increment the value of vertical incrementSlider on up arrow key when active', async function () {
					await incrementSlider.focusSlider();
					const originalValue = await incrementSlider.knobPositionVertical();
					await Page.spotlightSelect();
					await Page.spotlightUp();
					await Page.spotlightUp();
					// expect knob `bottom` css prop to be equal to original one
					const newValue = await incrementSlider.knobPositionVertical();
					expect(newValue === originalValue).to.be.true();
				});

				it('should not decrement the value of vertical incrementSlider on down arrow key when active', async function () {
					await incrementSlider.focusSlider();
					await Page.spotlightSelect();
					await Page.spotlightUp();
					const originalValue = await incrementSlider.knobPositionVertical();
					await Page.spotlightDown();
					// expect knob `bottom` css prop to be equal to original one
					const newValue = await incrementSlider.knobPositionVertical();
					expect(newValue === originalValue).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should not change the value of vertical incrementSlider on incrementSlider click at position', async function () {
					await incrementSlider.focusSlider();
					const originalValue = await incrementSlider.knobPositionVertical();
					await incrementSlider.self.click();
					// expect knob `left` css prop to be equal to original one
					const newValue = await incrementSlider.knobPositionVertical();
					expect(newValue === originalValue).to.be.true();
				});
			});
		});
	});
});
