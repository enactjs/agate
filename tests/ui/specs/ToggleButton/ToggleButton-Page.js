'use strict';
//const {Page} = require('@enact/ui-test-utils/utils');
// const {getText, hasClass} = require('@enact/ui-test-utils/utils');
import {getText, hasClass, Page} from '@enact/ui-test-utils/utils/index.js';

class AgateToggleButtonInterface {
	constructor (id) {
		this.id = id;
	}

	async focus () {
		return browser.execute((el) => el.focus(), await `#${this.id}`);
	}
	get self () {
		return $(`#${this.id}`);
	}
	get textContent () {
		return getText(this.self);
	}
	get isSelected () {
		return hasClass('ToggleButton_ToggleButton_selected', this.self);
	}
	get isInline () {
		return hasClass('ToggleButton_ToggleButton_inline', this.self);
	}
}

class ToggleButtonPage extends Page {
	constructor () {
		super();
		this.title = 'ToggleButton Test';
		const toggleDefault = new AgateToggleButtonInterface('toggleButton1');
		const toggleWithLabels = new AgateToggleButtonInterface('toggleButton3');

		this.components = {toggleDefault, toggleWithLabels};
	}

	async open (urlExtra) {
		await super.open('ToggleButton-View', urlExtra);
	}
}

//module.exports = new ToggleButtonPage();
export default new ToggleButtonPage();