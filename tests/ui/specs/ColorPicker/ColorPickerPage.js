'use strict';

const {element, componentSelector, getComponent, getSubComponent,Page} = require('@enact/ui-test-utils/utils');

class ColorPickerInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
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

	item (index) {
		return $(this.selector + ` .ColorPicker_ColorPicker_palette .ColorPicker_SwatchButton_swatchButton:nth-child(${index})`);
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
