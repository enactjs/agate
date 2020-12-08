const Page = require('./SliderButtonPage');

describe('SliderButton', function () {
	beforeEach(function () {
		Page.open();
	});

	describe('slider button with three items', function () {
		const sliderButton = Page.components.sliderButtonThreeItems;

		it('should have focus on first button at start', function () {
			expect(sliderButton.knobValue().getAttribute('proportion')).to.equal('0');
		});

		it('should have focus on second button when clicked on `Ridiculous Speed`', function () {
			sliderButton.clickableItem(3).click();

			expect(sliderButton.knobValue().getAttribute('proportion')).to.equal('0.5');
		});

		it('should have focus on third button when clicked `Ludicrous Speed`', function () {
			sliderButton.clickableItem(4).click();

			expect(sliderButton.knobValue().getAttribute('proportion')).to.equal('1');
		});
	});

	describe('slider button with five items', function () {
		const sliderButton = Page.components.sliderButtonFiveItems;

		it('should have focus on first button at start', function () {
			expect(sliderButton.knobValue().getAttribute('proportion')).to.equal('0');
		});

		it('should have focus on second item when clicked on `Ridiculous Speed`', function () {
			sliderButton.clickableItem(3).click();

			expect(sliderButton.knobValue().getAttribute('proportion')).to.equal('0.25');
		});

		it('should have focus on third item when clicked on `Ludicrous Speed`', function () {
			sliderButton.clickableItem(4).click();

			expect(sliderButton.knobValue().getAttribute('proportion')).to.equal('0.5');
		});

		it('should have focus on forth item when clicked on `Bananas Speed`', function () {
			sliderButton.clickableItem(5).click();

			expect(sliderButton.knobValue().getAttribute('proportion')).to.equal('0.75');
		});

		it('should have focus on fifth item when clicked on `OK Enough Speed`', function () {
			sliderButton.clickableItem(6).click();

			expect(sliderButton.knobValue().getAttribute('proportion')).to.equal('1');
		});
	});

	describe('disabled', function () {
		const sliderButton = Page.components.sliderButtonDisabled;

		it('should have focus on first item at start', function () {
			expect(sliderButton.knobValue().getAttribute('proportion')).to.equal('0');
		});

		it('should not move focus when clicked on second item', function () {
			sliderButton.clickableItem(3).click();

			expect(sliderButton.knobValue().getAttribute('proportion')).to.equal('0');
		});
	});
});
