'use strict';
const {getComponent, getSubComponent, getText, hasClass, Page} = require('@enact/ui-test-utils/utils');

const getIcon = getComponent({component:'Icon'});
const getMarqueeText = getSubComponent({lib: 'ui', component:'Marquee', child:'text'});

class ButtonInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
		this.badgeSelector = `#${this.id} > .enact_ui_Button_Button_decoration > .Button_Button_badge`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(this.selector));
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
	get icon () {
		return getIcon(this.self);
	}
	get iconSymbol () {
		return getText(this.icon);
	}
	get isIconAfter () {
		return hasClass('iconAfter', this.self);
	}
	get isIconBefore () {
		return hasClass('iconBefore', this.self);
	}
	get isIconButton () {
		return hasClass('iconOnly', this.self);
	}
	get isLarge () {
		return hasClass('large', this.self);
	}
	get isMinWidth () {
		return hasClass('minWidth', this.self);
	}
	get isOpaque () {
		return hasClass('opaque', this.self);
	}
	get isTransparent () {
		return hasClass('transparent', this.self);
	}
	get isWithBadge () {
		return $(this.badgeSelector).isExisting();
	}
}

class ButtonPage extends Page {
	constructor () {
		super();
		this.title = 'Button Test';
		const buttonDefault = new ButtonInterface('button1');
		const buttonDisabled = new ButtonInterface('button2');
		const buttonTransparent = new ButtonInterface('button3');
		const buttonWithCheckIcon = new ButtonInterface('button4');
		const buttonWithIconAfter = new ButtonInterface('button5');
		const buttonFalseMinWidth = new ButtonInterface('button6');
		const buttonSizeSmall = new ButtonInterface('button7');
		const buttonWithBadge = new ButtonInterface('button8');
		const buttonHighlighted = new ButtonInterface('button9');
		const buttonJoinedLeft = new ButtonInterface('button10');
		const buttonJoinedRight = new ButtonInterface('button11');
		const iconButton = new ButtonInterface('button12');

		this.components = {
			buttonDefault,
			buttonDisabled,
			buttonTransparent,
			buttonWithCheckIcon,
			buttonWithIconAfter,
			buttonFalseMinWidth,
			buttonSizeSmall,
			buttonWithBadge,
			buttonHighlighted,
			buttonJoinedRight,
			buttonJoinedLeft,
			iconButton
		};
	}

	open (urlExtra) {
		super.open('Button-View', urlExtra);
		this.delay(1000);
	}
}

module.exports = new ButtonPage();
