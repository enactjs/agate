'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class ArcSliderInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	get circle () {
		return $(this.selector + ' .ArcSlider_ArcSlider_arc:nth-child(2) circle');
	}

	coloredPath (index) {
		return $(this.selector + ' .ArcSlider_ArcSlider_arc:nth-child(' + index + ') path:first-child');
	}

	get self () {
		return $(this.selector);
	}
}

class ArcSliderPage extends Page {
	constructor () {
		super();
		this.title = 'ArcSlider Test';
		const arcSliderDefault = new ArcSliderInterface('arcSliderDefault');
		const arcSliderCustom = new ArcSliderInterface('arcSliderCustom');
		const arcSliderDisabled = new ArcSliderInterface('arcSliderDisabled');
		this.components = {arcSliderDefault, arcSliderCustom, arcSliderDisabled};
	}

	open (urlExtra) {
		super.open('ArcSlider-View', urlExtra);
	}
}

module.exports = new ArcSliderPage();
