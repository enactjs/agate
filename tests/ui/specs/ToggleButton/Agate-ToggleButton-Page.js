'use strict';
const Page = require('@enact/ui-test-utils/test/Page.js');
const {getText, hasClass} = require('@enact/ui-test-utils/test/utils');

class AgateToggleButtonInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}
	get self () { return browser.element(`#${this.id}`); }
	get textContent () { return getText(this.self); }
	get isSelected () { return hasClass('ToggleButton_ToggleButton_selected', this.self); }
	get isInline () { return hasClass('ToggleButton_ToggleButton_inline', this.self); }
}


class AgateToggleButtonPage extends Page {
	constructor () {
		super();
		this.title = 'Agate ToggleButton Test';
		const toggleDefault = new AgateToggleButtonInterface('toggleButton1');
		const toggleWithLabels = new AgateToggleButtonInterface('toggleButton3');

		this.components = {toggleDefault, toggleWithLabels};
	}

	open (urlExtra) {
		super.open('Agate-ToggleButton-View', urlExtra);
	}
}

module.exports = new AgateToggleButtonPage();
