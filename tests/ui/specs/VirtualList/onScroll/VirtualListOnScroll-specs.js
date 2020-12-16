const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../VirtualList-utils');

describe('Item Animates', function () {
	beforeEach(function () {
		Page.open();
	});

	// it('should animate Items via Page Down', function () {
	// 	// Position the focus on the first item('Item 00')
	// 	Page.item(0).moveTo();
	// 	expectFocusedItem(0);
	// 	// Press Page Down 2 times.
	// 	// Verify: The list Scrolls Up page by page.
	// 	Page.checkScrollbyPagekey('down');
	// 	Page.checkScrollbyPagekey('down');
	// 	// Press Page Up 2 times
	// 	// Verify: The list Scrolls Up page by page.
	// 	Page.checkScrollbyPagekey('up');
	// 	Page.checkScrollbyPagekey('up');
	// });
});
