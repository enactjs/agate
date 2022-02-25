const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('Item Animates', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should animate Items via Page Down', async function () {
		// Position the focus on the first item('Item 00')
		await (await Page.item(0)).moveTo();
		await expectFocusedItem(0);
		// Press Page Down 2 times.
		// Verify: The list Scrolls Up page by page.
		await Page.checkScrollbyPagekey('down');
		await Page.checkScrollbyPagekey('down');
		// Press Page Up 2 times
		// Verify: The list Scrolls Up page by page.
		await Page.checkScrollbyPagekey('up');
		await Page.checkScrollbyPagekey('up');
	});
});
