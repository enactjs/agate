'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class ButtonInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	async focus () {
		return browser.execute((el) => el.focus(), await $(this.selector));
	}

	get self () {
		return $(this.selector);
	}
	get isOpen () {
		return $('.ContextualPopupDecorator_ContextualPopup_container').isExisting();
	}

}

class ContextualPopupDecoratorPage extends Page {
	constructor () {
		super();
		this.title = 'ContextualPopupDecorator Test';
		const button1 = new ButtonInterface('button1');
		const button2 = new ButtonInterface('button2');

		this.components = {button1, button2};
	}

	async open (urlExtra) {
		await super.open('ContextualPopupDecorator-View', urlExtra);
	}
}

module.exports = new ContextualPopupDecoratorPage();
