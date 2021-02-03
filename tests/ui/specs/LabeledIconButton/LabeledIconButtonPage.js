'use strict';
const {getText, Page} = require('@enact/ui-test-utils/utils');

class LabeledIconButtonInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}`));
	}
	hover () {
		return $(this.selector).moveTo({xOffset: 10, yOffset: 10});
	}

	get self () {
		return $(this.selector);
	}
	get valueText () {
		return getText($(this.selector + ' label'));
	}
	iconValue () {
		return getText($(this.selector + ' .Icon_Icon_icon')).codePointAt();
	}
	isSelected () {
		return $(this.selector + ' .Button_Button_selected').isExisting();
	}
	isHighlighted () {
		return $(this.selector + ' .Button_Button_highlighted').isExisting();
	}
	isTransparent () {
		return $(this.selector + ' .Button_Button_transparent').isExisting();
	}
	isSmallest () {
		return $(this.selector + ' .Button_Button_smallest').isExisting();
	}
	isSmall () {
		return $(this.selector + ' .Button_Button_small').isExisting();
	}
	isHuge () {
		return $(this.selector + ' .Button_Button_huge').isExisting();
	}
	isDisabled () {
		return $(this.selector + ' .Button_Button_button').getAttribute('aria-disabled');
	}
}

class LabeledIconButtonPage extends Page {
	constructor () {
		super();
		this.title = 'LabeledIconButton Test';
		const LabeledIconButtonDefault = new LabeledIconButtonInterface('labeledIconButtonDefault');
		const LabeledIconButtonCustom = new LabeledIconButtonInterface('labeledIconButtonCustomIcon');
		const LabeledIconButtonSelected = new LabeledIconButtonInterface('labeledIconButtonSelected');
		const LabeledIconButtonHighlighted = new LabeledIconButtonInterface('labeledIconButtonHighlighted');
		const LabeledIconButtonTransparent = new LabeledIconButtonInterface('labeledIconButtonTransparent');
		const LabeledIconButtonSmallest = new LabeledIconButtonInterface('labeledIconButtonSmallest');
		const LabeledIconButtonSmall = new LabeledIconButtonInterface('labeledIconButtonSmall');
		const LabeledIconButtonHuge = new LabeledIconButtonInterface('labeledIconButtonHuge');
		const LabeledIconButtonDisabled = new LabeledIconButtonInterface('labeledIconButtonDisabled');

		this.components = {
			LabeledIconButtonDefault,
			LabeledIconButtonCustom,
			LabeledIconButtonSelected,
			LabeledIconButtonHighlighted,
			LabeledIconButtonTransparent,
			LabeledIconButtonSmallest,
			LabeledIconButtonSmall,
			LabeledIconButtonHuge,
			LabeledIconButtonDisabled
		};
	}

	open (urlExtra) {
		super.open('LabeledIconButton-View', urlExtra);
	}
}

module.exports = new LabeledIconButtonPage();
