const Page = require('./MediaPlayerPage');

describe('MediaPlayer', function () {

	beforeEach(async function () {
		await Page.open();
	});

	const {
		mediaPlayerDefault,
		mediaPlayerDisabled,
		mediaPlayerSpotlightDisabled,
		mediaPlayerTiny
	} = Page.components;

	describe('default', function () {
		it('should have the slider knob focused', async function () {
			expect(await mediaPlayerDefault.slider.isFocused()).toBe(true);
		});

		it('should play media on playButton click', async function () {
			expect((await mediaPlayerDefault.knob.getCSSProperty('left')).value).toBe('0px');

			await mediaPlayerDefault.playButton.click();
			await Page.waitForPlayMedia(mediaPlayerDefault);

			expect((await mediaPlayerDefault.knob.getCSSProperty('left')).value).not.toBe('0px');
		});

		it('should play next media on nextButton click', async function () {
			expect(await mediaPlayerDefault.source()).toBe('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');

			await mediaPlayerDefault.nextButton.click();
			await Page.waitForPlayMedia(mediaPlayerDefault);

			expect(await mediaPlayerDefault.source()).toBe('https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3');
		});

		it('should repeat current media on nextButton click when repeatButton is active', async function () {
			expect(await mediaPlayerDefault.source()).toBe('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');

			await mediaPlayerDefault.repeatButton.click();
			// Check if "repeat one" is active
			expect(await mediaPlayerDefault.repeatStatus).toBe('1');

			await mediaPlayerDefault.nextButton.click();
			await Page.waitForPlayMedia(mediaPlayerDefault);

			expect(await mediaPlayerDefault.source()).toBe('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');
		});

		describe('5-way', function () {
			it('should focus `play` button on 5-way down', async function () {
				expect(await mediaPlayerDefault.slider.isFocused()).toBe(true);

				await Page.spotlightDown();

				expect(await mediaPlayerDefault.playButton.isFocused()).toBe(true);
			});

			it('should focus `previous` button on 5-way down, then left', async function () {
				expect(await mediaPlayerDefault.slider.isFocused()).toBe(true);

				await Page.spotlightDown();
				await Page.spotlightLeft();

				expect(await mediaPlayerDefault.previousButton.isFocused()).toBe(true);
			});

			it('should focus back `play` button when navigating back to media controls ', async function () {
				expect(await mediaPlayerDefault.slider.isFocused()).toBe(true);

				await Page.spotlightDown();
				await Page.spotlightLeft();
				expect(await mediaPlayerDefault.previousButton.isFocused()).toBe(true);
				await Page.spotlightLeft();
				expect(await mediaPlayerDefault.shuffleButton.isFocused()).toBe(true);
				await Page.spotlightLeft();
				expect(await mediaPlayerDefault.repeatButton.isFocused()).toBe(true);
				await Page.spotlightUp();
				await Page.spotlightDown();

				expect(await mediaPlayerDefault.playButton.isFocused()).toBe(true);
			});
		});

		describe('using pointer', function () {
			it('should focus `next` button on hover', async function () {
				await mediaPlayerDefault.hover('Next');

				expect(await mediaPlayerDefault.nextButton.isFocused()).toBe(true);
			});

			it('should focus `menu` button on hover', async function () {
				await mediaPlayerDefault.hover('Menu');

				expect(await mediaPlayerDefault.menuButton.isFocused()).toBe(true);
			});
		});
	});

	describe('disabled', function () {
		it('should have the slider knob focused', async function () {
			expect(await mediaPlayerDefault.slider.isFocused()).toBe(true);
			await Page.spotlightRight();

			expect(await mediaPlayerDisabled.slider.isFocused()).toBe(true);
		});

		it('should not play media on playButton click', async function () {
			expect((await mediaPlayerDisabled.knob.getCSSProperty('left')).value).toBe('0px');

			await mediaPlayerDisabled.playButton.click();
			Page.delay(1000);

			expect((await mediaPlayerDisabled.knob.getCSSProperty('left')).value).toBe('0px');
		});

		it('should not play next media on nextButton click', async function () {
			expect(await mediaPlayerDisabled.source()).toBe('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');

			mediaPlayerDisabled.nextButton.click();
			Page.delay(1000);

			expect(await mediaPlayerDisabled.source()).toBe('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');
		});

		describe('5-way', function () {
			it('should focus `play` button on 5-way down', async function () {
				expect(await mediaPlayerDefault.slider.isFocused()).toBe(true);
				await Page.spotlightRight();

				expect(await mediaPlayerDisabled.slider.isFocused()).toBe(true);

				await Page.spotlightDown();

				expect(await mediaPlayerDisabled.playButton.isFocused()).toBe(true);
			});

			it('should focus `previous` button on 5-way down, then left', async function () {
				expect(await mediaPlayerDefault.slider.isFocused()).toBe(true);
				await Page.spotlightRight();

				expect(await mediaPlayerDisabled.slider.isFocused()).toBe(true);

				await Page.spotlightDown();
				await Page.spotlightLeft();

				expect(await mediaPlayerDisabled.previousButton.isFocused()).toBe(true);
			});

			it('should focus back `play` button when navigating back to media controls ', async function () {
				expect(await mediaPlayerDefault.slider.isFocused()).toBe(true);
				await Page.spotlightRight();

				expect(await mediaPlayerDisabled.slider.isFocused()).toBe(true);

				await Page.spotlightDown();
				await Page.spotlightLeft();
				expect(await mediaPlayerDisabled.previousButton.isFocused()).toBe(true);
				await Page.spotlightLeft();
				expect(await mediaPlayerDisabled.shuffleButton.isFocused()).toBe(true);
				await Page.spotlightLeft();
				expect(await mediaPlayerDisabled.repeatButton.isFocused()).toBe(true);
				await Page.spotlightUp();
				await Page.spotlightDown();

				expect(await mediaPlayerDisabled.playButton.isFocused()).toBe(true);
			});
		});

		describe('using pointer', function () {
			it('should focus `next` button on hover', async function () {
				await mediaPlayerDisabled.hover('Next');

				expect(await mediaPlayerDisabled.nextButton.isFocused()).toBe(true);
			});

			it('should focus `menu` button on hover', async function () {
				await mediaPlayerDisabled.hover('Menu');

				expect(await mediaPlayerDisabled.menuButton.isFocused()).toBe(true);
			});
		});
	});

	describe('spotlightDisabled', function () {
		it('should not have the slider knob focused', async function () {
			expect(await mediaPlayerSpotlightDisabled.slider.isFocused()).not.toBe(true);
		});

		it('should play next media on nextButton click', async function () {
			expect(await mediaPlayerSpotlightDisabled.source()).toBe('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');

			await mediaPlayerSpotlightDisabled.nextButton.click();
			await Page.waitForPlayMedia(mediaPlayerSpotlightDisabled);

			expect(await mediaPlayerSpotlightDisabled.source()).toBe('https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3');
		});

		describe('5-way', function () {
			it('should not focus `play` button on 5-way down', async function () {
				expect(await mediaPlayerSpotlightDisabled.slider.isFocused()).not.toBe(true);

				await Page.spotlightDown();

				expect(await mediaPlayerSpotlightDisabled.playButton.isFocused()).not.toBe(true);
			});
		});

		describe('using pointer', function () {
			it('should not focus `next` button on hover', async function () {
				await mediaPlayerSpotlightDisabled.hover('Next');

				expect(await mediaPlayerSpotlightDisabled.nextButton.isFocused()).not.toBe(true);
			});

			it('should not focus `menu` button on hover', async function () {
				await mediaPlayerSpotlightDisabled.hover('Menu');

				expect(await mediaPlayerSpotlightDisabled.menuButton.isFocused()).not.toBe(true);
			});
		});
	});

	describe('tiny', function () {
		it('should play media on playButton click', async function () {
			expect((await mediaPlayerTiny.knob.getCSSProperty('left')).value).toBe('0px');

			await Page.spotlightDown();

			await mediaPlayerTiny.playButton.click();
			await Page.waitForPlayMedia(mediaPlayerTiny);

			expect((mediaPlayerTiny.knob.getCSSProperty('left')).value).not.toBe('0px');
		});

		it('should play next media on nextButton click', async function () {
			expect(await mediaPlayerTiny.source()).toBe('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');

			await mediaPlayerTiny.nextButton.click();
			await Page.waitForPlayMedia(mediaPlayerTiny);

			expect(await mediaPlayerTiny.source()).toBe('https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3');
		});

		describe('5-way', function () {
			it('should focus `play` button on 5-way down', async function () {
				await browser.pause(500);
				await mediaPlayerTiny.focus();
				expect(await mediaPlayerTiny.slider.isFocused()).toBe(true);

				await Page.spotlightDown();

				expect(await mediaPlayerTiny.playButton.isFocused()).toBe(true);
			});

			it('should focus `previous` button on 5-way down, then left', async function () {
				await browser.pause(500);
				await mediaPlayerTiny.focus();
				expect(await mediaPlayerTiny.slider.isFocused()).toBe(true);

				await Page.spotlightDown();
				await Page.spotlightLeft();

				expect(await mediaPlayerTiny.previousButton.isFocused()).toBe(true);
			});

			it('should focus back `play` button when navigating back to media controls ', async function () {
				await browser.pause(500);
				await mediaPlayerTiny.focus();
				expect(await mediaPlayerTiny.slider.isFocused()).toBe(true);

				await Page.spotlightDown();
				await Page.spotlightLeft();
				expect(await mediaPlayerTiny.previousButton.isFocused()).toBe(true);
				await Page.spotlightUp();
				await Page.spotlightDown();

				expect(await mediaPlayerTiny.playButton.isFocused()).toBe(true);
			});
		});

		describe('using pointer', function () {
			it('should focus `next` button on hover', async function () {
				await browser.pause(100);
				await mediaPlayerTiny.hover('Next');

				expect(await mediaPlayerTiny.nextButton.isFocused()).toBe(true);
			});
		});
	});
});
