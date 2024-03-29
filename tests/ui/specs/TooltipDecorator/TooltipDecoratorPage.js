'use strict';
const {element, getText, Page} = require('@enact/ui-test-utils/utils');

class TooltipButtonInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	async focus () {
		return browser.execute((el) => el.focus(), await $(this.selector));
	}

	async hover () {
		return await $(this.selector).moveTo({xOffset: 0, yOffset: 0});
	}

	get self () {
		return $(this.selector);
	}

	get buttonPopup1 () {
		return element('#buttonPopup1', browser);
	}

	get buttonPopup2 () {
		return element('#buttonPopup2', browser);
	}

	get buttonPopup3 () {
		return element('#buttonPopup3', browser);
	}

	get tooltipText () {
		return getText(element('.enact-fit.enact-clip.enact-untouchable>div', browser));
	}

	get isTooltipShowing () {
		return element('.enact-fit.enact-clip.enact-untouchable>div', browser).isExisting();
	}
}

class TooltipDecoratorPage extends Page {
	constructor () {
		super();
		this.title = 'TooltipDecorator Test';
		const tooltipButtonDefault = new TooltipButtonInterface('tooltipButton1');
		const tooltipButtonDelayed = new TooltipButtonInterface('tooltipButton2');
		const tooltipButtonDisabled = new TooltipButtonInterface('tooltipButton3');

		this.components = {tooltipButtonDefault, tooltipButtonDelayed, tooltipButtonDisabled};
	}

	async open (urlExtra) {
		await super.open('TooltipDecorator-View', urlExtra);
	}
}

module.exports = new TooltipDecoratorPage();
