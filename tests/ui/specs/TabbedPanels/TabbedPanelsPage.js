'use strict'
const {hasClass, Page, element, getText} = require('@enact/ui-test-utils/utils');

class TabbedPanelsInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	get self () {
		return $(`#${this.id}`);
	}

	async focusTab (index) {
		return browser.execute((el) => el.focus(), await this.item(index));
	}

	item (index) {
		return element(`.TabGroup_TabGroup_tab[data-index="${index}"]`, this.self);
	}

	selectedTab () {
		return element(`.TabGroup_TabGroup_selected`, this.self);
	}

	textContent () {
		return getText(element('.enact_ui_Marquee_Marquee_text', this.self));
	}

	isTabSelected (index) {
		return hasClass(`.TabGroup_TabGroup_selected[data-index="${index}"]`, this.self);
	}
	async isSelectedTab (number) {
		return await hasClass('selected', $$('.TabGroup_TabGroup_tab')[number]);
	}
}

class TabbedPanelsPage extends Page {
	constructor () {
		super();
		this.title = 'TabbedPanels Test';
		const tabbedPanels = new TabbedPanelsInterface('tabbedPanels');

		this.components = {tabbedPanels};
	}

	async open(urlExtra) {
		await super.open('TabbedPanels-View', urlExtra);
	}
}

module.exports = new TabbedPanelsPage();
