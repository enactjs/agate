const Page = require('./SliderPage');

describe('Slider', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const slider = Page.components.sliderDefault;

			describe('5-way', function () {
				it('should increment the value of horizontal slider on key right when active', function () {
					expect(slider.self.isFocused()).to.be.true();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightSelect();
					Page.spotlightRight();
					// expect knob `left` css prop to be bigger than original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue > originalValue).to.be.true();
				});

				it('should decrement the value of horizontal slider on key left when active', function () {
					expect(slider.self.isFocused()).to.be.true();
					Page.spotlightSelect();
					Page.spotlightRight();
					Page.spotlightRight();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightLeft();
					// expect knob `left` css prop to be smaller than original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue < originalValue).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should change the value of horizontal slider on slider click at position', function () {
					expect(slider.self.isFocused()).to.be.true();
					const originalValue = slider.knobPositionHorizontal;
					slider.self.click();
					// expect knob `left` css prop to be bigger than original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue > originalValue).to.be.true();
				});
			});
		});

		describe('with `activateOnFocus`', function () {
			const slider = Page.components.sliderActivateOnFocus;

			describe('5-way', function () {
				it('should activate on focus and can increment the value', function () {
					slider.focus();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightRight();
					// expect knob `left` css prop to be bigger than original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue > originalValue).to.be.true();
				});

				it('should activate on focus and can decrement the value', function () {
					slider.focus();
					Page.spotlightRight();
					Page.spotlightRight();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightLeft();
					// expect knob `left` css prop to be smaller than original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue < originalValue).to.be.true();
				});
			});
		});

		describe('with custom `progressAnchor`', function () {
			const slider = Page.components.sliderCustomProgressAnchor;

			it('fill bar should be greater than 0 when value is at minimum', function () {
				slider.focus();
				expect(slider.sliderFillWidth > 0).to.be.true();
			});
		});

		describe('vertical slider', function () {
			const slider = Page.components.sliderVertical;

			describe('5-way', function () {
				it('should increment the value of horizontal slider on key down when active', function () {
					slider.focus();
					const originalValue = slider.knobPositionVertical;
					Page.spotlightSelect();
					Page.spotlightUp();
					Page.spotlightUp();
					// expect knob `bottom` css prop to be greater than original one
					const newValue = slider.knobPositionVertical;
					expect(newValue > originalValue).to.be.true();
				});

				it('should decrement the value of horizontal slider on key up when active', function () {
					slider.focus();
					Page.spotlightSelect();
					Page.spotlightUp();
					const originalValue = slider.knobPositionVertical;
					Page.spotlightDown();
					// expect knob `bottom` css prop to be less than original one
					const newValue = slider.knobPositionVertical;
					expect(newValue < originalValue).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should change the value of horizontal slider on slider click at position', function () {
					slider.focus();
					const originalValue = slider.knobPositionVertical;
					slider.self.click();
					// expect knob `left` css prop to be greater than original one
					const newValue = slider.knobPositionVertical;
					expect(newValue > originalValue).to.be.true();
				});
			});
		});

		describe('disabled', function () {
			const slider = Page.components.sliderDisabled;

			describe('5-way', function () {
				it('should not increment the value of horizontal slider on key right when active', function () {
					slider.focus();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightSelect();
					Page.spotlightRight();
					// expect knob `left` css prop to be equal to original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue === originalValue).to.be.true();
				});

				it('should not decrement the value of horizontal slider on key left when active', function () {
					slider.focus();
					Page.spotlightSelect();
					Page.spotlightRight();
					Page.spotlightRight();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightLeft();
					// expect knob `left` css prop to be equal to original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue === originalValue).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should not change the value of horizontal slider on slider click at position', function () {
					slider.focus();
					const originalValue = slider.knobPositionHorizontal;
					slider.self.click();
					// expect knob `left` css prop to be equal to original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue === originalValue).to.be.true();
				});
			});
		});

		describe('vertical disabled slider', function () {
			const slider = Page.components.sliderVerticalDisabled;

			describe('5-way', function () {
				it('should not increment the value of horizontal slider on key down when active', function () {
					slider.focus();
					const originalValue = slider.knobPositionVertical;
					Page.spotlightSelect();
					Page.spotlightUp();
					Page.spotlightUp();
					// expect knob `bottom` css prop to be equal to original one
					const newValue = slider.knobPositionVertical;
					expect(newValue === originalValue).to.be.true();
				});

				it('should not decrement the value of horizontal slider on key up when active', function () {
					slider.focus();
					Page.spotlightSelect();
					Page.spotlightUp();
					const originalValue = slider.knobPositionVertical;
					Page.spotlightDown();
					// expect knob `bottom` css prop to be equal to original one
					const newValue = slider.knobPositionVertical;
					expect(newValue === originalValue).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should not change the value of horizontal slider on slider click at position', function () {
					slider.focus();
					const originalValue = slider.knobPositionVertical;
					slider.self.click();
					// expect knob `left` css prop to be equal to original one
					const newValue = slider.knobPositionVertical;
					expect(newValue === originalValue).to.be.true();
				});
			});
		});
	});
});
