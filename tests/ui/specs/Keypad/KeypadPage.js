'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('@enact/ui-test-utils/utils');

class KeypadInterface {
	constructor (id) {
		this.id = id;
	}

	async focus () {
		return browser.execute((el) => el.focus(), await $(`#${this.id}>div>div`));
	}

	button (index) {
		return element(
			`#${this.id} > div .Button_Button_button[aria-label="${index}"]`,
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

	async open (urlExtra) {
		await super.open('Keypad-View', urlExtra);
	}
}

module.exports = new KeypadPage();
