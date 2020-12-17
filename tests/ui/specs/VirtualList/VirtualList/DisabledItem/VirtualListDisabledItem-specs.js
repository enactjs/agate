const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('Disabled item', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should navigate disabled and enabled items', function () {
		// Uncheck the "Native Scrolling" Checkbox item.
		// Set translate ScrollMode.
		Page.buttonNativeScroll.moveTo();
		Page.spotlightSelect();
		// Click on DisabledItems CheckboxItem.(DisabledItem Button for this test.)
		Page.buttonDisabledItem.moveTo();
		Page.spotlightSelect();
		// 5-way Spot the first item ('Item 000').
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		expectFocusedItem(0);
		// 5-way Down several times to the next enabled item.
		// Verify: Spotlight displays on each Item (Disabled and Enabled) as the list scrolls up.
		let index = 1;
		for (; index < 15; index++) {
			Page.fiveWayToItem(index);
			expect(Page.itemDisabled()).to.be.true();
		}
		Page.fiveWayToItem(index);
		expect(Page.itemDisabled()).to.be.false();
		// Spotlight displays on the next Enabled item.
		expectFocusedItem(15);
		// 5-way Up several times to the previous enabled item.
		// Spotlight displays on each Item (Disabled and Enabled) as the list scrolls down.
		for (index = 14; index > 0; index--) {
			Page.fiveWayToItem(index);
			expect(Page.itemDisabled()).to.be.true();
		}
		Page.fiveWayToItem(index);
		expect(Page.itemDisabled()).to.be.false();
		// Spotlight displays on the previous Enabled item.
		expectFocusedItem(0);
	});

	it('should navigate disabled and enabled items with native scrollmode [GT-29035]', function () {
		// Toggle on DisabledItems.(DisabledItem Button for this test.)
		Page.buttonDisabledItem.moveTo();
		Page.spotlightSelect();
		// 5-way Spot the first item ('Item 000').
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		expectFocusedItem(0);
		// 5-way Down several times to the next enabled item.
		let index = 1;
		for (; index < 15; index++) {
			Page.fiveWayToItem(index);
			expect(Page.itemDisabled()).to.be.true();
		}
		Page.fiveWayToItem(index);
		expect(Page.itemDisabled()).to.be.false();
		// Spotlight displays on the next Enabled item.
		expectFocusedItem(15);
		// 5-way Up several times.
		for (index = 14; index > 0; index--) {
			Page.fiveWayToItem(index);
			expect(Page.itemDisabled()).to.be.true();
		}
		Page.fiveWayToItem(index);
		expect(Page.itemDisabled()).to.be.false();
		// Spotlight displays on the previous Enabled item.
		expectFocusedItem(0);
	});
});
