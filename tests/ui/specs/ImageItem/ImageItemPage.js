'use strict';
const {element, getSubComponent, getText, Page} = require('@enact/ui-test-utils/utils');

const getMarqueeText = getSubComponent({lib: 'ui', component: 'Marquee', child: 'text'});

class ImageItemInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}`));
	}
	get self () {
		return $(`#${this.id}`);
	}
	get textContent () {
		return getText(element('.ImageItem_ImageItem_caption', this.self));
	}
	get valueText () {
		return getText(getMarqueeText(this.self));
	}
	get isOverlay () {
		return $(`#${this.id}.ImageItem_ImageItem_captionOverlay`).isExisting();
	}
	get image () {
		return $(`#${this.id} .ImageItem_ImageItem_image`).isExisting();
	}
}

class ImageItemPage extends Page {
	constructor () {
		super();
		this.title = 'ImageItem Test';
		const imageItemDefault = new ImageItemInterface('imageItem1');
		const imageItemLongCaption = new ImageItemInterface('imageItem2');
		const imageItemCaptionOverlay = new ImageItemInterface('imageItem3');
		const imageItemDisabled = new ImageItemInterface('imageItem4');

		this.components = {
			imageItemDefault,
			imageItemLongCaption,
			imageItemCaptionOverlay,
			imageItemDisabled
		};
	}

	open (urlExtra) {
		super.open('ImageItem-View', urlExtra);
		this.delay(500);
	}
}

module.exports = new ImageItemPage();
