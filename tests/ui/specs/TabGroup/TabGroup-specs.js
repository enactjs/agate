const Page = require('./TabGroupPage');

describe('TabGroup', function () {
	beforeEach(async function () {
		await Page.open();
	});

	describe('default', function () {
		const tabGroup = Page.components.tabGroupDefault;

		describe('first tab', function () {
			it('should have focus on first tab on start', async function () {
				expect(await tabGroup.focusableTabs(1).isFocused()).toBe(true);
			});

			it('should display `home` icon', async function () {
				expect(await tabGroup.iconValue(1)).toBe(983231); // decimal converted charCode of Unicode 'home' character
			});
		});

		describe('second tab', function () {
			it('should be focused with 5-way Right', async function () {
				await tabGroup.focusTab(1);
				await Page.spotlightRight();

				expect(await tabGroup.focusableTabs(3).isFocused()).toBe(true); // there is a dummy sibling added by Spottable
			});

			it('should display `setting` icon', async function () {
				expect(await tabGroup.iconValue(3)).toBe(983083); // decimal converted charCode of Unicode 'setting' character
			});
		});

		describe('third tab', function () {
			it('should be focused with 5-way Right', async function () {
				await tabGroup.focusTab(3);
				await Page.spotlightRight();

				expect(await tabGroup.focusableTabs(5).isFocused()).toBe(true); // there is a dummy sibling added by Spottable
			});

			it('should display `display` icon', async function () {
				expect(await tabGroup.iconValue(5)).toBe(983244); // decimal converted charCode of Unicode 'display' character
			});
		});
	});

	describe('TabGroup slot before/after', function () {
		const tabGroup = Page.components.tabGroupSlotBeforeAfter;

		it('should have previous button', async function () {
			expect(await tabGroup.previousButton).toBe(true);
		});

		it('should have next button', async function () {
			expect(await tabGroup.nextButton).toBe(true);
		});
	});

	describe('TabGroup tabPosition after', function () {
		const tabGroup = Page.components.tabGroupTabAfter;

		it('should position icon after title', async function () {
			expect(await tabGroup.tabAfter).toBe(true);
		});
	});

	describe('TabGroup vertical', function () {
		const tabGroup = Page.components.tabGroupVertical;

		it('should align TagGroup vertically', async function () {
			expect(await tabGroup.verticalOrientation).toBe(true);
		});

		it('should focus the second item with 5-way Down', async function () {
			await tabGroup.focusTab(1);
			await Page.spotlightDown();
			expect(await tabGroup.focusableTabs(3).isFocused()).toBe(true); // there is a dummy sibling added by Spottable
		});

		it('should focus the third item with 5-way Down', async function () {
			await tabGroup.focusTab(3);
			await Page.spotlightDown();

			expect(await tabGroup.focusableTabs(5).isFocused()).toBe(true); // there is a dummy sibling added by Spottable
		});

		it('should focus the first item with 5-way Up', async function () {
			await tabGroup.focusTab(3);
			await Page.spotlightUp();

			expect(await tabGroup.focusableTabs(1).isFocused()).toBe(true); // there is a dummy sibling added by Spottable
		});
	});
});
