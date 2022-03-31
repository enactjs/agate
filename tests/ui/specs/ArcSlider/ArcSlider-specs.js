const Page = require('./ArcSliderPage');

describe('ArcSlider', function () {

	beforeEach(async function () {
		await Page.open();
	});

	describe('default', function () {
		const arcSlider = Page.components.arcSliderDefault;

		it('should change the position of the slider knob on each different click position', async function () {
			const {cx: originalCx, cy: originalCy} = await arcSlider.knobPosition();

			await arcSlider.self.click({x: 5, y: -10});

			const {cx: cx1, cy: cy1} = await arcSlider.knobPosition();
			expect(cx1).to.be.above(originalCx);
			expect(cy1).to.be.below(originalCy);

			await arcSlider.self.click({x: -15, y: -20});

			const {cx: cx2, cy: cy2} = await arcSlider.knobPosition();
			expect(cx2).to.be.below(cx1);
			expect(cy2).to.be.above(cy1);
		});

		it('should have default foregroundColor', async function () {
			await arcSlider.self.click({x: 5, y: -10});
			// second slider has the foreground color
			expect((await arcSlider.coloredPath(2).getCSSProperty('stroke')).value).to.equal('rgb(0,0,0)');
		});
	});

	describe('custom', function () {
		// slider has 3 value. first value is active in the bottom-left quarter. second value is active for top half and third value is active for bottom-right quarter
		const arcSlider = Page.components.arcSliderCustom;

		it('should not change the position of the slider knob on click on the bottom-left part of the circle', async function () {
			const {cx: originalCx, cy: originalCy} = await arcSlider.knobPosition();
			// bottom-left part means negative x and positive y
			await arcSlider.self.click({x: -5, y: 5});

			const {cx, cy} = await arcSlider.knobPosition();
			expect(cx).to.equal(originalCx);
			expect(cy).to.equal(originalCy);
		});

		it('should change the position of the slider knob on click on the top part of the circle', async function () {
			const {cx: originalCx, cy: originalCy} = await arcSlider.knobPosition();

			// top part means any value x and negative value for y
			await arcSlider.self.click({x: 10, y: -10});

			const {cx, cy} = await arcSlider.knobPosition();
			expect(cx).to.be.above(originalCx);
			expect(cy).to.be.below(originalCy);
		});

		it('should have custom foregroundColor', async function () {
			await arcSlider.self.click({x: 5, y: -10});
			// second slider has the foreground color
			expect((await arcSlider.coloredPath(2).getCSSProperty('stroke')).value).to.equal('rgb(253,201,2)');
		});
	});

	describe('disabled', function () {
		const arcSlider = Page.components.arcSliderDisabled;

		it('should not change the position of the slider knob on click', async function () {
			const {cx: originalCx, cy: originalCy} = await arcSlider.knobPosition();

			await arcSlider.self.click({x: -5, y: 0});

			const {cx, cy} = await arcSlider.knobPosition();
			expect(cx).to.equal(originalCx);
			expect(cy).to.equal(originalCy);
		});
	});
});
