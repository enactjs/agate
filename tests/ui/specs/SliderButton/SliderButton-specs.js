const Page = require('./SliderButtonPage');

describe('SliderButton', function () {
	beforeEach(async function () {
		await Page.open();
	});

	describe('slider button with three items', function () {
		const sliderButton = Page.components.sliderButtonThreeItems;

		it('should have focus on first button at start', async function () {
			expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0');
		});

		it('should have focus on second button when clicked on `Ridiculous Speed`', async function () {
			await sliderButton.clickableItem(1).click();

			expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0.5');
		});

		it('should have focus on third button when clicked `Ludicrous Speed`', async function () {
			await sliderButton.clickableItem(2).click();

			expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('1');
		});

		describe('5-way', function () {
			it('should change value between options on 5-way navigation', async function () {
				await Page.spotlightRight();
				expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0.5');
				await Page.spotlightRight();
				expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('1');
				await Page.spotlightLeft();
				expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0.5');
			});
		});
	});

	describe('slider button with five items', function () {
		const sliderButton = Page.components.sliderButtonFiveItems;

		it('should have focus on first button at start', async function () {
			expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0');
		});

		it('should have focus on second item when clicked on `Ridiculous Speed`', async function () {
			await sliderButton.clickableItem(1).click();

			expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0.25');
		});

		it('should have focus on third item when clicked on `Ludicrous Speed`', async function () {
			await sliderButton.clickableItem(2).click();

			expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0.5');
		});

		it('should have focus on forth item when clicked on `Bananas Speed`', async function () {
			await sliderButton.clickableItem(3).click();

			expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0.75');
		});

		it('should have focus on fifth item when clicked on `OK Enough Speed`', async function () {
			await sliderButton.clickableItem(4).click();

			expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('1');
		});

		describe('5-way', function () {
			it('should change value between options on 5-way navigation', async function () {
				// first move focus on current sliderButton
				await Page.spotlightDown();
				// try to move focus to second option
				await Page.spotlightRight();
				expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0.25');
				await Page.spotlightRight();
				expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0.5');
				await Page.spotlightRight();
				expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0.75');
				await Page.spotlightRight();
				expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('1');
				await Page.spotlightLeft();
				await Page.spotlightLeft();
				expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0.5');
			});
		});
	});

	describe('disabled', function () {
		const sliderButton = Page.components.sliderButtonDisabled;

		it('should have focus on first item at start', async function () {
			expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0');
		});

		it('should not move focus when clicked on second item', async function () {
			await sliderButton.clickableItem(2).click();

			expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0');
		});

		describe('5-way', function () {
			it('should not change value between options on 5-way navigation', async function () {
				// first move focus on current sliderButton
				await Page.spotlightDown();
				await Page.spotlightDown();
				// try to move focus to second option
				await Page.spotlightRight();
				expect(await sliderButton.getKnob().getAttribute('proportion')).to.equal('0');
			});
		});
	});
});
