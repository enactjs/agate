'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class ArcPickerInterface {
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
}

class ArcPickerPage extends Page {
	constructor () {
		super();
		this.title = 'ArcPicker Test';
		const arcPickerDefault = new ArcPickerInterface('arcPickerDefault');
		const arcPickerCumulative = new ArcPickerInterface('arcPickerCumulative');
		const arcPickerDisabled = new ArcPickerInterface('arcPickerDisabled');
		this.components = {arcPickerDefault, arcPickerCumulative, arcPickerDisabled};
	}

	open (urlExtra) {
		super.open('ArcPicker-View', urlExtra);
		this.delay(1000);
	}
}

module.exports = new ArcPickerPage();
