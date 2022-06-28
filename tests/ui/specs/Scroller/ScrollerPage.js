'use strict';
const {componentSelector, element, Page} = require('@enact/ui-test-utils/utils');

const scrollbarSelector = '.enact_ui_useScroll_ScrollbarTrack_scrollbarTrack';

class ScrollerPage extends Page {

	constructor () {
		super();
		this.title = 'Scroller Test';
	}

	async open (layout = '', urlExtra) {
		await super.open(`Scroller${layout}-View`, urlExtra);
	}

	// button api
	get button1 () {
		return element('#Page_1_Button', browser);
	}

	get button2 () {
		return element('#Page_2_Button', browser);
	}

	get button3 () {
		return element('#Page_3_Button', browser);
	}

	get buttonTop () {
		return element('#top', browser);
	}

	get buttonHideScrollbar () {
		return element('#hideScrollbar', browser);
	}

	get buttonNativeScroll () {
		return element('#nativeScroll', browser);
	}

	async button (text) {
		return await element(
			`${componentSelector({component: 'Button'})}[aria-label="${text}"]`,
			await browser
		);
	}

	// dropdown api
	get dropdownFocusableScrollbar () {
		return element('#focusableScrollbarKnobs', browser);
	}

	async getScrollThumbPosition () {
		return await browser.execute(function (_scrollbarSelector) {
			const scrollbar = document.querySelectorAll(_scrollbarSelector);
			return {
				vertical: scrollbar[0].style.getPropertyValue('--scrollbar-thumb-progress-ratio'),
				horizontal: scrollbar[1].style.getPropertyValue('--scrollbar-thumb-progress-ratio')
			};
		}, scrollbarSelector);
	}
}

module.exports = new ScrollerPage();
