'use strict';
const {getText, Page} = require('@enact/ui-test-utils/utils');

class TabGroupInterface {
	constructor (className) {
		this.className = className;
		this.selector = `.${this.className}`;
	}

	async focusTab (index) {
		return browser.execute((el) => el.focus(), await this.focusableTabs(index));
	}

	get self () {
		return $(this.selector);
	}
	focusableTabs (index) {
		return $(this.selector + ` .TabGroup_TabGroup_tab:nth-child(${index})`);
	}
	async iconValue (index) {
		return (await getText($(this.selector + ` .TabGroup_TabGroup_tab:nth-child(${index}) .Icon_Icon_icon`))).codePointAt();
	}
	get previousButton () {
		return $(this.selector + ' .previousButton').isExisting();
	}
	get nextButton () {
		return $(this.selector + ' .nextButton').isExisting();
	}
	get tabAfter () {
		return $(this.selector + ' .LabeledIcon_LabeledIcon_above').isExisting();
	}
	get verticalOrientation () {
		return $('.TabGroup_TabGroup_vertical').isExisting();
	}
}

class TabGroupPage extends Page {
	constructor () {
		super();
		this.title = 'TabGroup Test';
		const tabGroupDefault = new TabGroupInterface('tabGroupDefault');
		const tabGroupSlotBeforeAfter = new TabGroupInterface('tabGroupSlotBeforeAfter');
		const tabGroupTabAfter = new TabGroupInterface('tabGroupTabPositionAfter');
		const tabGroupVertical = new TabGroupInterface('tabGroupVertical');

		this.components = {tabGroupDefault, tabGroupSlotBeforeAfter, tabGroupTabAfter, tabGroupVertical};
	}

	async open (urlExtra) {
		await super.open('TabGroup-View', urlExtra);
	}
}

module.exports = new TabGroupPage();
