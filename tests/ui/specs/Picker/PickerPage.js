'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('@enact/ui-test-utils/utils');

class PickerInterface {
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
		return element('..internal_DrumPicker_DrumPicker_drumPicker', this.self);
	}

	decrementer (picker) {
		return element('.internal_DrumPicker_DrumPicker_itemDecrement', picker);
	}

	incrementer (picker) {
		return element('.internal_DrumPicker_DrumPicker_itemIncrement', picker);
	}

	selectedItem (rangePicker) {
		return element('.internal_DrumPicker_DrumPicker_selectedItem', rangePicker);
	}
}

class PickerPage extends Page {
	constructor () {
		super();
		this.title = 'Picker Test';
		const pickerDefault = new PickerInterface('pickerDefault');
		const pickerDisabled = new PickerInterface('pickerDisabled');
		const pickerWithDefaultValue = new PickerInterface('pickerWithDefaultValue');
		this.components = {pickerDefault, pickerDisabled, pickerWithDefaultValue};
	}

	open (urlExtra) {
		super.open('Picker-View', urlExtra);
	}
}

module.exports = new PickerPage();
