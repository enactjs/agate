const Page = require('./VirtualListPage'),
	{expectFocusedItem, expectNoFocusedItem, waitUntilFocused} = require('../VirtualList-utils');

describe('VirtualList', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should meet initial conditions', async function () {
		expect(await Page.buttonHideScrollbar.isFocused()).to.be.true();
	});

	describe('LTR locale', function () {
		it('should focus first item on first focus', async function () {
			await Page.buttonLeft.moveTo();
			await Page.spotlightRight();
			await expectFocusedItem(0);
		});

		it('should position Scrollbar Track on right side in LTR', async function () {
			expect((await Page.getListRect()).right < (await Page.getVerticalScrollbarRect()).right).to.be.true();
		});

		it('should position Scroll thumb on top/bottom when reaching to the edge with 5-way and Page Down', async function () {
			// set dataSize to 30
			await Page.inputfieldNumItems.moveTo();
			await Page.spotlightSelect();
			await Page.backSpace();
			await Page.backSpace();
			await Page.backSpace();
			await Page.numPad(3);
			await Page.numPad(0);
			await Page.backKey();
			await Page.spotlightDown();
			// Move focus to the first item ('Item 00').
			await Page.buttonLeft.moveTo();
			await Page.spotlightRight();
			// Verify Spotlight displays on the first item.
			await expectFocusedItem(0, 'focus Item 0');
			// Verify Scroll thumb's position appears shortly at the top of the Scrollbar track.
			expect(await Page.getScrollThumbPosition(), 'Up').to.be.equal('0');
			// Press Page Down.
			await Page.pageDown();
			// Verify Spotlight hides.
			await expectNoFocusedItem();
			await waitUntilFocused(4, 'focus Item 4');
			// Press Page Down.
			await Page.pageDown();
			// Verify Spotlight hides.
			await expectNoFocusedItem();
			await waitUntilFocused(8, 'focus Item 8');
			// 5-way Down several times to scroll down the list.
			await Page.fiveWayToItem(20);
			// 5-way Spot the last item.
			await Page.fiveWayToItem(29);
			// Verify Spotlight displays on the last item.
			await waitUntilFocused(29, 'focus last Item');
			await browser.pause(1000);
			// Verify Scroll thumb's position appears shortly at the bottom of the Scrollbar track.
			expect(await Page.getScrollThumbPosition(), 'Down').to.be.equal('1');
			// 5-way Spot the first item.
			await Page.pageUp();
			await waitUntilFocused(25, 'focus Item 23');
			await Page.pageUp();
			await waitUntilFocused(21, 'focus Item 21');
			await Page.pageUp();
			await waitUntilFocused(17, 'focus Item 17');
			await Page.pageUp();
			await waitUntilFocused(13, 'focus Item 13');
			await Page.pageUp();
			await waitUntilFocused(9, 'focus Item 9');
			await Page.pageUp();
			await waitUntilFocused(5, 'focus Item 5');
			await Page.pageUp();
			// Verify Spotlight displays on the first item.
			await waitUntilFocused(0, 'focus Item 0');
			// Verify Scroll thumb's position appears shortly at the top of the Scrollbar track.
			expect(await Page.getScrollThumbPosition(), 'Up').to.be.equal('0');
		});

		it('should Items Animate via 5-way Up and Down on Last Item on the page - vertical', async function () {
			let bottomId;
			await Page.buttonLeft.moveTo();
			await Page.spotlightRight(); // needed to focus Item 00 and get into that container
			// Position the pointer on the last item in a current page.
			bottomId = await Page.bottomVisibleItemId();
			await (await Page.item(bottomId)).moveTo();
			// Verify Spotlight displays on the item.
			await browser.pause(1000); // needed to run on mpc
			await expectFocusedItem(Number(((await Page.bottomVisibleItemId()).slice(4))), 'focus bottomId');
			// 5-way Down to the item below the last item on the current page.
			await Page.spotlightDown();
			// Verify The list Scrolled Up.  2 The Spotted item is placed on the Bottom.
			await browser.pause(1000); // needed to run on mpc
			await expectFocusedItem(Number(((await Page.bottomVisibleItemId()).slice(4))), 'focus bottomId');
			// 5-way Up to the previous item.
			await Page.spotlightUp();
			// Verify The list *does not* Scroll Down.
			// Check the bottomVisibleItem is still the same as the one before 5-way Up to check the list did not scroll Down
			expect(Number(bottomId.slice(4)) === ((Number(((await Page.bottomVisibleItemId()).slice(4))))) - 1).to.be.true();
			// Verify  The Spotted item is placed above the item on the Bottom.
			await expectFocusedItem(Number((bottomId.slice(4))), 'focus bottomId');
			// 5-way Up to the first item ('*Item 000*').
			await Page.fiveWayToItem(0);
			// Verify The list Scroll Down  and the spotted item is placed on the Top.
			await expectFocusedItem(Number(((await Page.topVisibleItemId()).slice(4))), 'focus Item 00');
			await expectFocusedItem(0, 'focus Item 00');  // to double check it is really top item
		});

		it('should navigate between inside and outside of a list', async function () {
			// 5-way Down to the 10th item.
			await Page.buttonLeft.moveTo();
			await Page.spotlightRight();
			await Page.fiveWayToItem(10);
			// 5-way Spot Item 00.
			await Page.fiveWayToItem(0);
			// Verify: Spotlight displays on Item 00.
			await expectFocusedItem(0);
			await Page.delay(500);
			// 5-way Up. Verify Spotlight displays on the Top button.
			await Page.spotlightUp();
			expect(await Page.buttonTop.isFocused()).to.be.true();
		});

		it('should focus last item when entering from outside after scrolling via 5way', async function () {
			// Move focus to the first item ('Item 00').
			await Page.buttonLeft.moveTo();
			await Page.spotlightRight();

			// 5-way Down to the 21st item ('Item 20').
			await Page.fiveWayToItem(20);

			// Position the pointer on 'JumpToItem' button and select
			await Page.buttonTop.moveTo();
			await Page.spotlightSelect();

			// Move focus to the list
			await Page.buttonLeft.moveTo();
			await Page.spotlightRight();

			// Verify Spotlight displays on the 21st item ('Item 20');
			await expectFocusedItem(20);
		});

		it('should  display childProps', async function () {
			// Verify: The first item shows 'Item 00'.
			await Page.buttonLeft.moveTo();
			await Page.spotlightRight();
			await expectFocusedItem(0);
			expect(await Page.textContent()).to.equal('Item 00');
			// Verify: The second item shows 'Item 01'.
			await Page.spotlightDown();
			await expectFocusedItem(1);
			expect(await Page.textContent()).to.equal('Item 01');
			// 5-way Spot and Select 'Child Props' toggle button.
			await Page.buttonChildProps.click();
			// Verify: The first item shows 'Item 000 child props'.
			await (await Page.item(0)).moveTo();
			await expectFocusedItem(0);
			expect(await Page.textContent()).to.equal('Item 00 child props');
			// Verify The second item shows 'Item 001 child props'.
			await Page.spotlightDown();
			await expectFocusedItem(1);
			expect(await Page.textContent()).to.equal('Item 01 child props');
		});

		it('should change spotlight size when item`s size changing', async function () {
			// Verify: The default value for the 'itemSize' knob is itemSizeValue.
			const defaultItemSize = await Page.getItemSize();
			await (await Page.buttonLeft).moveTo();
			await Page.spotlightRight();
			const defaultSpotlightSize = await Page.spotlightSize();
			expect(defaultSpotlightSize).to.equal(94);
			// Set item size to 150
			await Page.inputfieldItemSize.moveTo();
			await Page.spotlightSelect();
			await Page.backSpace();
			await Page.backSpace();
			await Page.backSpace();
			await Page.numPad(1);
			await Page.numPad(5);
			await Page.numPad(0);
			await Page.backKey();
			// Verify item size
			const curItemSize = await Page.getItemSize();
			expect(curItemSize.height).to.equal(150);
			expect(curItemSize.width).to.equal(defaultItemSize.width);
			await Page.spotlightDown();
			await (await Page.item(2)).moveTo();
			await expectFocusedItem(2);
			const curSpotlightSize = await Page.spotlightSize();
			// spotLight size is ItemSize - 2*border-witdth
			expect(curSpotlightSize).to.equal(144);
			// Set item size to 50
			await Page.inputfieldItemSize.moveTo();
			await Page.spotlightSelect();
			await Page.backSpace();
			await Page.backSpace();
			await Page.backSpace();
			await Page.numPad(5);
			await Page.numPad(0);
			await Page.backKey();
			// Verify item size
			const newItemSize = await Page.getItemSize();
			expect(newItemSize.height).to.equal(50);
			expect(newItemSize.width).to.equal(defaultItemSize.width);
			await Page.spotlightDown();
			await (await Page.item(3)).moveTo();
			await expectFocusedItem(3);
			const newSpotlightSize = await Page.spotlightSize();
			expect(newSpotlightSize).to.equal(44);
		});


		it('should have 96px padding for the top and bottom of the scrollbarTrack', async function () {
			// Verify: The scrollbar size fit to the size of the list.
			expect((await Page.getListRect()).height).to.equal((await Page.getVerticalScrollbarRect()).height);
			// There is a button with size=small at the top and bottom
			// Check top
			expect((await Page.getVerticalScrollbarTrackRect()).top - (await Page.getVerticalScrollbarRect()).top).to.equal(48);
			// Check bottom
			expect((await Page.getVerticalScrollbarRect()).bottom - (await Page.getVerticalScrollbarTrackRect()).bottom).to.equal(48);
		});
	});
});
