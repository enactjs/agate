const Page = require('./ArcPickerPage');

describe('ArcPicker', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const arcPicker = Page.components.arcPickerDefault;

		it('should have the first arc selected by default', function () {
			expect(arcPicker.coloredPath(1).getCSSProperty('stroke').value).to.equal('rgb(68,68,68)');
		});

		it('should select the third arc when it is clicked', function () {
			arcPicker.clickablePath(3).click();
			expect(arcPicker.coloredPath(3).getCSSProperty('stroke').value).to.equal('rgb(68,68,68)');
			// previous arcs should remain unselected
			expect(arcPicker.coloredPath(1).getCSSProperty('stroke').value).to.equal('rgb(238,238,238)');
			expect(arcPicker.coloredPath(2).getCSSProperty('stroke').value).to.equal('rgb(238,238,238)');
		});
	});

	describe('cumulative', function () {
		const arcPicker = Page.components.arcPickerCumulative;

		it('should select all arcs up to the clicked arc', function () {
			arcPicker.clickablePath(3).click();
			expect(arcPicker.coloredPath(1).getCSSProperty('stroke').value).to.equal('rgb(68,68,68)');
			expect(arcPicker.coloredPath(2).getCSSProperty('stroke').value).to.equal('rgb(68,68,68)');
			expect(arcPicker.coloredPath(3).getCSSProperty('stroke').value).to.equal('rgb(68,68,68)');
			// next one is unselected
			expect(arcPicker.coloredPath(4).getCSSProperty('stroke').value).to.equal('rgb(238,238,238)');
		});
	});

	describe('disabled', function () {
		const arcPicker = Page.components.arcPickerDisabled;

		it('should have the first arc selected by default', function () {
			expect(arcPicker.coloredPath(1).getCSSProperty('stroke').value).to.equal('rgb(68,68,68)');
		});

		it('should not select the third arc when it is clicked', function () {
			arcPicker.clickablePath(3).click();
			expect(arcPicker.coloredPath(3).getCSSProperty('stroke').value).to.equal('rgb(238,238,238)');
			// first arc should remain selected
			expect(arcPicker.coloredPath(1).getCSSProperty('stroke').value).to.equal('rgb(68,68,68)');
		});
	});

});
