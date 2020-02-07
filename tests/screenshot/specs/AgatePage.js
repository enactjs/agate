'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class AgatePage extends Page {
	constructor () {
		super();
		this.title = 'Agate Test';
	}

	open (urlExtra) {
		super.open('Agate-View', urlExtra);
	}

	get component () {
		return browser.element('[data-ui-test-id="test"]');
	}
}

module.exports = new AgatePage();
