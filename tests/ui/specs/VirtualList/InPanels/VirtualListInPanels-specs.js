const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../VirtualList-utils');

describe('VirtualList in Panels', function () {
	beforeEach(function () {
		Page.open('InPanels');
	});

	// it('should Spotlight returns on Item when List has only 1 Item', function () {
	// 	Page.inputfieldNumItems.moveTo();
	// 	Page.spotlightSelect();
	// 	Page.backSpace();
	// 	Page.backSpace();
	// 	Page.backKey();
	// 	// 5-way Spot Item 0.
	// 	Page.spotlightDown();
	// 	expectFocusedItem(0);
	// 	// Verify: Only Item 0 shows in the viewport.
	// 	// Verify: Spotlight is on Item 0.
	// 	Page.spotlightDown();
	// 	expectFocusedItem(0);
	// 	// 5-way Select Item 0.
	// 	Page.spotlightSelect();
	// 	Page.delay(1000);
	// 	// Verify: Spotlight is on Go Back.
	// 	expect(Page.textContent()).to.equal('Go Back');
	// 	// 5-way Select Go Back.
	// 	Page.spotlightSelect();
	// 	Page.delay(1000);
	// 	// Verify: Spotlight is on Item 0 again.
	// 	expectFocusedItem(0);
	// });
});
