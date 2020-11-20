'use strict';

const {element, componentSelector, getComponent, hasClass, Page} = require('@enact/ui-test-utils/utils');

class DropdownInterface {
	constructor (id) {
		this.id = id;
	}

	get childItem () {
		return getComponent({component: 'Dropdown', child: 'item'}, this.self);
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
}

class DropdownPage extends Page {
	constructor () {
		super();
		this.title = 'Dropdown Test';
		this.components = new Proxy({}, {
			get: (target, name) => new DropdownInterface(name)
		});
		const dropdown1 = new DropdownInterface('dropdown1');
		const dropdown2 = new DropdownInterface('dropdown2');
		const dropdown3 = new DropdownInterface('dropdown3');
		const dropdownDefault = new DropdownInterface('dropdownDefault');
		const dropdownDirectionRight = new DropdownInterface('dropdownDirectionRight');
		const dropdownDisabled = new DropdownInterface('dropdownDisabled');
		this.components = {dropdown1, dropdown2, dropdown3, dropdownDefault, dropdownDirectionRight, dropdownDisabled};
	}

	open (layout = '', urlExtra) {
		super.open(`Dropdown${layout}-View`, urlExtra);
	}
}

module.exports = new DropdownPage();
