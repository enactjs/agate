'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class AgateInputPage extends Page {
	constructor () {
		super();
		this.title = 'Agate Input Test';
	}

	open (urlExtra) {
		super.open('Agate-Input-View', urlExtra);
	}

	get disabledInput () { return browser.element('#input5'); }
}

module.exports = new AgateInputPage();
