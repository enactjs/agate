const Page = require('./SliderPage');
const {extractValue} = require('./RangePicker-utils.js');

describe('Slider', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const slider = Page.components.sliderDefault;

			describe('5-way', function () {
				it('should increment the value of horizontal slider on key right when active', function () {
					const originalValue = extractValue(slider);
					expect(slider.incrementer(slider.self).isFocused()).to.be.true();
					Page.spotlightSelect();
					Page.spotlightRight();
					// expect knob position to be different than original one
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(5);
				});

			});
		});
	});
});
