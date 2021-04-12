'use strict';
const {element, getText, Page} = require('@enact/ui-test-utils/utils');

class SwitchItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}`));
	}

	get self () {
		return $(`#${this.id}`);
	}
	get textContent () {
		return getText(element('.Item_Item_content', this.self));
	}
	get isSelected () {
		return element('.Switch_Switch_selected', this.self).isExisting();
	}
	get isInline () {
		return $(`#${this.id}.Item_Item_inline`).isExisting();
	}
}

class SwitchItemPage extends Page {
	constructor () {
		super();
		this.title = 'SwitchItem Test';
		const switchItemDefault = new SwitchItemInterface('switchItem1');
		const switchItemDefaultSelected = new SwitchItemInterface('switchItem2');
		const switchItemInline = new SwitchItemInterface('switchItem3');
		const switchItemDisabled = new SwitchItemInterface('switchItem4');
		const switchItemInlineDisabled = new SwitchItemInterface('switchItem5');

		this.components = {switchItemDefault, switchItemDefaultSelected, switchItemInline, switchItemDisabled, switchItemInlineDisabled};
	}

	open (urlExtra) {
		super.open('SwitchItem-View', urlExtra);
	}
}

module.exports = new SwitchItemPage();
