'use strict';

const {element, componentSelector, getComponent, getSubComponent, getText, hasClass, Page} = require('@enact/ui-test-utils/utils');

const getMarqueeText = getSubComponent({lib: 'ui', component:'Marquee', child:'text'});

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

	get selectedValue () {
		return getText(getMarqueeText(this.self));
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
		const dropdownDirectionRight = new DropdownInterface('dropdownDirectionRight');
		const dropdownDisabled = new DropdownInterface('dropdownDisabled');
		const dropdownSelected = new DropdownInterface('dropdownSelected');
		this.components = {dropdownDefault, dropdownDirectionRight, dropdownDisabled, dropdownSelected};
	}

	open (urlExtra) {
		super.open('Dropdown-View', urlExtra);
	}
}

module.exports = new DropdownPage();
