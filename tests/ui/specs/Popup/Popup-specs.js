let Page = require('./PopupPage'),
	{validateTitle, expectClosed, expectOpen, expectNoneScrimOpen} = require('./Popup-utils.js');

describe('Popup', function () {

	const popupCommon = Page.popupCommon;

	beforeEach(async function () {
		await Page.open();
	});

	it('should focus the first button on start', async function () {
		expect(await popupCommon.buttonPopup1.isFocused()).to.be.true();
	});

	it('should not have the popup on start', async function () {
		await expectClosed(popupCommon);
	});

	describe('with AutoDismiss', function () {

		const popup = Page.components.popup1;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup1.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup with AutoDismiss');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.waitForFocused(popup.buttonOK);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.waitForFocused(popup.buttonOK);
				await Page.spotlightRight();

				await Page.waitForFocused(popup.buttonCancel);
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.waitForFocused(popup.buttonOK);
				await Page.spotlightRight();
				await Page.spotlightLeft();

				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);

				await Page.spotlightSelect();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup1.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup1.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			it('should dismiss the popup on escape key', async function () {
				await popupCommon.buttonPopup1.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await popupCommon.buttonPopup1.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.clickPopupFloatLayer();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup1.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on click in popup container', async function () {
				await popupCommon.buttonPopup1.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.delay(300);

				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', async function () {
				await popupCommon.buttonPopup1.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.delay(300);

				await popup.buttonCancel.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});
		});
	});

	describe('without AutoDismiss', function () {

		const popup = Page.components.popup2;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup2.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup without AutoDismiss');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.waitForFocused(popup.buttonClose);
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should dismiss the popup on 5-way select close button', async function () {
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.waitForFocused(popup.buttonClose);
				await Page.spotlightSelect();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should not dismiss the popup and should not move spotlight from the popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.backKey();
				browser.pause(300);  // Wait for delay in case of transition (shouldn't happen)
				await expectOpen(popupCommon);
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should not dismiss the popup on click on outside the popup', async function () {
				await popupCommon.buttonPopup2.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.delay(300);
				await Page.clickPopupFloatLayer();
				browser.pause(300);  // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup2.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on ok click in popup container', async function () {
				await popupCommon.buttonPopup2.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.delay(300);
				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});
		});
	});

	describe('with no Component', function () {

		const popup = Page.components.popup3;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup3.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup with no Component');
		});

		describe('using 5-way', function () {

			it('should open the popup in no Component button select', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup3.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should dismiss the popup on escape key', async function () {
				await popupCommon.buttonPopup3.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await popupCommon.buttonPopup3.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.delay(300);
				await Page.clickPopupFloatLayer();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup3.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});
		});
	});

	describe('with noAnimation', function () {

		const popup = Page.components.popup4;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup4.click();
			browser.pause(100); // needed to pass instead of waitTransitionEnd
			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup without Animation');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				await expectOpen(popupCommon);

				await Page.waitForFocused(popup.buttonOK);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way down and right in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.waitForFocused(popup.buttonCancel);
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way down, right then left in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightLeft();
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup4.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.backKey();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup4.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			it('should dismiss the popup on escape key', async function () {
				await popupCommon.buttonPopup4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.backKey();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await popupCommon.buttonPopup4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.clickPopupFloatLayer();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on click in popup container', async function () {
				await popupCommon.buttonPopup4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await popup.buttonOK.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', async function () {
				await popupCommon.buttonPopup4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await popup.buttonCancel.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
			});
		});
	});

	describe('without Close Button', function () {

		const popup = Page.components.popup5;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup5.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup without Close button');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.waitForFocused(popup.buttonOK);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);

				await Page.spotlightRight();
				await Page.waitForFocused(popup.buttonCancel);
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should close the popup on spotlight select on cancel in the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);

				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup5.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup5.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on ok click in popup container', async function () {
				await popupCommon.buttonPopup5.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.delay(300);

				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});
		});
	});

	describe('with spotlightRestrict - self-only', function () {

		const popup = Page.components.popup6;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup6.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup spotlightRestrict is self-only');
		});

		describe('using 5-way', function () {
			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);

				await Page.spotlightRight();
				await Page.waitForFocused(popup.buttonCancel);
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);

				await Page.spotlightRight();
				await Page.spotlightLeft();

				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);

				await Page.spotlightRight();
				await Page.waitForFocused(popup.buttonCancel);
				await Page.spotlightDown();

				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup6.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup6.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on ok click in popup container', async function () {
				await popupCommon.buttonPopup6.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.delay(300);

				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});
		});

		describe('using 5-way and Pointer', function () {

			it('should retain spotlight on the Close button inside the popup', async function () {
				await popupCommon.buttonPopup6.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.showPointerByKeycode();
				// Position the pointer inside popup to the right of the Cancel button (step 4)
				await $('#buttonCancel').moveTo({xOffset: 200, yOffset: 200});
				// 5-way to the Cancel button
				await Page.spotlightLeft();

				// Spotlight is on Cancel button (verify step 4)
				expect(await popup.buttonCancel.isFocused()).to.be.true();

				// 5-way Up (step 5)
				await Page.spotlightUp();

				// Spotlight remains on the Close button inside the popup (verify step 5)
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should focus the popup button when changing from pointer to 5-way in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();

				// Spotlight is on the button 'spotlightRestrict - self-only' (verify step 3)
				expect(await popupCommon.buttonPopup6.isFocused()).to.be.true();

				// Open popup (step 4)
				await popupCommon.buttonPopup6.click();
				await Page.waitForOpen(popup);

				// Verify the popup opens (verify step 4) - Spotlight will be on buttonOK by default
				await expectOpen(popupCommon);

				// Wave the pointer to change to cursor mode (step 5)
				await Page.showPointerByKeycode();
				// Position the pointer on the right of the Cancel button inside popup
				await $('#buttonCancel').moveTo({xOffset: 200, yOffset: 200});

				// Spotlight on button in popup is blur (verify step 5)
				expect(await popup.buttonOK.isFocused()).to.be.false();

				// Change from pointer to 5-way mode (step 6)
				await Page.spotlightLeft();

				// Spotlight is on the button inside the Popup (verify step 6)
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});
		});
	});

	describe('with spotlightRestrict - self-first', function () {

		const popup = Page.components.popup7;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup7.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup spotlightRestrict is self-first');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.waitForFocused(popup.buttonOK);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);

				await Page.spotlightRight();
				await Page.waitForFocused(popup.buttonCancel);
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.waitForFocused(popup.buttonOK);
				await Page.spotlightRight();
				await Page.spotlightLeft();

				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot the popup button on 5-way down, right then down in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);

				await Page.spotlightRight();
				await Page.waitForFocused(popup.buttonCancel);
				await Page.spotlightDown();
				await Page.waitForFocused(popupCommon.buttonPopup7);

				expect(await popupCommon.buttonPopup7.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup7.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup7.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on ok click in popup container', async function () {
				await popupCommon.buttonPopup7.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.delay(300);

				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});
		});

		describe('using 5-way and Pointer', function () {

			it('should navigate to nearest neighbor', async function () {
				await popupCommon.buttonPopup7.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.showPointerByKeycode();
				// Position the pointer inside popup to the right of the Cancel button (step 4)
				await $('#buttonCancel').moveTo({xOffset: 200, yOffset: 200});
				// 5-way to the Cancel button (step 5)
				await Page.spotlightLeft();

				// Spotlight is on Cancel button (verify step 5)
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});
		});
	});

	describe('with scrimType - transparent', function () {

		const popup = Page.components.popup8;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup8.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup scrimType is transparent');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.waitForFocused(popup.buttonOK);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);

				await Page.spotlightRight();
				await Page.waitForFocused(popup.buttonCancel);
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightLeft();

				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot the popup button on 5-way right then down in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);

				await Page.spotlightRight();
				await Page.waitForFocused(popup.buttonCancel);
				await Page.spotlightDown();
				await Page.waitForFocused(popupCommon.buttonPopup8);

				expect(await popupCommon.buttonPopup8.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup8.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should dismiss the popup on escape key', async function () {
				await popupCommon.buttonPopup8.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await popupCommon.buttonPopup8.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.delay(300);

				await Page.clickPopupFloatLayer();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup8.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on click in popup container', async function () {
				await popupCommon.buttonPopup8.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.delay(300);

				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', async function () {
				await popupCommon.buttonPopup8.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.delay(300);

				await popup.buttonCancel.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});
		});
	});

	describe('with scrimType - none', function () {

		const popup = Page.components.popup9;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup9.click();
			await Page.waitForOpen(popup);

			await expectNoneScrimOpen(popupCommon);
			await validateTitle(popup, 'Popup scrimType is none');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectNoneScrimOpen(popupCommon);

				await Page.waitForFocused(popup.buttonOK);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectNoneScrimOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);

				await Page.spotlightRight();
				await Page.waitForFocused(popup.buttonCancel);
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectNoneScrimOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);

				await Page.spotlightRight();
				await Page.spotlightLeft();

				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot the popup button on 5-way right then down in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectNoneScrimOpen(popupCommon);
				await Page.waitForFocused(popup.buttonOK);

				await Page.spotlightRight();
				await Page.waitForFocused(popup.buttonCancel);
				await Page.spotlightDown();
				await Page.waitForFocused(popupCommon.buttonPopup9);

				expect(await popupCommon.buttonPopup9.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectNoneScrimOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup9.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should dismiss the popup on escape key', async function () {
				await popupCommon.buttonPopup9.click();

				await expectNoneScrimOpen(popupCommon);

				await Page.waitForOpen(popup);
				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should open the popup without scrim on click', async function () {
				await popupCommon.buttonPopup9.click();

				await expectNoneScrimOpen(popupCommon);
			});

			it('should close the popup on click in popup container', async function () {
				await popupCommon.buttonPopup9.click();

				await expectNoneScrimOpen(popupCommon);

				await Page.waitForOpen(popup);
				await Page.delay(300);
				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should close the popup on cancel click in popup container', async function () {
				await popupCommon.buttonPopup9.click();

				await expectNoneScrimOpen(popupCommon);

				await Page.waitForOpen(popup);
				await Page.delay(300);
				await popup.buttonCancel.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

		});
	});

	describe('toggling open', function () {

		it('should allow spotlight navigation', async function () {
			await popupCommon.buttonPopup10.click();

			await Page.delay(500);

			await Page.spotlightUp();

			expect(await popupCommon.buttonPopup7.isFocused()).to.be.true();
		});
	});
});
