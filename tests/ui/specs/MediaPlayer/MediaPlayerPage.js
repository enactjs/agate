'use strict';
const {getText, Page} = require('@enact/ui-test-utils/utils');

class MediaPlayerInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	async focus () {
		return browser.execute((el) => el.focus(), await $(`#${this.id}>div`));
	}

	async hover (ariaLabel) {
		return (await $(this.selector + `>div>div[aria-label=${ariaLabel}]`)).moveTo({xOffset: 0, yOffset: 0});
	}

	get slider () {
		return $(`#${this.id} .MediaPlayer_MediaSlider_slider`);
	}

	get knob () {
		return $(`#${this.id} .MediaPlayer_MediaSlider_slider > div .MediaPlayer_MediaSlider_knob`);
	}

	get playButton () {
		return $(this.selector + '>div>div.MediaPlayer_MediaControls_playPauseButton');
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

	get repeatStatus () {
		return getText($(this.selector + '>div>div[aria-label=Repeat]' + '> .enact_ui_Button_Button_decoration > .Button_Button_badge'));
	}

	get menuButton () {
		return $(this.selector + '>div>div[aria-label=Menu]');
	}

	async source () {
		return (await $(this.selector + '>audio>source')).getAttribute('src');
	}
}

class MediaPlayerPage extends Page {
	constructor () {
		super();
		this.title = 'MediaPlayer Test';
		const mediaPlayerDefault = new MediaPlayerInterface('mediaPlayerDefault');
		const mediaPlayerDisabled = new MediaPlayerInterface('mediaPlayerDisabled');
		const mediaPlayerSpotlightDisabled = new MediaPlayerInterface('mediaPlayerSpotlightDisabled');
		const mediaPlayerTiny = new MediaPlayerInterface('mediaPlayerTiny');
		this.components = {mediaPlayerDefault, mediaPlayerDisabled, mediaPlayerSpotlightDisabled, mediaPlayerTiny};
	}

	async waitForPlayMedia (mediaPlayer, timeout) {
		await browser.waitUntil(async function () {
			return (await mediaPlayer.knob.getCSSProperty('left')).value !== '0px';
		}, {timeout});
	}

	async open (urlExtra) {
		await super.open('MediaPlayer-View', urlExtra);
	}
}

module.exports = new MediaPlayerPage();
