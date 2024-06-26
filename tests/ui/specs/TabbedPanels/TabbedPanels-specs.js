const Page = require('./TabbedPanelsPage');

describe('TabbedPanels', function () {
	beforeEach(async function () {
		await Page.open();
	});

	function getFocusedTextContent () {
		return document.activeElement.textContent;
	}

	const tabbedPanels = Page.components.tabbedPanels;

	describe('5-way', function () {
		it('should select first button at render', async function () {
			expect(Number(await tabbedPanels.selectedTab().getAttribute('data-index'))).toBe(0);
		});

		it('should focus`click me` button on first tab', async function () {
			const expected = 'First tab view';
			const actual = await browser.execute(getFocusedTextContent);

			expect(actual).toBe(expected);
		});

		it('should focus and select the second tab', async function () {
			await tabbedPanels.focusTab(1);
			await Page.spotlightSelect();
			await browser.pause(500);
			expect(Number(await tabbedPanels.selectedTab().getAttribute('data-index'))).toBe(1);
		});

		it('should focus second tab view on 5-way down', async function () {
			await tabbedPanels.focusTab(1);
			await Page.spotlightSelect();
			await browser.pause(1500);
			await Page.spotlightDown();

			const expected = 'Second tab view';
			const actual = await browser.execute(getFocusedTextContent);

			expect(actual).toBe(expected);
		})

		it('should focus and select the third tab', async function () {
			await tabbedPanels.focusTab(2);
			await Page.spotlightSelect();
			await browser.pause(500);
			expect(Number(await tabbedPanels.selectedTab().getAttribute('data-index'))).toBe(2);
		});

		it('should focus third tab view on 5-way down', async function () {
			await tabbedPanels.focusTab(2);
			await Page.spotlightSelect();
			await browser.pause(1500);
			await Page.spotlightDown();

			const expected = 'Third tab view';
			const actual = await browser.execute(getFocusedTextContent);

			expect(actual).toBe(expected);
		})
	});
});
