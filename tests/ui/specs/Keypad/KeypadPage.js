'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {componentSelector, element} = require('@enact/ui-test-utils/utils');

class KeypadInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}>div>div`));
	}

	button (index) {
		return element(
			`${componentSelector({component: 'Button'})}[aria-label="${index}"]`,
			this.self
		);
	}

	get self () {
		return $(`#${this.id}`);
	}
}

class KeypadPage extends Page {
	constructor () {
		super();
		this.title = 'Keypad Test';
		const keypadDefault = new KeypadInterface('keypadDefault');
		const keypadDisabled = new KeypadInterface('keypadDisabled');
		this.components = {keypadDefault, keypadDisabled};
	}

	open (urlExtra) {
		super.open('Keypad-View', urlExtra);
	}
}

module.exports = new KeypadPage();
