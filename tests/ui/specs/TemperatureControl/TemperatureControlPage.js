'use strict';
const {getText, Page} = require('@enact/ui-test-utils/utils');

class TemperatureControlInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	get circle () {
		return $(this.selector + ' .ArcSlider_ArcSlider_arc:nth-child(2) circle');
	}

	get valueText () {
		return getText($(this.selector + ' .ArcSlider_ArcSlider_valueDisplay span'));
	}

	coloredPath (index) {
		return $(this.selector + ' .ArcSlider_ArcSlider_arc:nth-child(' + index + ') path:first-child');
	}

	get self () {
		return $(this.selector + ' .TemperatureControl_TemperatureControl_slider');
	}

	async knobPosition () {
		const cx = parseInt((await this.circle.getCSSProperty('cx')).value);
		const cy = parseInt((await this.circle.getCSSProperty('cy')).value);

		return {cx, cy};
	}
}

class TemperatureControlPage extends Page {
	constructor () {
		super();
		this.title = 'TemperatureControl Test';
		const temperatureControlDefault = new TemperatureControlInterface('temperatureControlDefault');
		const temperatureControlCustom = new TemperatureControlInterface('temperatureControlCustom');
		const temperatureControlDisabled = new TemperatureControlInterface('temperatureControlDisabled');
		this.components = {temperatureControlDefault, temperatureControlCustom, temperatureControlDisabled};
	}

	async open (urlExtra) {
		await super.open('TemperatureControl-View', urlExtra);
	}
}

module.exports = new TemperatureControlPage();
