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
		const keypadSpotlightDisabled = new KeypadInterface('keypadSpotlightDisabled');
		this.components = {keypadDefault, keypadDisabled, keypadSpotlightDisabled};
	}

	open (urlExtra) {
		super.open('Keypad-View', urlExtra);
		this.delay(500);
	}
}

module.exports = new KeypadPage();
