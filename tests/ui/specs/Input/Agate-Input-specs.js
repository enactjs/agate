const Page = require('./Agate-Input-Page');

describe('Input', function () {

	describe('disabled', function () {
		it('should be disabled', function () {
			Page.open();
			expect(Page.disabledInput.isFocused()).to.be.true();
		});
	});
});
