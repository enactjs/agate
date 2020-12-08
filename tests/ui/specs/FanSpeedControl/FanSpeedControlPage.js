'use strict';
const {getText, Page} = require('@enact/ui-test-utils/utils');

class FanSpeedControlInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	coloredPath (index) {
		return $(this.selector + ' .ArcPicker_ArcPicker_arc:nth-child(' + index + ') path:first-child');
	}

	clickablePath (index) {
		return $(this.selector + ' .ArcPicker_ArcPicker_arc:nth-child(' + index + ') path:nth-child(2)');
	}

	iconValue () {
		return  getText($(this.selector + ' .ArcPicker_ArcPicker_valueDisplay>div')).codePointAt();
	}

	fanValue () {
		return  getText($(this.selector + ' .ArcPicker_ArcPicker_valueDisplay>span'));
	}
}

class FanSpeedControlPage extends Page {
	constructor () {
		super();
		this.title = 'FanSpeedControl Test';
		const fanSpeedControlDefault = new FanSpeedControlInterface('fanSpeedControlDefault');
		const fanSpeedControlCustom = new FanSpeedControlInterface('fanSpeedControlCustom');
		const fanSpeedControlDisabled = new FanSpeedControlInterface('fanSpeedControlDisabled');

		this.components = {fanSpeedControlDefault, fanSpeedControlCustom, fanSpeedControlDisabled};
	}

	open (urlExtra) {
		super.open('FanSpeedControl-View', urlExtra);
	}
}

module.exports = new FanSpeedControlPage();
