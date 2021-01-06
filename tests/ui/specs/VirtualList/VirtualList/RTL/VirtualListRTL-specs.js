const Page = require('../VirtualListPage');

describe('RTL locale', function () {
	beforeEach(function () {
		Page.open('', '?locale=ar-SA');
	});

	it('should position Scrollbar Track on left side in RTL', function () {
		expect(Page.getListRect().left > Page.getVerticalScrollbarRect().left).to.be.true();
	});

	it('should Verify RTL functionality', function () {
		// Check that the button's position is Right-> Left.(in case RTL, button position is 'Right' - 'Left')
		Page.buttonLeft.moveTo();
		expect(Page.buttonLeft.isFocused(), 'focus left');
		Page.spotlightLeft();
		Page.spotlightLeft();
		expect(Page.buttonRight.isFocused(), 'focus Right');
		// Verify Vertical Scrollbar displays on the left side.
		expect(Page.getListRect().left > Page.getVerticalScrollbarRect().left).to.be.true();
	});
});
