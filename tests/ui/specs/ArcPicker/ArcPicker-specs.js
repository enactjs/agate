const Page = require('./ArcPickerPage');
const accentColor = 'rgb(139,126,254)'; // selected and focused
const selectedColor = 'rgb(68,68,68)';
const unselectedColor = 'rgb(238,238,238)';

describe('ArcPicker', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const arcPicker = Page.components.arcPickerDefault;

		it('should have the first arc selected by default', function () {
			Page.spotlightSelect();

			expect(arcPicker.coloredPath(1).getCSSProperty('stroke').value).to.equal(accentColor);
		});

		it('should select the third arc when it is clicked', function () {
			arcPicker.clickablePath(3).click();
			expect(arcPicker.coloredPath(3).getCSSProperty('stroke').value).to.equal(accentColor);
			// previous arcs should remain unselected
			expect(arcPicker.coloredPath(1).getCSSProperty('stroke').value).to.equal(unselectedColor);
			expect(arcPicker.coloredPath(2).getCSSProperty('stroke').value).to.equal(unselectedColor);
		});
	});

	describe('cumulative', function () {
		const arcPicker = Page.components.arcPickerCumulative;

		it('should select all arcs up to the clicked arc', function () {
			arcPicker.clickablePath(3).click();
			expect(arcPicker.coloredPath(1).getCSSProperty('stroke').value).to.equal(accentColor);
			expect(arcPicker.coloredPath(2).getCSSProperty('stroke').value).to.equal(accentColor);
			expect(arcPicker.coloredPath(3).getCSSProperty('stroke').value).to.equal(accentColor);
			// next one is unselected
			expect(arcPicker.coloredPath(4).getCSSProperty('stroke').value).to.equal(unselectedColor);
		});
	});

	describe('disabled', function () {
		const arcPicker = Page.components.arcPickerDisabled;

		it('should have the first arc selected by default', function () {
			expect(arcPicker.coloredPath(1).getCSSProperty('stroke').value).to.equal(selectedColor);
		});

		it('should not select the third arc when it is clicked', function () {
			arcPicker.clickablePath(3).click();
			expect(arcPicker.coloredPath(3).getCSSProperty('stroke').value).to.equal(unselectedColor);
			// first arc should remain selected
			expect(arcPicker.coloredPath(1).getCSSProperty('stroke').value).to.equal(accentColor);
		});
	});

});
