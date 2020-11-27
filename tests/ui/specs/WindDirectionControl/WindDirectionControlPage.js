'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class WindDirectionControlInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}
}

class WindDirectionControlPage extends Page {
	constructor () {
		super();
		this.title = 'WindDirectionControl Test';
		const windDirectionControlDefault = new WindDirectionControlInterface('windDirectionControl1');
		const windDirectionControlDisabled = new WindDirectionControlInterface('windDirectionControl2');

		this.components = {
			windDirectionControlDefault,
			windDirectionControlDisabled
		};
	}

	open (urlExtra) {
		super.open('WindDirectionControl-View', urlExtra);
	}
}

module.exports = new WindDirectionControlPage();
