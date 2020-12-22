const Page = require('./ArcSliderPage');

describe('ArcSlider', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const arcSlider = Page.components.arcSliderDefault;

		it('should change the position of the slider knob on each different click position', function () {
			const {cx: originalCx, cy: originalCy} = arcSlider.knobPosition;
			arcSlider.self.click({x: 5, y: -10});

			const {cx: cx1, cy: cy1} = arcSlider.knobPosition;
			expect(cx1).to.be.above(originalCx);
			expect(cy1).to.be.below(originalCy);

			arcSlider.self.click({x: -15, y: -20});

			const {cx: cx2, cy: cy2} = arcSlider.knobPosition;
			expect(cx2).to.be.below(cx1);
			expect(cy2).to.be.above(cy1);
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
			const {cx: originalCx, cy: originalCy} = arcSlider.knobPosition;
			// bottom-left part means negative x and positive y
			arcSlider.self.click({x: -5, y: 5});

			const {cx, cy} = arcSlider.knobPosition;
			expect(cx).to.equal(originalCx);
			expect(cy).to.equal(originalCy);
		});

		it('should change the position of the slider knob on click on the top part of the circle', function () {
			const {cx: originalCx, cy: originalCy} = arcSlider.knobPosition;

			// top part means any value x and negative value for y
			arcSlider.self.click({x: 10, y: -10});

			const {cx, cy} = arcSlider.knobPosition;
			expect(cx).to.be.above(originalCx);
			expect(cy).to.be.below(originalCy);
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
			const {cx: originalCx, cy: originalCy} = arcSlider.knobPosition;

			arcSlider.self.click({x: -5, y: 0});

			const {cx, cy} = arcSlider.knobPosition;
			expect(cx).to.equal(originalCx);
			expect(cy).to.equal(originalCy);
		});
	});
});
