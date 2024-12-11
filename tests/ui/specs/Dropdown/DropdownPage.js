'use strict';

const {element, componentSelector, getComponent, getText, hasClass, Page} = require('@enact/ui-test-utils/utils');

class DropdownInterface {
	constructor (id) {
		this.id = id;
	}

	get childItem () {
		return $(`#${this.id} > div .Dropdown_Dropdown_item`);
	}

	item (index) {
		return element(
			`${componentSelector({component: 'Item'})}[data-index="${index}"]`,
			this.list
		);
	}

	get list () {
		return getComponent({component: 'Dropdown', child: 'dropdownList'}, browser);
	}

	get self () {
		return element(`#${this.id}`, browser);
	}

	get isOpen () {
		return hasClass('Dropdown_Dropdown_open', this.self);
	}

	get selectedValue () {
		return getText($(`#${this.id} > div .enact_ui_Marquee_Marquee_text`));
	}
}

class DropdownPage extends Page {
	constructor () {
		super();
		this.title = 'Dropdown Test';
		this.components = new Proxy({}, {
			get: (target, name) => new DropdownInterface(name)
		});
		const dropdownDefault = new DropdownInterface('dropdownDefault');
		const dropdownDirectionAbove = new DropdownInterface('dropdownDirectionAbove');
		const dropdownDisabled = new DropdownInterface('dropdownDisabled');
		const dropdownSelected = new DropdownInterface('dropdownSelected');
		this.components = {dropdownDefault, dropdownDirectionAbove, dropdownDisabled, dropdownSelected};
	}

	async open (urlExtra) {
		await super.open('Dropdown-View', urlExtra);
	}
}

module.exports = new DropdownPage();
