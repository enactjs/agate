const Page = require('./VirtualGridListPage'),
	{expectFocusedItem, waitUntilFocused, waitUntilVisible, expectNoFocusedItem} = require('../VirtualList-utils');

describe('VirtualGridList', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should meet initial conditions', async function () {
		expect(await Page.buttonHideScrollbar.isFocused(), 'focus').to.be.true();
	});

	describe('LTR locale', function () {
		it('should focus first item on first focus', async function () {
			await Page.spotlightDown();
			await Page.spotlightDown();
			await expectFocusedItem(0);
		});
	});
});

describe('Focus after calling scrollTo()', function () {
	beforeEach(async function () {
		await Page.open('ScrollTo');
	});

	it('should focus after calling scrollTo()', async function () {
		// wait for view open.
		await waitUntilFocused(0);
		// Press Page Down a few times until 'Click me' item  is visible.
		await Page.checkScrollbyPagekey('down');
		await Page.checkScrollbyPagekey('down');
		await Page.checkScrollbyPagekey('down');
		// Set to pointer mode.
		// Hover the 'Click me' item.
		await Page.showPointerByKeycode();
		await (await Page.item(20)).moveTo();
		// Click 'Click me' item.
		await (await Page.item(20)).click();
		await browser.pause(500);
		// Verify: list is scrolled to first item.
		expect(await Page.topLeftVisibleItemId()).to.equal('item0');
		// Verify: There is no spotlight on any item.
		await expectNoFocusedItem();
		// Press 5-way Left.
		// Verify: Set to 5-way mode.
		await Page.hidePointerByKeycode();
		await Page.spotlightLeft();
		// Verify: Spotlight on item0.
		await expectFocusedItem(0);
		// Press 5-way down 5 times.
		for (let i = 1; i < 6; i++) {
			await Page.spotlightDown();
			await waitUntilFocused(i * 4);
			await waitUntilVisible(i * 4);
		}
		await browser.pause(500);
		// Press 5-way OK.
		await Page.spotlightSelect();

		await browser.pause(1000);

		// Verify: list is scrolled to first item.
		expect(await Page.topLeftVisibleItemId()).to.equal('item0');
		// Verify: Spotlight on item0.
		await expectFocusedItem(0);
	});
});
