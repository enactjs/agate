const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('Disabled item', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should navigate disabled and enabled items', async function () {
		// Uncheck the "Native Scrolling" Checkbox item.
		// Set translate ScrollMode.
		await (Page.buttonNativeScroll).moveTo();
		await Page.spotlightSelect();
		// Click on DisabledItems CheckboxItem.(DisabledItem Button for this test.)
		await (Page.buttonDisabledItem).moveTo();
		await Page.spotlightSelect();
		// 5-way Spot the first item ('Item 000').
		await (Page.buttonLeft).moveTo();
		await Page.spotlightRight();
		await expectFocusedItem(0);
		// 5-way Down several times to the next enabled item.
		// Verify: Spotlight displays on each Item (Disabled and Enabled) as the list scrolls up.
		let index = 1;
		for (; index < 15; index++) {
			await Page.fiveWayToItem(index);
			expect(await Page.itemDisabled()).to.be.true();
		}
		await Page.fiveWayToItem(index);
		expect(await Page.itemDisabled()).to.be.false();
		// Spotlight displays on the next Enabled item.
		await expectFocusedItem(15);
		// 5-way Up several times to the previous enabled item.
		// Spotlight displays on each Item (Disabled and Enabled) as the list scrolls down.
		for (index = 14; index > 0; index--) {
			await Page.fiveWayToItem(index);
			expect(await Page.itemDisabled()).to.be.true();
		}
		await Page.fiveWayToItem(index);
		expect(await Page.itemDisabled()).to.be.false();
		// Spotlight displays on the previous Enabled item.
		await expectFocusedItem(0);
	});

	it('should navigate disabled and enabled items with native scrollmode', async function () {
		// Toggle on DisabledItems.(DisabledItem Button for this test.)
		await (Page.buttonDisabledItem).moveTo();
		await Page.spotlightSelect();
		// 5-way Spot the first item ('Item 000').
		await (Page.buttonLeft).moveTo();
		await Page.spotlightRight();
		await expectFocusedItem(0);
		// 5-way Down several times to the next enabled item.
		let index = 1;
		for (; index < 15; index++) {
			await Page.fiveWayToItem(index);
			expect(await Page.itemDisabled()).to.be.true();
		}
		await Page.fiveWayToItem(index);
		expect(await Page.itemDisabled()).to.be.false();
		// Spotlight displays on the next Enabled item.
		await expectFocusedItem(15);
		// 5-way Up several times.
		for (index = 14; index > 0; index--) {
			await Page.fiveWayToItem(index);
			expect(await Page.itemDisabled()).to.be.true();
		}
		await Page.fiveWayToItem(index);
		expect(await Page.itemDisabled()).to.be.false();
		// Spotlight displays on the previous Enabled item.
		await expectFocusedItem(0);
	});
});
