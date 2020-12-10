'use strict';
const {getSubComponent, getText, Page} = require('@enact/ui-test-utils/utils');

const getMarqueeText = getSubComponent({lib: 'ui', component: 'Marquee', child: 'text'});

class LabeledIconButtonInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}`));
	}
	hover () {
		return $(this.selector).moveTo({xOffset: 0, yOffset: 0});
	}

	get self () {
		return $(this.selector);
	}
	get valueText () {
		return getText(getMarqueeText(this.self));
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

	// get textContent () {
	// 	return getText(this.selector + ' .LabeledIcon_LabeledIcon_label');
	// }
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
		}
	}

	open (urlExtra) {
		super.open('LabeledIconButton-View', urlExtra);
	}
}

module.exports = new LabeledIconButtonPage();
