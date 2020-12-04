'use strict';

const {element, componentSelector, getComponent, getSubComponent, getText, hasClass, Page} = require('@enact/ui-test-utils/utils');

const getMarqueeText = getSubComponent({lib: 'ui', component:'Marquee', child:'text'});

class ColorPickerInterface {
	constructor (id) {
		this.id = id;
	}
	//
	// get childItem () {
	// 	return getComponent({component: 'Dropdown', child: 'item'}, this.self);
	// }

	// item (index) {
	// 	return element(
	// 		`${componentSelector({component: 'Item'})}[data-index="${index}"]`,
	// 		this.list
	// 	);
	// }

	get button () {
		return element(`#${this.id}>.ColorPicker_SwatchButton_swatchButton`, browser);
	}

	// get list () {
	// 	return getComponent({component: 'Dropdown', child: 'dropdownList'}, browser);
	// }

	get self () {
		return element(`#${this.id}`, browser);
	}
	//
	// get isOpen () {
	// 	return hasClass('Dropdown_Dropdown_open', this.self);
	// }
	//
	// get selectedValue () {
	// 	return getText(getMarqueeText(this.self));
	// }
}

class ColorPickerPage extends Page {
	constructor () {
		super();
		this.title = 'ColorPicker Test';
		this.components = new Proxy({}, {
			get: (target, name) => new ColorPickerInterface(name)
		});
		const colorPickerDefault = new ColorPickerInterface('colorPickerDefault');
		// const dropdownDirectionRight = new DropdownInterface('dropdownDirectionRight');
		// const dropdownDisabled = new DropdownInterface('dropdownDisabled');
		// const dropdownSelected = new DropdownInterface('dropdownSelected');
		this.components = {colorPickerDefault};
	}

	open (urlExtra) {
		super.open('ColorPicker-View', urlExtra);
	}
}

module.exports = new ColorPickerPage();
