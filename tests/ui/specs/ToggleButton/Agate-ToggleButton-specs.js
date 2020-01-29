const Page = require('./Agate-ToggleButton-Page');

describe('ToggleButton', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.toggleDefault.self.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const toggleButton = Page.components.toggleDefault;

		it('should have correct text', function () {
			expect(toggleButton.textContent.toLowerCase()).to.equal('missing toggle label');
		});

		it('should be unselected', function () {
			expect(toggleButton.isSelected).to.be.false();
		});
	});

	describe('labelled', function () {
		const toggleButton = Page.components.toggleWithLabels;

		it('should have correct text', function () {
			expect(toggleButton.textContent.toLowerCase()).to.equal('off');
		});

		it('should be unselected', function () {
			expect(toggleButton.isSelected).to.be.false();
		});
	});

});
