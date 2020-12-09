const Page = require('./MediaPlayerPage');

describe('MediaPlayer', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const mediaPlayerDefault = Page.components.mediaPlayerDefault;

		it('should have the slider knob focused', function () {
			expect(mediaPlayerDefault.slider.isFocused()).to.be.true();
		});

		const mediaPlayerDisabled = Page.components.mediaPlayerDisabled;

		it('should have the slider knob focused', function () {
			mediaPlayerDisabled.focus();
			expect(mediaPlayerDisabled.slider.isFocused()).to.be.true();
		});
	});

	describe('5-way', function () {
		const mediaPlayer = Page.components.mediaPlayerDefault;

		it('should focus `play` button on 5-way down', function () {
			expect(mediaPlayer.slider.isFocused()).to.be.true();

			Page.spotlightDown();

			expect(mediaPlayer.playButton.isFocused()).to.be.true();
		});

		it('should focus `previous` button on 5-way down, then left', function () {
			expect(mediaPlayer.slider.isFocused()).to.be.true();

			Page.spotlightDown();
			Page.spotlightLeft();

			expect(mediaPlayer.previousButton.isFocused()).to.be.true();
		});

		it('should focus back `play` button when navigating back to media controls ', function () {
			expect(mediaPlayer.slider.isFocused()).to.be.true();

			Page.spotlightDown();
			Page.spotlightLeft();
			expect(mediaPlayer.previousButton.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(mediaPlayer.shuffleButton.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(mediaPlayer.repeatButton.isFocused()).to.be.true();
			Page.spotlightUp();
			Page.spotlightDown();

			expect(mediaPlayer.playButton.isFocused()).to.be.true();
		});
	});

	describe('using pointer', function () {
		const mediaPlayer = Page.components.mediaPlayerDisabled;

		it('should focus `next` button on hover', function () {
			mediaPlayer.hover('Next');

			expect(mediaPlayer.nextButton.isFocused()).to.be.true();
		});

		it('should focus `menu` button on hover', function () {
			mediaPlayer.hover('Menu');

			expect(mediaPlayer.menuButton.isFocused()).to.be.true();
		});
	});
});
