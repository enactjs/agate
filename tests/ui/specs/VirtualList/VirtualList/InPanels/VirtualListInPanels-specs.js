const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList in Panels', function () {
	beforeEach(async function () {
		await Page.open('InPanels');
	});

	it('should Spotlight returns on Item when List has only 1 Item', async function () {
		await (Page.inputfieldNumItems).moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backKey();
		// 5-way Spot Item 0.
		await Page.spotlightDown();
		await expectFocusedItem(0);
		// Verify: Only Item 0 shows in the viewport.
		// Verify: Spotlight is on Item 0.
		await Page.spotlightDown();
		await expectFocusedItem(0);
		// 5-way Select Item 0.
		await Page.spotlightSelect();
		await browser.pause(1000);
		// Verify: Spotlight is on Go Back.
		expect(await Page.textContent()).to.equal('Go Back');
		// 5-way Select Go Back.
		await Page.spotlightSelect();
		await browser.pause(1000);
		// Verify: Spotlight is on Item 0 again.
		await expectFocusedItem(0);
	});
});
