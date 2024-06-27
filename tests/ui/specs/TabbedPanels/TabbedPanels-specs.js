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

		it('should focus first tab view', async function () {
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
			// wait for transition
			await browser.pause(1000);
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
			// wait for transition
			await browser.pause(1000);
			await Page.spotlightDown();

			const expected = 'Third tab view';
			const actual = await browser.execute(getFocusedTextContent);

			expect(actual).toBe(expected);
		});

		it('should select the previous tab when 5-way Select on \'prevButton\'', async function () {
			await Page.spotlightUp();
			await Page.spotlightSelect();
			await tabbedPanels.focusPrevButton();
			await Page.spotlightSelect();
			// wait for transition
			await browser.pause(1000);
			await Page.spotlightDown();

			const expected = 'First tab view';
			const actual = await browser.execute(getFocusedTextContent);

			expect(actual).toBe(expected);
		});

		it('should select the next tab when 5-way Select on \'nextButton\'', async function () {
			await tabbedPanels.focusNextButton();
			await Page.spotlightSelect();
			// wait for transition
			await browser.pause(1000);
			await Page.spotlightDown();

			const expected = 'Second tab view';
			const actual = await browser.execute(getFocusedTextContent);

			expect(actual).toBe(expected);
		});
	});

	describe('pointer', function () {
		it('should select the second tab', async function () {
			expect(Number(await tabbedPanels.selectedTab().getAttribute('data-index'))).toBe(0);
			await tabbedPanels.tab(1).click();
			expect(Number(await tabbedPanels.selectedTab().getAttribute('data-index'))).toBe(1);
		});

		it('should select the third tab', async function () {
			expect(Number(await tabbedPanels.selectedTab().getAttribute('data-index'))).toBe(0);
			await tabbedPanels.tab(2).click();
			expect(Number(await tabbedPanels.selectedTab().getAttribute('data-index'))).toBe(2);
		});

		it('should select the next tab when click on \'nextButton\'', async function () {
			expect(Number(await tabbedPanels.selectedTab().getAttribute('data-index'))).toBe(0);
			await tabbedPanels.nextButton().click();
			expect(Number(await tabbedPanels.selectedTab().getAttribute('data-index'))).toBe(1);
		});

		it('should select the previous tab when click on \'prevButton\'', async function () {
			await tabbedPanels.tab(1).click();
			expect(Number(await tabbedPanels.selectedTab().getAttribute('data-index'))).toBe(1);
			await tabbedPanels.previousButton().click();
			expect(Number(await tabbedPanels.selectedTab().getAttribute('data-index'))).toBe(0);
		});
	});
});
