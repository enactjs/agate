'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element, getText, hasClass} = require('@enact/ui-test-utils/utils');

class AgatePickerInterface {
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
		return hasClass('Picker_Picker_selected', this.self);
	}
}


class AgatePickerPage extends Page {
	constructor () {
		super();
		this.title = 'Agate Picker Test';
		const pickerDefault = new AgatePickerInterface('picker1');
		const pickerDefaultSelected = new AgatePickerInterface('picker2');
		this.components = {pickerDefault, pickerDefaultSelected};
	}

	open (urlExtra) {
		super.open('Agate-Picker-View', urlExtra);
	}
}

module.exports = new AgatePickerPage();
