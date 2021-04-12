'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element, getText, hasClass} = require('@enact/ui-test-utils/utils');

class RadioItemInterface {
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
		return hasClass('RadioItem_RadioItem_selected', this.self);
	}
	get isInline () {
		return $(`#${this.id}.Item_Item_inline`).isExisting();
	}
}


class RadioItemPage extends Page {
	constructor () {
		super();
		this.title = 'RadioItem Test';
		const radioDefault = new RadioItemInterface('radioItem1');
		const radioDefaultSelected = new RadioItemInterface('radioItem2');
		const radioInline = new RadioItemInterface('radioItem3');
		const radioDisabled = new RadioItemInterface('radioItem4');
		const radioInlineDisabled = new RadioItemInterface('radioItem5');

		this.components = {radioDefault, radioDefaultSelected, radioInline, radioDisabled, radioInlineDisabled};
	}

	open (urlExtra) {
		super.open('RadioItem-View', urlExtra);
		this.delay(1000);
	}
}

module.exports = new RadioItemPage();
