'use strict';
const {element, getText, hasClass, Page} = require('@enact/ui-test-utils/utils');

class DrawerCommon {

	get buttonDrawer1 () {
		return element('#buttonDrawer1', browser);
	}
	get buttonDrawer2 () {
		return element('#buttonDrawer2', browser);
	}
	get buttonDrawer3 () {
		return element('#buttonDrawer3', browser);
	}
	get buttonDrawer4 () {
		return element('#buttonDrawer4', browser);
	}
	get drawerLayer () {
		return element('#floatLayer', browser);
	}
	get isDrawerExist () {
		return this.drawerLayer.$('.Drawer_Drawer_drawer').isExisting();
	}
	get isScrimExist () {
		return this.drawerLayer.$('.enact_ui_FloatingLayer_Scrim_scrim').isExisting();
	}
}

class DrawerInterface {

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
	get drawer () {
		return element(`#${this.id}`, browser);
	}
	get title () {
		return getText(element(`#${this.id}>div>h5`, browser));
	}
	get isOpen () {
		return $(`.enact_ui_Transition_Transition_shown #${this.id}`).isExisting();
	}
	get hasLine () {
		return hasClass('Heading_Heading_showLine', this.self);
	}
}

class DrawerPage extends Page {

	constructor () {
		super();
		this.title = 'Drawer Test';

		this.components = {};
		this.drawerCommon = new DrawerCommon('drawerMain');
		this.components.drawer1 = new DrawerInterface('drawer1');
		this.components.drawer2 = new DrawerInterface('drawer2');
		this.components.drawer3 = new DrawerInterface('drawer3');
		this.components.drawer4 = new DrawerInterface('drawer4');
	}

	open (urlExtra) {
		super.open('Drawer-View', urlExtra);
		this.delay(500);
	}

	clickPopupFloatLayer () {
		$('#floatLayer').click();
	}

	waitForOpen (selector, timeout) {
		if (typeof selector !== 'string') {
			selector = `#${selector.id}`;
		}

		$(selector).waitForExist({timeout});
	}

	waitForClose (selector, timeout) {
		if (typeof selector !== 'string') {
			selector = `#${selector.id}`;
		}

		$(selector).waitForExist({timeout, reverse: true});
	}
}

module.exports = new DrawerPage();
