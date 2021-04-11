'use strict';
const {element, hasClass, getText, Page} = require('@enact/ui-test-utils/utils');

class ThumbnailItemInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	get self () {
		return $(this.selector);
	}
	focus () {
		return browser.execute((el) => el.focus(), $(this.selector));
	}
	hover () {
		return $(this.selector).moveTo({xOffset: 0, yOffset: 0});
	}
	get textContent () {
		return getText(element('.Item_Item_content', this.self));
	}
	get labelContent () {
		return getText(element('.Item_Item_label', this.self));
	}
	get isSelected () {
		return hasClass('.ThumbnailItem_ThumbnailItem_selected', this.self);
	}
	get image () {
		return $(`#${this.id} .ThumbnailItem_ThumbnailItem_thumbnail`).isExisting();
	}
}

class ThumbnailItemPage extends Page {
	constructor () {
		super();
		this.title = 'ThumbnailItem Test';
		const thumbnailItemDefault = new ThumbnailItemInterface('thumbnailItem1');
		const thumbnailItemLabel = new ThumbnailItemInterface('thumbnailItem2');
		const thumbnailItemSelected = new ThumbnailItemInterface('thumbnailItem3');
		const thumbnailItemInline = new ThumbnailItemInterface('thumbnailItem4');
		const thumbnailItemInlineDisabled = new ThumbnailItemInterface('thumbnailItem5');
		const thumbnailItemDisabled = new ThumbnailItemInterface('thumbnailItem6');

		this.components = {
			thumbnailItemDefault,
			thumbnailItemLabel,
			thumbnailItemSelected,
			thumbnailItemInline,
			thumbnailItemInlineDisabled,
			thumbnailItemDisabled
		};
	}

	open (urlExtra) {
		super.open('ThumbnailItem-View', urlExtra);
		this.delay(500);
	}
}

module.exports = new ThumbnailItemPage();
