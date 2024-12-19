'use strict';
const {getText, Page} = require('@enact/ui-test-utils/utils');

class SwitchItemInterface {
	constructor (id) {
		this.id = id;
	}

	async focus () {
		return browser.execute((el) => el.focus(), await $(`#${this.id}`));
	}

	get self () {
		return $(`#${this.id}`);
	}
	get textContent () {
		return getText($(`#${this.id} .Item_Item_content`));
	}
	get isSelected () {
		return $(`#${this.id} .Switch_Switch_selected`).isExisting();
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

	async open (urlExtra) {
		await super.open('SwitchItem-View', urlExtra);
	}
}

module.exports = new SwitchItemPage();
