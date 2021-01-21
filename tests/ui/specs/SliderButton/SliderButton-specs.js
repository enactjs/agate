const Page = require('./SliderButtonPage');

describe('SliderButton', function () {
	beforeEach(function () {
		Page.open();
	});

	describe('slider button with three items', function () {
		const sliderButton = Page.components.sliderButtonThreeItems;

		it('should have focus on first button at start', function () {
			expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0');
		});

		it('should have focus on second button when clicked on `Ridiculous Speed`', function () {
			sliderButton.clickableItem(1).click();

			expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0.5');
		});

		it('should have focus on third button when clicked `Ludicrous Speed`', function () {
			sliderButton.clickableItem(2).click();

			expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('1');
		});

		describe('5-way', function () {
			it('should move focus between options on 5-way navigation', function () {
				Page.spotlightRight();
				expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0.5');
				Page.spotlightRight();
				expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('1');
				Page.spotlightLeft();
				expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0.5');
			});
		});
	});

	describe('slider button with five items', function () {
		const sliderButton = Page.components.sliderButtonFiveItems;

		it('should have focus on first button at start', function () {
			expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0');
		});

		it('should have focus on second item when clicked on `Ridiculous Speed`', function () {
			sliderButton.clickableItem(1).click();

			expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0.25');
		});

		it('should have focus on third item when clicked on `Ludicrous Speed`', function () {
			sliderButton.clickableItem(2).click();

			expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0.5');
		});

		it('should have focus on forth item when clicked on `Bananas Speed`', function () {
			sliderButton.clickableItem(3).click();

			expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0.75');
		});

		it('should have focus on fifth item when clicked on `OK Enough Speed`', function () {
			sliderButton.clickableItem(4).click();

			expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('1');
		});

		describe('5-way', function () {
			it('should move focus between options on 5-way navigation', function () {
				// first move focus on current sliderButton
				Page.spotlightDown();
				// try to move focus to second option
				Page.spotlightRight();
				expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0.25');
				Page.spotlightRight();
				expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0.5');
				Page.spotlightRight();
				expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0.75');
				Page.spotlightRight();
				expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('1');
				Page.spotlightLeft();
				Page.spotlightLeft();
				expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0.5');
			});
		});
	});

	describe('disabled', function () {
		const sliderButton = Page.components.sliderButtonDisabled;

		it('should have focus on first item at start', function () {
			expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0');
		});

		it('should not move focus when clicked on second item', function () {
			sliderButton.clickableItem(2).click();

			expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0');
		});

		describe('5-way', function () {
			it('should not move focus between options on 5-way navigation', function () {
				// first move focus on current sliderButton
				Page.spotlightDown();
				Page.spotlightDown();
				// try to move focus to second option
				Page.spotlightRight();
				expect(sliderButton.getKnob().getAttribute('proportion')).to.equal('0');
			});
		});
	});
});
