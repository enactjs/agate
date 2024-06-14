const Page = require('./DropdownInScrollerPage');

describe('DropdownInScroller', function () {

	beforeEach(async function () {
		await Page.open();
	});

	describe('in scroller', function () {

		async function getDropdownOffset (dropdown, scroller) {
			return await browser.execute(async (a, b) => {
				return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
			}, dropdown, scroller);
		}

		it('should scroll into view when navigating dropdown via 5-way', async function () {
			expect(await Page.components.dropdown1.childItem.isFocused()).toBe(true);

			await Page.spotlightDown();
			await browser.pause(1000);

			// Verify that we have scrolled down
			expect(getDropdownOffset(
				await Page.components.dropdown1.self,
				await $('#scroller')
			)).not.toBe(0);

			await Page.spotlightUp();
			await browser.pause(1000);

			const expected = 0;
			const actual = await getDropdownOffset(
				await Page.components.dropdown1.self,
				await $('#scroller')
			);
			expect(actual).toBe(expected);
		});
	});
});
