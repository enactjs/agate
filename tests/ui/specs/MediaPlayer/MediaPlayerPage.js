'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element, getComponent} = require('@enact/ui-test-utils/utils');

class MediaPlayerInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}>div`));
	}

	hover (ariaLabel) {
		return $(this.selector + `>div>div[aria-label=${ariaLabel}]`).moveTo({xOffset: 0, yOffset: 0});
	}

	get self () {
		return $(this.selector);
	}

	get slider () {
		return getComponent({component: 'Slider', child: 'slider'}, this.self);
	}

	get button () {
		return getComponent({component: 'Button', child: 'button'}, this.self);
	}

	get playButton () {
		return element('.MediaPlayer_MediaControls_playPauseButton', this.self);
	}

	get icon () {
		return getComponent({component: 'Button', child: 'icon'}, this.self);
	}

	get previousButton () {
		return $(this.selector + '>div>div[aria-label=Previous]');
	}

	get nextButton () {
		return $(this.selector + '>div>div[aria-label=Next]');
	}

	get shuffleButton () {
		return $(this.selector + '>div>div[aria-label=Shuffle]');
	}

	get repeatButton () {
		return $(this.selector + '>div>div[aria-label=Repeat]');
	}

	get menuButton () {
		return $(this.selector + '>div>div[aria-label=Menu]');
	}
}

class MediaPlayerPage extends Page {
	constructor () {
		super();
		this.title = 'MediaPlayer Test';
		const mediaPlayerDefault = new MediaPlayerInterface('mediaPlayerDefault');
		const mediaPlayerDisabled = new MediaPlayerInterface('mediaPlayerDisabled');
		this.components = {mediaPlayerDefault, mediaPlayerDisabled};
	}

	open (urlExtra) {
		super.open('MediaPlayer-View', urlExtra);
	}
}

module.exports = new MediaPlayerPage();
