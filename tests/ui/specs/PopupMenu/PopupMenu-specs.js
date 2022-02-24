let Page = require('./PopupMenuPage'),
	{validateTitle, expectClosed, expectOpen} = require('./PopupMenu-utils.js');

describe('PopupMenu', function () {

	const popupMenuCommon = Page.popupMenuCommon;

	beforeEach(async function () {
		await Page.open();
	});

	it('should focus the first button on start', async function () {
		expect(await popupMenuCommon.buttonPopupMenu1.isFocused()).to.be.true();
	});

	it('should not have the popupMenu on start', function () {
		expectClosed(popupMenuCommon);
	});

	describe('with AutoDismiss', function () {

		const popupMenu = Page.components.popupMenu1;

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				await expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonOK);
				expect(await popupMenu.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				await expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonOK);
				await Page.spotlightRight();

				Page.waitForFocused(popupMenu.buttonCancel);
				expect(await popupMenu.buttonCancel.isFocused()).to.be.true();
			});

			it('should dismiss the popupMenu on escape key', async function () {
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
				Page.waitForFocused(popupMenu.buttonOK);

				await Page.spotlightSelect();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
				expect(await popupMenuCommon.buttonPopupMenu1.isFocused()).to.be.true();
			});

			it('should spot back the popupMenu button on auto dismiss the popupMenu', async function () {
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
				expect(await popupMenuCommon.buttonPopupMenu1.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popupMenu with scrim on click', function () {
				popupMenuCommon.buttonPopupMenu1.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
			});

			it('should dismiss the popupMenu on escape key', async function () {
				popupMenuCommon.buttonPopupMenu1.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on click in popupMenu container', async function () {
				popupMenuCommon.buttonPopupMenu1.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonOK.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on cancel click in popupMenu container', async function () {
				popupMenuCommon.buttonPopupMenu1.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonCancel.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});
		});
	});

	describe('without AutoDismiss', function () {

		const popupMenu = Page.components.popupMenu2;

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonOK);
				expect(await popupMenu.buttonOK.isFocused()).to.be.true();
			});

			it('should not dismiss the popupMenu on escape key', async function () {
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				browser.pause(300);  // Wait for delay in case of transition (shouldn't happen)

				expectOpen(popupMenuCommon);
			});
		});

		describe('using pointer', function () {

			it('should open the popupMenu with scrim on click', async function () {
				popupMenuCommon.buttonPopupMenu2.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
			});

			it('should not dismiss the popupMenu and should not move spotlight from the popupMenu container', async function () {
				popupMenuCommon.buttonPopupMenu2.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				browser.pause(300);  // Wait for delay in case of transition (shouldn't happen)

				expectOpen(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on click in popupMenu container', async function () {
				popupMenuCommon.buttonPopupMenu2.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonOK.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on cancel click in popupMenu container', async function () {
				popupMenuCommon.buttonPopupMenu2.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonCancel.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});
		});
	});

	describe('with no Component', function () {
		const popupMenu = Page.components.popupMenu3;

		describe('using 5-way', function () {

			it('should dismiss the popupMenu on escape key', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should spot back the popupMenu button on auto dismiss the popupMenu', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
				expect(await popupMenuCommon.buttonPopupMenu3.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popupMenu with scrim on click', async function () {
				popupMenuCommon.buttonPopupMenu3.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
			});

			it('should dismiss the popupMenu on escape key', async function () {
				popupMenuCommon.buttonPopupMenu3.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});
		});
	});

	describe('with noAnimation', function () {

		const popupMenu = Page.components.popupMenu4;

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonOK);
				expect(await popupMenu.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way down and right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				await Page.spotlightRight();
				Page.waitForFocused(popupMenu.buttonCancel);
				expect(await popupMenu.buttonCancel.isFocused()).to.be.true();
			});

			it('should dismiss the popupMenu on escape key', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				await Page.backKey();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectClosed(popupMenuCommon);
			});

			it('should spot back the popupMenu button on auto dismiss the popupMenu', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				await Page.backKey();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectClosed(popupMenuCommon);
				expect(await popupMenuCommon.buttonPopupMenu4.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popupMenu with scrim on click', async function () {
				popupMenuCommon.buttonPopupMenu4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);
			});

			it('should dismiss the popupMenu on escape key', async function () {
				popupMenuCommon.buttonPopupMenu4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				await Page.backKey();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on click in popupMenu container', async function () {
				popupMenuCommon.buttonPopupMenu4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				popupMenu.buttonOK.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on cancel click in popupMenu container', async function () {
				popupMenuCommon.buttonPopupMenu4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				popupMenu.buttonCancel.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectClosed(popupMenuCommon);
			});
		});
	});


	describe('with Close Button', function () {

		const popupMenu = Page.components.popupMenu5;

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonClose);
				expect(await popupMenu.buttonClose.isFocused()).to.be.true();
			});

			it('should dismiss the popupMenu on escape key', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should dismiss the popupMenu on 5-way select close button', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonClose);
				await Page.spotlightSelect();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should spot back the popupMenu button on auto dismiss the popupMenu', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
				expect(await popupMenuCommon.buttonPopupMenu5.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popupMenu with scrim on click', async function () {
				popupMenuCommon.buttonPopupMenu5.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on close button click in popupMenu container', async function () {
				popupMenuCommon.buttonPopupMenu5.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonClose.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

		});
	});

	describe('with Title', function () {

		const popupMenu = Page.components.popupMenu6;

		it('should have correct title', function () {
			popupMenuCommon.buttonPopupMenu6.click();
			Page.waitForOpen(popupMenu);

			expectOpen(popupMenuCommon);
			validateTitle(popupMenu, 'PopupMenu title');
		});

		describe('using 5-way', function () {
			it('should spot default button in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				browser.pause(100);
				await Page.waitForOpen(popupMenu);

				await expectOpen(popupMenuCommon);

				await Page.waitForFocused(popupMenu.buttonOK);
				browser.pause(300);
				expect(await popupMenu.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonOK);
				await Page.spotlightRight();

				Page.waitForFocused(popupMenu.buttonCancel);
				expect(await popupMenu.buttonCancel.isFocused()).to.be.true();
			});

			it('should dismiss the popupMenu on escape key', async function () {
				await Page.spotlightDown();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should spot back the popupMenu button on auto dismiss the popupMenu', async function () {
				await Page.spotlightDown();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
				expect(await popupMenuCommon.buttonPopupMenu6.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			it('should open the popupMenu with scrim on click', async function () {
				popupMenuCommon.buttonPopupMenu6.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
			});

			it('should dismiss the popupMenu on escape key', async function () {
				popupMenuCommon.buttonPopupMenu6.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on click in popupMenu container', async function () {
				popupMenuCommon.buttonPopupMenu6.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonOK.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on cancel click in popupMenu container', async function () {
				popupMenuCommon.buttonPopupMenu6.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonCancel.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});
		});
	});

	describe('with close button label', function () {

		const popupMenu = Page.components.popupMenu7;

		it('should have correct closeButtonLabel', async function () {
			popupMenuCommon.buttonPopupMenu7.click();
			Page.waitForOpen(popupMenu);

			expectOpen(popupMenuCommon);
			expect(await popupMenu.label).to.equal('Click me!');
		});

		describe('using 5-way', function () {
			it('should dismiss the popupMenu on escape key', async function () {
				await Page.spotlightDown();
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should spot back the popupMenu button on auto dismiss the popupMenu', async function () {
				await Page.spotlightDown();
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
				expect(await popupMenuCommon.buttonPopupMenu7.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			it('should open the popupMenu with scrim on click', async function () {
				popupMenuCommon.buttonPopupMenu7.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
			});

			it('should dismiss the popupMenu on escape key', async function () {
				popupMenuCommon.buttonPopupMenu7.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				await Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on close button click in popupMenu container', async function () {
				popupMenuCommon.buttonPopupMenu7.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonClose.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});
		});
	});

	describe('toggling open', function () {

		it('should allow spotlight navigation', async function () {
			popupMenuCommon.buttonPopupMenu8.click();

			await Page.delay(1000);

			expect(await popupMenuCommon.buttonPopupMenu8.isFocused()).to.be.true();
		});
	});
});
