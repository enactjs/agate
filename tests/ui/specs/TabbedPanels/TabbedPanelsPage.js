'use strict';
const {Page, element} = require('@enact/ui-test-utils/utils');

class TabbedPanelsInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	get self () {
		return $(`#${this.id}`);
	}

	async focusTab (index) {
		return browser.execute((el) => el.focus(), await this.tab(index));
	}

	async focusPrevButton () {
		return browser.execute((el) => el.focus(), await this.previousButton());
	}

	async focusNextButton () {
		return browser.execute((el) => el.focus(), await this.nextButton());
	}

	tab (index) {
		return element(`.TabGroup_TabGroup_tab[data-index="${index}"]`, this.self);
	}

	selectedTab () {
		return element(`.TabGroup_TabGroup_selected`, this.self);
	}

	previousButton () {
		return $(this.selector + ' .previousButton');
	}

	nextButton () {
		return $(this.selector + ' .nextButton');
	}
}

class TabbedPanelsPage extends Page {
	constructor () {
		super();
		this.title = 'TabbedPanels Test';
		const tabbedPanels = new TabbedPanelsInterface('tabbedPanels');

		this.components = {tabbedPanels};
	}

	async open (urlExtra) {
		await super.open('TabbedPanels-View', urlExtra);
	}
}

module.exports = new TabbedPanelsPage();
