let Page = require('./DrawerPage'),
	{validateTitle, expectClosed, expectNoneScrimOpen, expectOpen} = require('./Drawer-utils.js');

describe('Drawer', function () {

	const drawerCommon = Page.drawerCommon;

	beforeEach(async function () {
		await Page.open();
	});

	it('should focus the first button on start', async function () {
		expect(await drawerCommon.buttonDrawer1.isFocused()).to.be.true();
	});

	it('should not have the drawer on start', async function () {
		await expectClosed(drawerCommon);
	});

	describe('with no line', function () {

		const drawer = Page.components.drawer1;

		it('should have correct heading', async function () {
			await drawerCommon.buttonDrawer1.click();
			await Page.waitForOpen(drawer);

			await expectOpen(drawerCommon);
			await validateTitle(drawer, 'Drawer with no line');
		});

		it('should not have a line under the heading text', async function () {
			await drawerCommon.buttonDrawer1.click();
			await Page.waitForOpen(drawer);

			await expectOpen(drawerCommon);
			expect(await drawer.hasLine).to.not.be.true();
		});

		describe('using 5-way', function () {
			it('should open drawer', async function () {
				await Page.spotlightSelect();
				await Page.waitForOpen(drawer);

				await expectOpen(drawerCommon);
				expect(await drawer.isOpen).to.be.true();
			});

			it('should close drawer with cancel button on 5-way right in drawer container', async function () {
				await Page.spotlightSelect();
				await Page.waitForOpen(drawer);

				await expectOpen(drawerCommon);

				await Page.spotlightRight();
				await Page.spotlightSelect();

				await Page.waitForClose(drawer);

				await expectClosed(drawerCommon);
			});
		});

		describe('using pointer', function () {
			it('should open the drawer with scrim on click', async function () {
				await drawerCommon.buttonDrawer1.click();
				await Page.waitForOpen(drawer);

				await expectOpen(drawerCommon);
			});

			it('should close the drawer and scrim on cancel click in drawer container', async function () {
				await drawerCommon.buttonDrawer1.click();
				await Page.waitForOpen(drawer);

				await expectOpen(drawerCommon);

				await drawer.buttonCancel.click();
				await Page.waitForClose(drawer);

				await expectClosed(drawerCommon);
			});
		});
	});

	describe('with noAnimation', function () {

		const drawer = Page.components.drawer2;

		it('should have correct heading', async function () {
			await drawerCommon.buttonDrawer2.click();
			await browser.pause(300); // needed to pass instead of waitTransitionEnd
			await expectOpen(drawerCommon);
			await validateTitle(drawer, 'Drawer without animation');
		});

		describe('using 5-way', function () {

			it('should open drawer', async function () {
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await browser.pause(400); // needed to pass instead of waitTransitionEnd

				await expectOpen(drawerCommon);
				expect(await drawer.isOpen).to.be.true();
			});

			it('should close drawer with cancel button on 5-way right in drawer container', async function () {
				await Page.spotlightRight();
				await Page.spotlightSelect();

				await expectOpen(drawerCommon);

				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForClose(drawer);

				await expectClosed(drawerCommon);
			});
		});

		describe('using pointer', function () {

			it('should open the drawer with scrim on click', async function () {
				await drawerCommon.buttonDrawer2.click();
				await browser.pause(400); // needed to pass instead of waitTransitionEnd

				await expectOpen(drawerCommon);
			});

			it('should close the drawer and scrim on cancel click in drawer container', async function () {
				await drawerCommon.buttonDrawer2.click();
				await browser.pause(400); // needed to pass instead of waitTransitionEnd

				await expectOpen(drawerCommon);

				await drawer.buttonCancel.click();
				await browser.pause(400); // needed to pass instead of waitTransitionEnd

				await expectClosed(drawerCommon);
			});
		});
	});

	describe('with scrimType - transparent', function () {

		const drawer = Page.components.drawer3;

		it('should have correct heading', async function () {
			await drawerCommon.buttonDrawer3.click();
			await Page.waitForOpen(drawer);

			await expectOpen(drawerCommon);
			await validateTitle(drawer, 'Drawer with transparent scrim');
		});

		describe('using 5-way', function () {

			it('should open drawer', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(drawer);

				await expectOpen(drawerCommon);
				expect(await drawer.isOpen).to.be.true();
			});

			it('should close drawer with cancel button on 5-way right in drawer container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(drawer);

				await expectOpen(drawerCommon);

				await Page.spotlightRight();
				await Page.spotlightSelect();

				await Page.waitForClose(drawer);

				await expectClosed(drawerCommon);
			});
		});

		describe('using pointer', function () {

			it('should open the drawer with scrim on click', async function () {
				await drawerCommon.buttonDrawer3.click();
				await Page.waitForOpen(drawer);

				await expectOpen(drawerCommon);
			});

			it('should close the drawer and scrim on cancel click in drawer container', async function () {
				await drawerCommon.buttonDrawer3.click();
				await Page.waitForOpen(drawer);

				await expectOpen(drawerCommon);

				await drawer.buttonCancel.click();
				await Page.waitForClose(drawer);

				await expectClosed(drawerCommon);
			});
		});
	});

	describe('with scrimType - none', function () {

		const drawer = Page.components.drawer4;

		it('should have correct heading', async function () {
			await drawerCommon.buttonDrawer4.click();
			await Page.waitForOpen(drawer);

			await expectNoneScrimOpen(drawerCommon);
			await validateTitle(drawer, 'Drawer without scrim');
		});

		describe('using 5-way', function () {

			it('should open drawer', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(drawer);

				await expectNoneScrimOpen(drawerCommon);
				expect(await drawer.isOpen).to.be.true();
			});

			it('should close drawer with cancel button on 5-way right in drawer container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(drawer);

				await expectNoneScrimOpen(drawerCommon);

				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForClose(drawer);

				await expectClosed(drawerCommon);
			});
		});

		describe('using pointer', function () {

			it('should open the drawer without scrim on click', async function () {
				await drawerCommon.buttonDrawer4.click();

				await expectNoneScrimOpen(drawerCommon);
			});

			it('should close the popup on click in drawer container', async function () {
				drawerCommon.buttonDrawer4.click();
				await Page.waitForOpen(drawer);

				await expectNoneScrimOpen(drawerCommon);

				await drawer.buttonOK.click();
				await Page.waitForClose(drawer);

				await expectClosed(drawerCommon);
			});

			it('should close the drawer on cancel click in drawer container', async function () {
				await drawerCommon.buttonDrawer4.click();
				await Page.waitForOpen(drawer);

				await expectNoneScrimOpen(drawerCommon);

				await drawer.buttonCancel.click();
				await Page.waitForClose(drawer);

				await expectClosed(drawerCommon);
			});
		});
	});
});
