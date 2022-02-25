'use strict';
const {element, getComponent, getText, Page} = require('@enact/ui-test-utils/utils');

class PopupCommon {

	get buttonPopup1 () {
		return element('#buttonPopup1', browser);
	}
	get buttonPopup2 () {
		return element('#buttonPopup2', browser);
	}
	get buttonPopup3 () {
		return element('#buttonPopup3', browser);
	}
	get buttonPopup4 () {
		return element('#buttonPopup4', browser);
	}
	get buttonPopup5 () {
		return element('#buttonPopup5', browser);
	}
	get buttonPopup6 () {
		return element('#buttonPopup6', browser);
	}
	get buttonPopup7 () {
		return element('#buttonPopup7', browser);
	}
	get buttonPopup8 () {
		return element('#buttonPopup8', browser);
	}
	get buttonPopup9 () {
		return element('#buttonPopup9', browser);
	}
	get buttonPopup10 () {
		return element('#buttonPopup10', browser);
	}
	get popupLayer () {
		return element('#floatLayer', browser);
	}
	get isPopupExist () {
		return this.popupLayer.$('.Popup_Popup_popup').isExisting();
	}
	get isScrimExist () {
		return this.popupLayer.$('.enact_ui_FloatingLayer_Scrim_scrim').isExisting();
	}
}

class PopupInterface {

	constructor (id) {
		this.id = id;
	}

	get self () {
		return element(`#${this.id}`, browser);
	}
	get buttonOK () {
		return element(`#${this.id} #buttonOK`, browser);
	}
	get buttonCancel () {
		return element(`#${this.id} #buttonCancel`, browser);
	}
	get buttonClose () {
		return getComponent({component: 'Popup', child: 'closeButton'}, this.self);
	}
	get popup () {
		return element(`#${this.id}`, browser);
	}
	get title () {
		return getText(element('.Popup_Popup_content > div', browser));
	}
	get isOpen () {
		return $(`.enact_ui_Transition_Transition_shown #${this.id}`).isExisting();
	}
}

class PopupPage extends Page {

	constructor () {
		super();
		this.title = 'Popup Test';

		this.components = {};
		this.popupCommon = new PopupCommon('popupMain');
		this.components.popup1 = new PopupInterface('popup1');
		this.components.popup2 = new PopupInterface('popup2');
		this.components.popup3 = new PopupInterface('popup3');
		this.components.popup4 = new PopupInterface('popup4');
		this.components.popup5 = new PopupInterface('popup5');
		this.components.popup6 = new PopupInterface('popup6');
		this.components.popup7 = new PopupInterface('popup7');
		this.components.popup8 = new PopupInterface('popup8');
		this.components.popup9 = new PopupInterface('popup9');
		this.components.popup10 = new PopupInterface('popup10');
	}

	async open (urlExtra) {
		await super.open('Popup-View', urlExtra);
	}

	async clickPopupFloatLayer () {
		await $('#floatLayer > div').click({y: -400});
	}

	async waitForOpen (selector, timeout) {
		if (typeof selector !== 'string') selector = `#${selector.id}`;

		await $(selector).waitForExist({timeout});
	}

	async waitForClose (selector, timeout) {
		if (typeof selector !== 'string') selector = `#${selector.id}`;

		await $(selector).waitForExist({timeout, reverse: true});
	}

	async waitForFocused (node, timeout, timeoutMsg = 'timed out waiting for focus', interval = 250) {
		await browser.waitUntil(function () {
			return node.isFocused();
		}, {timeout, timeoutMsg, interval});
	}
}

module.exports = new PopupPage();
