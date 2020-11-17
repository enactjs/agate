'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class AgateItemInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
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
}

class AgateItemPage extends Page {
	constructor () {
		super();
		this.title = 'Agate Item Test';
		const item1 = new AgateItemInterface('item1');
		const item2Disabled = new AgateItemInterface('item2Disabled');
		const item3WithLabel = new AgateItemInterface('item3WithLabel');
		const item4Inline = new AgateItemInterface('item4Inline');
		const item5InlineDisabled = new AgateItemInterface('item5InlineDisabled');
		const item6Inline = new AgateItemInterface('item6Inline');
		const item7Inline = new AgateItemInterface('item7Inline');
		const item8Inline = new AgateItemInterface('item8Inline');
		this.components = {item1, item2Disabled, item3WithLabel, item4Inline, item5InlineDisabled, item6Inline, item7Inline, item8Inline};
	}

	open (urlExtra) {
		super.open('Agate-Item-View', urlExtra);
	}
}

module.exports = new AgateItemPage();
