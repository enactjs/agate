const Page = require('./ContextualPopupDecoratorPage');

describe('ContextualPopupDecorator', function () {
	beforeEach(async function () {
		await Page.open();
	});

	const {
		button1,
		button2
	} = Page.components;

	describe('not using open', function () {
		it('should focus the first button on start', async function () {
			expect(await button1.self.isFocused()).to.be.true();
		});

		describe('using 5-way', function () {
			it('should focus second button on 5-way right', async function () {
				await button1.focus();
				await Page.spotlightRight();
				expect(await button2.self.isFocused()).to.be.true();
			});
		});
	});

	describe('using open', function () {
		describe('using 5-way', function () {
			it('should have Spotlight on button when ContextualPopup1 opens', async function () {
				let popupButton = $('#popupButton1');

				await Page.spotlightSelect();
				expect(await popupButton.isFocused()).to.be.true();
			});

			it('should have Spotlight on button when ContextualPopup2 opens', async function () {
				let popupButton = $('#popupButton2');

				await button2.focus();
				await Page.spotlightSelect();
				expect(await popupButton.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			it('should open when clicked', async function () {
				await button1.self.click();
				expect(await button1.isOpen).to.be.true();
			});

			it('should close when clicking twice', async function () {
				await button1.self.click();
				await button1.self.click();
				await expect(await button1.isOpen).to.be.false();
			});

			it('should close when clicking outside', async function () {
				await button1.self.click();

				// Click in the area outside the ContextualPopupDecorator (in the empty space created by the wrapper)
				const wrapper = $('.ThemeDecorator_ThemeDecorator_bg');
				await wrapper.click({x: 0, y: 0});

				expect(await button1.isOpen).to.be.false();
			});
		});
	});
});
