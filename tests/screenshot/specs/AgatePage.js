'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class AgatePage extends Page {
	constructor () {
		super();
		this.title = 'Agate Test';
	}

	async open (urlExtra) {
		await super.open('Agate-View', urlExtra);
	}

	get component () {
		return browser.element('[data-ui-test-id="test"]');
	}
}

module.exports = new AgatePage();
