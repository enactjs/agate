'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('@enact/ui-test-utils/utils');

class AgatePickerInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}>div`));
	}

	get self () {
		return $(`#${this.id}`, browser);
	}

	get picker () {
		return element('.internal_Picker_Picker_picker', this.self);
	}

	decrementer (picker) {
		return element('.internal_Picker_Picker_itemDecrement', picker);
	}

	incrementer (picker) {
		return element('.internal_Picker_Picker_itemIncrement', picker);
	}

	active (picker) {
		return element('.internal_Picker_Picker_active', picker);
	}
}

class PickerPage extends Page {
	constructor () {
		super();
		this.title = 'Picker Test';
		const pickerDefault = new AgatePickerInterface('pickerDefault');
		const pickerDisabled = new AgatePickerInterface('pickerDisabled');
		const pickerWithDefaultValue = new AgatePickerInterface('pickerWithDefaultValue');
		this.components = {pickerDefault, pickerDisabled, pickerWithDefaultValue};
	}

	open (urlExtra) {
		super.open('Picker-View', urlExtra);
	}
}

module.exports = new PickerPage();
