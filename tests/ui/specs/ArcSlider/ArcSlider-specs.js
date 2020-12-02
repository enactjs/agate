const Page = require('./ArcSliderPage');

describe('ArcSlider', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const arcSlider = Page.components.arcSliderDefault;

		it('should change the position of the slider knob on click', function () {
			const originalCx = arcSlider.circle(3).getCSSProperty('cx').value;
			const originalCy = arcSlider.circle(3).getCSSProperty('cy').value;

			arcSlider.self.click({x: -50, y: -100});
			expect(arcSlider.circle(3).getCSSProperty('cx').value !== originalCx).to.be.true();
			expect(arcSlider.circle(3).getCSSProperty('cy').value !== originalCy).to.be.true();
		});
	});

	describe('disabled', function () {
		const arcSlider = Page.components.arcSliderDisabled;

		it('should not change the position of the slider knob on click', function () {
			const originalCx = arcSlider.circle(3).getCSSProperty('cx').value;
			const originalCy = arcSlider.circle(3).getCSSProperty('cy').value;

			arcSlider.self.click({x: -50, y: -100});
			expect(arcSlider.circle(3).getCSSProperty('cx').value === originalCx).to.be.true();
			expect(arcSlider.circle(3).getCSSProperty('cy').value === originalCy).to.be.true();
		});
	});
});
