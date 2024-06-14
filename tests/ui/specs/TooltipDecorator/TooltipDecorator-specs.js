const Page = require('./TooltipDecoratorPage');

describe('TooltipDecorator', function () {

	beforeEach(async function () {
		await Page.open();
	});

	const {
		tooltipButtonDefault,
		tooltipButtonDelayed,
		tooltipButtonDisabled
	} = Page.components;

	describe('focus management', function () {
		it('should focus the first button on start', async function () {
			expect(await tooltipButtonDefault.self.isFocused()).toBe(true);
		});

		it('should focus the first button and show tooltipDefault after 500ms on hover', async function () {
			expect(await tooltipButtonDefault.self.isFocused()).toBe(true);

			await tooltipButtonDefault.hover();
			await Page.delay(500);

			expect(await tooltipButtonDefault.isTooltipShowing).toBe(true);
		});

		it('should focus the disabled button when hovered', async function () {
			await tooltipButtonDisabled.hover();
			expect(await tooltipButtonDisabled.self.isFocused()).toBe(true);
		});
	});

	describe('using 5-way', function () {
		it('should focus second button on 5-way right', async function () {
			expect(await tooltipButtonDefault.self.isFocused()).toBe(true);

			await Page.spotlightRight();
			expect(await tooltipButtonDelayed.self.isFocused()).toBe(true);
		});
	});

	describe('pointer', function () {
		it('should focus second button and display correct tooltipText after 1000ms delay on hover', async function () {
			await tooltipButtonDelayed.hover();
			await Page.delay(1000);

			expect(await tooltipButtonDelayed.tooltipText).toBe('Hello Tooltip Button Delayed');
		});
	});
});
