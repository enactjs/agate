const Page = require('./ContextualPopupDecoratorPage');

describe('ContextualPopupDecorator', function () {
	beforeEach(function () {
		Page.open();
	});

	const {
		button1,
		button2
	} = Page.components;

	describe('not using open', function () {
		it('should focus the first button on start', function () {
			expect(button1.self.isFocused()).to.be.true();
		});

		describe('using 5-way', function () {

			it('should have Spotlight on button when ContextualPopup1 opens', function () {
				let popupButton = $('#popupButton1');

				Page.spotlightSelect();
				expect(popupButton.isFocused()).to.be.true();
			});

			it('should focus second button on 5-way right', function () {
				button1.focus();
				Page.spotlightRight();
				expect(button2.self.isFocused()).to.be.true();
			});

			it('should have Spotlight on button when ContextualPopup2 opens', function () {
				let popupButton = $('#popupButton2');

				button2.focus();
				Page.spotlightSelect();
				expect(popupButton.isFocused()).to.be.true();
			});
		});
	});
});
