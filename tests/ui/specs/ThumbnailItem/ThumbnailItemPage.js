'use strict';
const {hasClass, getText, Page} = require('@enact/ui-test-utils/utils');

class ThumbnailItemInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	get self () {
		return $(this.selector);
	}
	async focus () {
		return browser.execute((el) => el.focus(), await $(this.selector));
	}
	async hover () {
		return await $(this.selector).moveTo({xOffset: 0, yOffset: 0});
	}
	get textContent () {
		return getText($(`#${this.id} .Item_Item_content`));
	}
	get labelContent () {
		return getText($(`#${this.id} .Item_Item_label`));
	}
	get isSelected () {
		return hasClass('.Item_Item_selected', this.self);
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

	async open (urlExtra) {
		await super.open('ThumbnailItem-View', urlExtra);
	}
}

module.exports = new ThumbnailItemPage();
