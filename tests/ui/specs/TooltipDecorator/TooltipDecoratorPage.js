'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

class Wrapper {

	get buttonPopup1 () {
		return element('#buttonPopup1', browser);
	}

	get buttonPopup2 () {
		return element('#buttonPopup2', browser);
	}

	get buttonPopup3 () {
		return element('#buttonPopup3', browser);
	}

	get floatLayer () {
		return element('#floatLayer', browser);
	}

	get isTooltipShowing () {
		return this.floatLayer.$('.enact_ui_FloatingLayer_Scrim_scrim').isExisting();
	}
}

class TooltipButtonInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(this.selector));
	}

	get self () {
		return $(this.selector);
	}
}

class TooltipDecoratorPage extends Page {
	constructor () {
		super();
		this.title = 'TooltipDecorator Test';
		this.wrapper = new Wrapper('wrapper');
		const tooltipButton1 = new TooltipButtonInterface('tooltipButton1');
		const tooltipButton2 = new TooltipButtonInterface('tooltipButton2');
		const tooltipButton3 = new TooltipButtonInterface('tooltipButton3');

		this.components = {tooltipButton1, tooltipButton2, tooltipButton3};
	}

	open (urlExtra) {
		super.open('TooltipDecorator-View', urlExtra);
	}
}

module.exports = new TooltipDecoratorPage();
