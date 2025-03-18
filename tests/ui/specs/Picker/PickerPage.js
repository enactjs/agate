'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('@enact/ui-test-utils/utils');

class PickerInterface {
	constructor (id) {
		this.id = id;
	}

	async focus () {
		return browser.execute((el) => el.focus(), await $(`#${this.id}>div`));
	}

	get self () {
		return $(`#${this.id}`, browser);
	}

	get picker () {
		return element('.internal_Picker_Picker_picker', this.self);
	}

	decrementer () {
		return $(`#${this.id} .internal_Picker_Picker_itemDecrement`);
	}

	incrementer () {
		return $(`#${this.id} .internal_Picker_Picker_itemIncrement`);
	}

	active () {
		return $(`#${this.id} .internal_Picker_Picker_active`);
	}
}

class PickerPage extends Page {
	constructor () {
		super();
		this.title = 'Picker Test';
		const pickerDefault = new PickerInterface('pickerDefault');
		const pickerDisabled = new PickerInterface('pickerDisabled');
		const pickerHorizontalDefault = new PickerInterface('pickerHorizontalDefault');
		const pickerHorizontalDisabled = new PickerInterface('pickerHorizontalDisabled');
		const pickerHorizontalWithDefaultValue = new PickerInterface('pickerHorizontalWithDefaultValue');
		const pickerWithDefaultValue = new PickerInterface('pickerWithDefaultValue');
		this.components = {pickerDefault, pickerDisabled, pickerHorizontalDefault, pickerHorizontalDisabled, pickerHorizontalWithDefaultValue, pickerWithDefaultValue};
	}

	async open (urlExtra) {
		await super.open('Picker-View', urlExtra);
	}
}

module.exports = new PickerPage();
