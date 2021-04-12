'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const scrollableSelector = '.enact_ui_useScroll_useScroll_scroll';
const scrollbarSelector = '.enact_ui_useScroll_ScrollbarTrack_scrollbarTrack';

class VirtualGridListPage extends Page {

	constructor () {
		super();
		this.title = 'VirtualGridList Test';
	}

	open (layout = '', urlExtra) {
		super.open(`VirtualGridList${layout}-View`, urlExtra);
		this.delay(1000);
	}

	get buttonHideScrollbar () {
		return element('#hideScrollbar', browser);
	}

	scrollThumbPosition () {
		return browser.execute(function (_scrollbarSelector) {
			const scrollbar = document.querySelector(_scrollbarSelector);
			return scrollbar.style.getPropertyValue('--scrollbar-thumb-progress-ratio');
		}, scrollbarSelector);
	}

	item (id) {
		return element(`#${typeof id === 'number' ? `item${id}` : id}`, browser);
	}

	topLeftVisibleItemId () {
		return browser.execute(function (_scrollableSelector) {
			const scroller = document.querySelector(_scrollableSelector),
				{top, left} = scroller.getBoundingClientRect();
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

	checkScrollbyPagekey (way) {
		const initialThumbPosition = this.scrollThumbPosition();
		if (way === 'down') {
			this.pageDown();
			this.delay(1000);
			expect((this.scrollThumbPosition() > initialThumbPosition)).to.be.true();
		} else {
			this.pageUp();
			this.delay(1000);
			expect((initialThumbPosition > this.scrollThumbPosition())).to.be.true();
		}
	}
}

module.exports = new VirtualGridListPage();
