const Page = require('../VirtualListPage');
const {expectFocusedItem, waitUntilFocused} = require('../../VirtualList-utils');

describe('Wrap', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should wrap when moving from first item to last item with 5-way navigation', async function () {
		// Set wrap to true
		await Page.buttonWrap.moveTo();
		await Page.spotlightSelect();
		// 5-way Spot the first item.
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();
		await expectFocusedItem(0, 'focus first item');
		// 5-Way Up to move focus to the last item in the list.
		await Page.spotlightUp();
		await browser.pause(1500);  // TODO: Need better way to detect scroll end
		// Verify: Spotlight displays on the last item.
		await expectFocusedItem(99, 'focus last item before first item');
		// 5-Way Down to move focus to the first item in the list.
		await Page.spotlightDown();
		await browser.pause(1500); // TODO: Need better way to detect scroll end
		// Verify: Spotlight displays on the first item.
		await expectFocusedItem(0, 'focus first item after last item');
	});

	it('should not scroll when leaving list with 5-way up/down', async function () {
		// set dataSize to 10 for Speed up Test.
		await (Page.inputfieldNumItems).moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(1);
		await Page.numPad(0);
		await Page.backKey();
		await Page.spotlightDown();
		// change to 5-way mode
		await (Page.buttonLeft).moveTo();
		// 5-way Spot the first item.
		await Page.spotlightRight();
		// Verify: Spotlight displays on the first item.
		await expectFocusedItem(0, 'first item focus');
		// 5-way Up.
		await Page.spotlightUp();
		// Verify: The list *does not* Scroll to the Bottom. 2. Spotlight is on the buttonTop
		expect(await Page.buttonTop.isFocused(), 'button top focus').to.be.true();
		await Page.spotlightDown();
		await expectFocusedItem(0);
		await Page.pageDown();
		await waitUntilFocused(4, 'focus Item 4');
		await Page.fiveWayToItem(9);
		// Click the last item.
		await Page.spotlightSelect();
		// Spotlight is on the last item.
		await browser.pause(1000);
		await expectFocusedItem(9, 'focus Item 9');
		// 5-way Down
		await Page.spotlightDown();
		await Page.spotlightDown(); // 1 extra 5-way down to check Spotlight does not pass buttonBottom when wrap is off.
		await browser.pause(1000);
		// Verify 1. The list *does not* Scroll to the Top. 2. Spotlight stays on the last item.
		// Checking focus is on buttonBottom instead of last item since 5-way Down on last item using this app takes Spotlight to buttonBottom.
		expect(await Page.buttonBottom.isFocused(), 'last item focus').to.be.true();
	});
});
