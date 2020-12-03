const Page = require('./ArcSliderPage');

describe('ArcSlider', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const arcSlider = Page.components.arcSliderDefault;

		it('should change the position of the slider knob on each different click position', function () {
			const originalCx = arcSlider.circle.getCSSProperty('cx').value;
			const originalCy = arcSlider.circle.getCSSProperty('cy').value;

			arcSlider.self.click({x: 5, y: -10});
			const cx1 = arcSlider.circle.getCSSProperty('cx').value;
			const cy1 = arcSlider.circle.getCSSProperty('cy').value;
			expect(cx1 !== originalCx).to.be.true();
			expect(cy1 !== originalCy).to.be.true();

			arcSlider.self.click({x: -15, y: -20});
			const cx2 = arcSlider.circle.getCSSProperty('cx').value;
			const cy2 = arcSlider.circle.getCSSProperty('cy').value;
			expect(cx2 !== cx1).to.be.true();
			expect(cy2 !== cy1).to.be.true();
		});

		it('should have default foregroundColor', function () {
			arcSlider.self.click({x: 5, y: -10});
			// second slider has the foreground color
			expect(arcSlider.coloredPath(2).getCSSProperty('stroke').value).to.equal('rgb(0,0,255)');
		});
	});

	describe('custom', function () {
		// slider has 3 value. first value is active in the bottom-left quarter. second value is active for top half and third value is active for bottom-right quarter
		const arcSlider = Page.components.arcSliderCustom;

		it('should not change the position of the slider knob on click on the bottom-left part of the circle', function () {
			const originalCx = arcSlider.circle.getCSSProperty('cx').value;
			const originalCy = arcSlider.circle.getCSSProperty('cy').value;
			// bottom-left part means negative x and positive y
			arcSlider.self.click({x: -5, y: 5});

			expect(arcSlider.circle.getCSSProperty('cx').value === originalCx).to.be.true();
			expect(arcSlider.circle.getCSSProperty('cy').value === originalCy).to.be.true();
		});

		it('should change the position of the slider knob on click on the top part of the circle', function () {
			const originalCx = arcSlider.circle.getCSSProperty('cx').value;
			const originalCy = arcSlider.circle.getCSSProperty('cy').value;

			// top part means any value x and negative value for y
			arcSlider.self.click({x: 10, y: -10});

			expect(arcSlider.circle.getCSSProperty('cx').value !== originalCx).to.be.true();
			expect(arcSlider.circle.getCSSProperty('cy').value !== originalCy).to.be.true();
		});

		it('should have custom foregroundColor', function () {
			arcSlider.self.click({x: 5, y: -10});
			// second slider has the foreground color
			expect(arcSlider.coloredPath(2).getCSSProperty('stroke').value).to.equal('rgb(253,201,2)');
		});
	});

	describe('disabled', function () {
		const arcSlider = Page.components.arcSliderDisabled;

		it('should not change the position of the slider knob on click', function () {
			const originalCx = arcSlider.circle.getCSSProperty('cx').value;
			const originalCy = arcSlider.circle.getCSSProperty('cy').value;

			arcSlider.self.click({x: -5, y: 0});

			expect(arcSlider.circle.getCSSProperty('cx').value === originalCx).to.be.true();
			expect(arcSlider.circle.getCSSProperty('cy').value === originalCy).to.be.true();
		});
	});
});
