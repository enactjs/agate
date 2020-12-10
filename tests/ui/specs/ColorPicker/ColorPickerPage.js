'use strict';

const {componentSelector, element, getComponent, Page} = require('@enact/ui-test-utils/utils');

class ColorPickerInterface {
	constructor (id) {
		this.id = id;
	}

	get self () {
		return element(`#${this.id}`, browser);
	}

	get button () {
		return element(`#${this.id}>.ColorPicker_SwatchButton_swatchButton`, browser);
	}

	get colorSwatch () {
		return this.button.getAttribute('aria-label');
	}

	get isOpen () {
		return $(`.enact_ui_Transition_Transition_shown #${this.id}`).isExisting();
	}

	get colorList () {
		return getComponent({component: 'ColorPicker', child: 'palette'}, browser);
	}

	item (index) {
		return element(
			`${componentSelector({component: 'Button'})}[data-index="${index}"]`,
			this.colorList
		);
	}
}

class ColorPickerPage extends Page {
	constructor () {
		super();
		this.title = 'ColorPicker Test';
		this.components = new Proxy({}, {
			get: (target, name) => new ColorPickerInterface(name)
		});
		const colorPickerDefault = new ColorPickerInterface('colorPickerDefault');
		const colorPickerDisabled = new ColorPickerInterface('colorPickerDisabled');
		const colorPickerDirectionUp = new ColorPickerInterface('colorPickerDirectionUp');
		const colorPickerOpen = new ColorPickerInterface('colorPickerOpen');
		this.components = {colorPickerDefault, colorPickerDisabled, colorPickerDirectionUp, colorPickerOpen};
	}

	open (urlExtra) {
		super.open('ColorPicker-View', urlExtra);
	}
}

module.exports = new ColorPickerPage();
