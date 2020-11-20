'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element, getText, hasClass} = require('@enact/ui-test-utils/utils');

class AgateRadioItemInterface {
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
		const radioDefault = new AgateRadioItemInterface('radioItem1');
		const radioDefaultSelected = new AgateRadioItemInterface('radioItem2');
		const radioInline = new AgateRadioItemInterface('radioItem3');
		const radioDisabled = new AgateRadioItemInterface('radioItem4');
		const radioInlineDisabled = new AgateRadioItemInterface('radioItem5');

		this.components = {radioDefault, radioDefaultSelected, radioInline, radioDisabled, radioInlineDisabled};
	}

	open (urlExtra) {
		super.open('RadioItem-View', urlExtra);
	}
}

module.exports = new RadioItemPage();
