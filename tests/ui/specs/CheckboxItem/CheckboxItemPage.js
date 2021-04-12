'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class CheckboxItemInterface {
	constructor (id) {
		this.id = id;
		this.marqueeTextSelector = `#${this.id} > div .enact_ui_Marquee_Marquee_text`;
		this.checkboxIconSelector = `#${this.id} > .Item_Item_slotBefore .Checkbox_Checkbox_icon`;
		this.slotBeforeNodeSelector = `#${this.id} >  .Item_Item_slotBefore > div:last-child`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}`));
	}

	get self () {
		return $(`#${this.id}`);
	}
	get value () {
		return $(this.marqueeTextSelector);
	}
	get valueText () {
		return this.value.getText();
	}
	get checkboxIcon () {
		return $(this.checkboxIconSelector);
	}
	get slotBeforeNode () {
		return $(this.slotBeforeNodeSelector);
	}
	get checkboxIconSymbol () {
		return this.checkboxIcon.getText();
	}
	get indeterminateIconSymbol () {
		return $(`#${this.id} .Checkbox_Checkbox_indeterminate`).getText();
	}
	get isChecked () {
		return $(`#${this.id} .Checkbox_Checkbox_selected`).isExisting();
	}
	get isIndeterminate () {
		return $(`#${this.id} .Checkbox_Checkbox_indeterminate`).isExisting();
	}
	get isInline () {
		return $(`#${this.id}.Item_Item_inline`).isExisting();
	}
}

class CheckboxItemPage extends Page {
	constructor () {
		super();
		this.title = 'CheckboxItem Test';
		const checkboxItemDefault = new CheckboxItemInterface('checkboxItem1');
		const checkboxItemDefaultSelected = new CheckboxItemInterface('checkboxItem2');
		const checkboxItemIndeterminate = new CheckboxItemInterface('checkboxItem3');
		const checkboxItemSlotBefore = new CheckboxItemInterface('checkboxItem4');
		const checkboxItemInline = new CheckboxItemInterface('checkboxItem5');
		const checkboxItemInlineIndeterminate = new CheckboxItemInterface('checkboxItem6');
		const checkboxItemDisabled = new CheckboxItemInterface('checkboxItem7');

		this.components = {
			checkboxItemDefault,
			checkboxItemDefaultSelected,
			checkboxItemIndeterminate,
			checkboxItemSlotBefore,
			checkboxItemInline,
			checkboxItemInlineIndeterminate,
			checkboxItemDisabled
		};
	}

	open (urlExtra) {
		super.open('CheckboxItem-View', urlExtra);
		this.delay(1000);
	}
}

module.exports = new CheckboxItemPage();
