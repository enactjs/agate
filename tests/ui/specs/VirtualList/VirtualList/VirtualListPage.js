'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const {focusedElement, waitUntilFocused, waitUntilVisible} = require('../VirtualList-utils');

const listItemSelector = '.enact_ui_VirtualList_VirtualList_listItem';
const scrollableSelector = '.enact_ui_useScroll_useScroll_scroll';
const scrollbarSelector = '.enact_ui_useScroll_ScrollbarTrack_scrollbarTrack';
const scrollContentSelector = '.enact_ui_useScroll_useScroll_scrollContentWrapper';
const scrollThumbSelector = '.enact_ui_useScroll_ScrollbarTrack_scrollbarTrack:before';
const verticalScrollbarSelector = '.useScroll_Scrollbar_vertical';
const verticalScrollbarTrackSelector = '.enact_ui_useScroll_ScrollbarTrack_vertical';

class VirtualListPage extends Page {

	constructor () {
		super();
		this.title = 'VirtualList Test';
	}

	async open (layout = '', urlExtra) {
		await super.open(`VirtualList${layout}-View`, urlExtra);
	}


	get buttonHideScrollbar () {
		return element('#hideScrollbar', browser);
	}

	get buttonTop () {
		return element('#top', browser);
	}

	get buttonLeft () {
		return element('#left', browser);
	}

	get buttonRight () {
		return element('#right', browser);
	}

	get buttonBottom () {
		return element('#bottom', browser);
	}

	get buttonWrap () {
		return element('#wrap', browser);
	}

	get buttonDisabledItem () {
		return element('#disabled', browser);
	}

	get buttonChildProps () {
		return element('#hasChildProps', browser);
	}

	get buttonNativeScroll () {
		return element('#nativeScroll', browser);
	}

	get inputfieldNumItems () {
		return element('#numItems', browser);
	}

	get inputfieldItemSize () {
		return element('#itemSize', browser);
	}

	async getVerticalScrollbarRect () {
		return await browser.execute(async function (_verticalScrollbarSelector) {
			return (await document.querySelector(_verticalScrollbarSelector)).getBoundingClientRect();
		}, verticalScrollbarSelector);
	}

	async getVerticalScrollbarTrackRect () {
		return await browser.execute(async function (_verticalScrollbarTrackSelector) {
			return (await document.querySelector(_verticalScrollbarTrackSelector)).getBoundingClientRect();
		}, verticalScrollbarTrackSelector);
	}

	// scrollThumb api
	get scrollThumb () {
		return $(`${scrollThumbSelector}`);
	}

	async getScrollThumbPosition () {
		return await browser.execute(async function (_scrollbarSelector) {
			const scrollbar = await document.querySelector(_scrollbarSelector);
			return scrollbar.style.getPropertyValue('--scrollbar-thumb-progress-ratio');
		}, scrollbarSelector);

	}

	async getListRect () {
		return browser.execute(function (_scrollContentSelector) {
			return document.querySelector(_scrollContentSelector).getBoundingClientRect();
		}, scrollContentSelector);
	}

	// item api
	async item (id) {
		return await element(`#${typeof id === 'number' ? `item${id}` : id}`, await browser);
	}

	async topVisibleItemId () {
		return await browser.execute(async function (_scrollableSelector) {
			const scroller = await document.querySelector(_scrollableSelector),
				{top, left, width} = (await scroller).getBoundingClientRect();
			let currentY = top + 1,
				middle = left + Math.floor((left + width) / 2);
			for (let i = 0; i < 10; i++) {
				let el = await document.elementFromPoint(middle, currentY + i);
				// Search parents for the row ID
				while (el && el !== scroller && el !== document.body) {
					if (el.id) {
						return el.id;
					} else {
						el = el.parentNode;
					}
				}
				// else, it's inside the list itself, increment y and try again
			}
			return 'unknown';
		}, scrollableSelector);
	}

	async bottomVisibleItemId () {
		return await browser.execute(async function (_scrollableSelector) {
			const scroller = await document.querySelector(_scrollableSelector),
				{bottom, left, width} = (await scroller).getBoundingClientRect();
			// affordance space to draw the bottom shadow. affordanceSize is 48 for 4k and 24 for FHD.
			const affordanceSize = 24;
			let currentY = bottom - affordanceSize - 1,
				middle = left + Math.floor((left + width) / 2);

			for (let i = 0; i < 10; i++) {
				let el = await document.elementFromPoint(middle, currentY - i);

				// Search parents for the row ID
				while (el && el !== scroller && el !== document.body) {
					if (el.id) {
						return el.id;
					} else {
						el = el.parentNode;
					}
				}
				// else, it's inside the list itself, decrement y and try again
			}
			return 'unknown';
		}, scrollableSelector);
	}

	async getItemSize () {
		return await browser.execute(async function (_listItemSelector) {
			const itemContent = await document.querySelector(_listItemSelector);
			const itemHeight = (await itemContent.getBoundingClientRect()).height;
			const itemWidth = (await itemContent.getBoundingClientRect()).width;
			return {
				height: itemHeight,
				width: itemWidth
			};
		}, listItemSelector);
	}

	async itemDisabled () {
		return await browser.execute(async function () {
			return (await document.activeElement).getAttribute('aria-disabled') === 'true';
		});
	}

	async textContent () {
		return await browser.execute(async function () {
			return (await document.activeElement).innerText.split('\n')[0];
		});
	}

	async spotlightSize () {
		return await browser.execute(async function () {
			return document.activeElement.clientHeight;
		});
	}

	// key input api
	async fiveWayToItem (itemNum) {
		const currentItem = Number(await (await focusedElement()).slice(4));
		expect(Number.isNaN(currentItem), 'Not focused to an item').to.be.false();

		const direction = currentItem < itemNum ? 1 : -1;

		for (let i = currentItem; i !== itemNum; i = i + direction) {
			if (direction > 0) {
				await this.spotlightDown();
			} else {
				await this.spotlightUp();
			}
			await waitUntilFocused(i + direction);
			await waitUntilVisible(i + direction);
		}
	}

	async checkScrollbyPagekey (way) {
		const initialThumbPosition = await this.getScrollThumbPosition();
		if (way === 'down') {
			await this.pageDown();
			await browser.pause(1000);
			expect(await (await this.getScrollThumbPosition() > initialThumbPosition)).to.be.true();
		} else {
			await this.pageUp();
			await browser.pause(1000);
			expect(await (initialThumbPosition > await this.getScrollThumbPosition())).to.be.true();
		}
	}

	backSpace () {
		return this.keyDelay('Backspace');
	}

	numPad (num) {
		let Inputnum = 'numpad' + String(num);
		return this.keyDelay(Inputnum);
	}
}

module.exports = new VirtualListPage();
