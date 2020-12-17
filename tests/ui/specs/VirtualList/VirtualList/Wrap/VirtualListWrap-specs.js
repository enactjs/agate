const Page = require('../VirtualListPage');
const {expectFocusedItem, waitUntilFocused} = require('../../VirtualList-utils');

describe('Wrap', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should wrap when', function () {
		// Set wrap to true
		Page.buttonWrap.moveTo();
		Page.spotlightSelect();
		// 5-way Spot the first item.
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		expectFocusedItem(0, 'focus first item');
		// 5-Way Up to move focus to the last item in the list.
		Page.spotlightUp();
		Page.delay(1500);  // TODO: Need better way to detect scroll end
		// Verify: Spotlight displays on the last item.
		expectFocusedItem(99, 'focus last item before first item');
		// 5-Way Down to move focus to the first item in the list.
		Page.spotlightDown();
		Page.delay(1500);  // TODO: Need better way to detect scroll end
		// Verify: Spotlight displays on the first item.
		expectFocusedItem(0, 'focus first item after last item');
	});

	it('should not scroll when leaving list with 5-way up/down', function () {
		// set dataSize to 10 for Speed up Test.
		Page.inputfieldNumItems.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(1);
		Page.numPad(0);
		Page.backKey();
		Page.spotlightDown();
		// change to 5-way mode
		Page.buttonLeft.moveTo();
		// 5-way Spot the first item.
		Page.spotlightRight();
		// Verify: Spotlight displays on the first item.
		expectFocusedItem(0, 'first item focus');
		// 5-way Up.
		Page.spotlightUp();
		// Verify: The list *does not* Scroll to the Bottom. 2. Spotlight is on the buttonTop
		expect(Page.buttonTop.isFocused(), 'button top focus').to.be.true();
		Page.spotlightDown();
		expectFocusedItem(0);
		Page.pageDown();
		waitUntilFocused(4, 'focus Item 4');
		Page.fiveWayToItem(9);
		// Click the last item.
		Page.spotlightSelect();
		// Spotlight is on the last item.
		Page.delay(1000);
		expectFocusedItem(9, 'focus Item 9');
		// 5-way Down
		Page.spotlightDown();
		Page.spotlightDown(); // 1 extra 5-way down to check Spotlight does not pass buttonBottom when wrap is off.
		Page.delay(1000);
		// Verify 1. The list *does not* Scroll to the Top. 2. Spotlight stays on the last item.
		// Checking focus is on buttonBottom instead of last item since 5-way Down on last item using this app takes Spotlight to buttonBottom.
		expect(Page.buttonBottom.isFocused(), 'last item focus').to.be.true();
	});
});
