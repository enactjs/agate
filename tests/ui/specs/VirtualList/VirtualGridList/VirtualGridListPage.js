'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const scrollableSelector = '.enact_ui_useScroll_useScroll_scroll';
const scrollbarSelector = '.enact_ui_useScroll_ScrollbarTrack_scrollbarTrack';

class VirtualGridListPage extends Page {

	constructor () {
		super();
		this.title = 'VirtualGridList Test';
	}

	async open (layout = '', urlExtra) {
		await super.open(`VirtualGridList${layout}-View`, urlExtra);
	}

	get buttonHideScrollbar () {
		return element('#hideScrollbar', browser);
	}

	async scrollThumbPosition () {
		return await browser.execute(async function (_scrollbarSelector) {
			const scrollbar = document.querySelector(_scrollbarSelector);
			return scrollbar.style.getPropertyValue('--scrollbar-thumb-progress-ratio');
		}, scrollbarSelector);
	}

	async item (id) {
		return await element(`#${typeof id === 'number' ? `item${id}` : id}`, await browser);
	}

	async topLeftVisibleItemId () {
		return await browser.execute(async function (_scrollableSelector) {
			const scroller = document.querySelector(_scrollableSelector),
				{top, left} = await scroller.getBoundingClientRect();
			let currentY = top + 1;
			for (let i = 0; i < 10; i++) {
				let el = document.elementFromPoint(left + 10, currentY + i);
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

	async checkScrollbyPagekey (way) {
		const initialThumbPosition = await this.scrollThumbPosition();
		if (way === 'down') {
			await this.pageDown();
			await browser.pause(1000);
			expect(((await this.scrollThumbPosition()) > initialThumbPosition)).toBe(true);
		} else {
			await this.pageUp();
			await browser.pause(1000);
			expect((initialThumbPosition > (await this.scrollThumbPosition()))).toBe(true);
		}
	}
}

module.exports = new VirtualGridListPage();
