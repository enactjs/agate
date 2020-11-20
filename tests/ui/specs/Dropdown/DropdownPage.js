'use strict';

const {element, componentSelector, getComponent, Page} = require('@enact/ui-test-utils/utils');

class DropdownInterface {
	constructor (id) {
		this.id = id;
	}

	focusActivator () {
		return browser.execute((el) => el.focus(), this.self.$('[role="button"]'));
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

	get focusedItemText () {
		return browser.execute(() => {
			const focused = document.activeElement;
			// naive test that the focused element is a dropdown item
			if (focused.dataset.index) {
				return focused.textContent;
			}

			return null;
		});
	}

	get self () {
		return element(`#${this.id}`, browser);
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
		const dropdownSelected = new DropdownInterface('dropdownSelected');
		const dropdownChangeSelected = new DropdownInterface('dropdownChangeSelected');
		const dropdownChangeChildren = new DropdownInterface('dropdownChangeChildren');
		const dropdownChangeLessChildren = new DropdownInterface('dropdownChangeLessChildren');
		this.components = {dropdown1, dropdown2, dropdown3, dropdownDefault, dropdownSelected, dropdownChangeSelected, dropdownChangeChildren, dropdownChangeLessChildren };
	}

	openDropdown (component) {
		component.focusActivator();
		this.spotlightSelect();
	}

	open (layout = '', urlExtra) {
		super.open(`Agate-Dropdown${layout}-View`, urlExtra);
	}

}

module.exports = new DropdownPage();
