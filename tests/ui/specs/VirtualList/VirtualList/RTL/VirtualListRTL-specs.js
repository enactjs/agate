const Page = require('../VirtualListPage');

describe('RTL locale', function () {
	beforeEach(async function () {
		await Page.open('', '?locale=ar-SA');
	});

	it('should position Scrollbar Track on left side in RTL', async function () {
		expect((await Page.getListRect()).left > (await Page.getVerticalScrollbarRect()).left).toBe(true);
	});

	it('should Verify RTL functionality', async function () {
		// Check that the button's position is Right-> Left.(in case RTL, button position is 'Right' - 'Left')
		await (Page.buttonLeft).moveTo();
		expect(await Page.buttonLeft.isFocused(), 'focus left');
		await Page.spotlightLeft();
		await Page.spotlightLeft();
		expect(await Page.buttonRight.isFocused(), 'focus Right');
		// Verify Vertical Scrollbar displays on the left side.
		expect((await Page.getListRect()).left > (await Page.getVerticalScrollbarRect()).left).toBe(true);
	});
});
