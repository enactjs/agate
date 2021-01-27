const Page = require('./MediaPlayerPage');

describe('MediaPlayer', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const mediaPlayer = Page.components.mediaPlayerDefault;

		it('should have the slider knob focused', function () {
			expect(mediaPlayer.slider.isFocused()).to.be.true();
		});

		it('should play media on playButton click', function () {
			expect(mediaPlayer.knob.getCSSProperty('left').value).to.equal('0px');

			mediaPlayer.playButton.click();
			Page.waitForPlayMedia(mediaPlayer);

			expect(mediaPlayer.knob.getCSSProperty('left').value).to.not.equal('0px');
		});

		it('should play next media on nextButton click', function () {
			expect(mediaPlayer.source).to.equal('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');

			mediaPlayer.nextButton.click();
			Page.waitForPlayMedia(mediaPlayer);

			expect(mediaPlayer.source).to.equal('https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3');
		});

		it('should repeat current media on nextButton click when repeatButton is active', function () {
			expect(mediaPlayer.source).to.equal('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');

			mediaPlayer.repeatButton.click();
			// Check if "repeat one" is active
			expect(mediaPlayer.repeatStatus).to.equal('1');

			mediaPlayer.nextButton.click();
			Page.waitForPlayMedia(mediaPlayer);

			expect(mediaPlayer.source).to.equal('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');
		});

		describe('5-way', function () {

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
});
