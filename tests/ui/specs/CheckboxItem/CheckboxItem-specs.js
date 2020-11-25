const Page = require('./CheckboxItemPage');
const {expectChecked, expectUnchecked, expectInline} = require('./CheckboxItem-utils');
const {expectOrdering} = require('@enact/ui-test-utils/utils');

describe('CheckboxItem', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const checkboxItem = Page.components.checkboxItemDefault;

			it('should have focus on first item at start', function () {
				expect(checkboxItem.self.isFocused()).to.be.true();
			});

			it('should have correct text', function () {
				expect(checkboxItem.textContent).to.equal('Checkbox Item');
			});

			it('should not be checked', function () {
				expectUnchecked(checkboxItem);
			});

			// it('should have the icon to the left of text', function () {
			// 	expectOrdering(checkboxItem.checkboxIcon, checkboxItem.textContent)
			// });
		});
	});
});