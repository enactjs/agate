'use strict';
const {element, getSubComponent, getText, Page} = require('@enact/ui-test-utils/utils');

class PopupMenuCommon {

	get buttonPopupMenu1 () {
		return element('#buttonPopupMenu1', browser);
	}
	get buttonPopupMenu2 () {
		return element('#buttonPopupMenu2', browser);
	}
	get buttonPopupMenu3 () {
		return element('#buttonPopupMenu3', browser);
	}
	get buttonPopupMenu4 () {
		return element('#buttonPopupMenu4', browser);
	}
	get buttonPopupMenu5 () {
		return element('#buttonPopupMenu5', browser);
	}
	get buttonPopupMenu6 () {
		return element('#buttonPopupMenu6', browser);
	}
	get buttonPopupMenu7 () {
		return element('#buttonPopupMenu7', browser);
	}
	get buttonPopupMenu8 () {
		return element('#buttonPopupMenu8', browser);
	}
	get popupMenuLayer () {
		return element('#floatLayer', browser);
	}
	get isPopupMenuExist () {
		return this.popupMenuLayer.$('.PopupMenu_PopupMenu_popupMenu').isExisting();
	}
	get isScrimExist () {
		return this.popupMenuLayer.$('.enact_ui_FloatingLayer_Scrim_scrim').isExisting();
	}
}

class PopupMenuInterface {

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
		return element(`#${this.id} .LabeledIconButton_LabeledIconButton_labeledIconButton`, browser);
	}
	get PopupMenu () {
		return element(`#${this.id}`, browser);
	}
	get title () {
		return getText(element(`#${this.id}>div>h1`, browser));
	}
	get isOpen () {
		return $(`.enact_ui_Transition_Transition_shown #${this.id}`).isExisting();
	}
	get label () {
		return getText(element(`#${this.id} label`, browser));
	}
}

class PopupMenuPage extends Page {

	constructor () {
		super();
		this.title = 'PopupMenu Test';

		this.components = {};
		this.popupMenuCommon = new PopupMenuCommon('popupMenuMain');
		this.components.popupMenu1 = new PopupMenuInterface('popupMenu1');
		this.components.popupMenu2 = new PopupMenuInterface('popupMenu2');
		this.components.popupMenu3 = new PopupMenuInterface('popupMenu3');
		this.components.popupMenu4 = new PopupMenuInterface('popupMenu4');
		this.components.popupMenu5 = new PopupMenuInterface('popupMenu5');
		this.components.popupMenu6 = new PopupMenuInterface('popupMenu6');
		this.components.popupMenu7 = new PopupMenuInterface('popupMenu7');
		this.components.popupMenu8 = new PopupMenuInterface('popupMenu8');
	}

	open (urlExtra) {
		super.open('PopupMenu-View', urlExtra);
	}

	waitForOpen (selector, timeout) {
		if (typeof selector !== 'string') selector = `#${selector.id}`;

		$(selector).waitForExist({timeout});
	}

	waitForClose (selector, timeout) {
		if (typeof selector !== 'string') selector = `#${selector.id}`;

		$(selector).waitForExist({timeout, reverse: true});
	}
}

module.exports = new PopupMenuPage();
