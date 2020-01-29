const Page = require('./Agate-RadioItem-Page');

describe('RadioItem', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.radioDefault.self.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const radioItem = Page.components.radioDefault;

		it('should have correct text', function () {
			expect(radioItem.textContent).to.equal('Radio Item1');
		});

		it('should not be selected', function () {
			expect(radioItem.isSelected).to.be.false();
		});
	});

	describe('default selected', function () {
		const radioItem = Page.components.radioDefaultSelected;

		it('should have correct text', function () {
			expect(radioItem.textContent).to.equal('Radio Item selected');
		});

		it('should be selected', function () {
			expect(radioItem.isSelected).to.be.true();
		});
	});
});
