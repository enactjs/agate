const Page = require('./Agate-Picker-Page');

describe('Picker', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.pickerDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const picker = Page.components.pickerDefault;

		it('should have correct text', function () {
			expect(picker.textContent).to.equal('Radio Item1');
		});

		it('should not be selected', function () {
			expect(picker.isSelected).to.be.false();
		});
	});

	describe('default selected', function () {
		const picker = Page.components.pickerDefaultSelected;

		it('should have correct text', function () {
			expect(picker.textContent).to.equal('Radio Item selected');
		});

		it('should be selected', function () {
			expect(picker.isSelected).to.be.true();
		});
	});
});
