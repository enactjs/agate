const Page = require('./SwitchItemPage');

describe('SwitchItem', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first item at start', async function () {
		expect(await Page.components.switchItemDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const switchItem = Page.components.switchItemDefault;

		it('should have correct text', async function () {
			expect(await switchItem.textContent).to.equal('Switch Item1');
		});

		it('should not be selected', async function () {
			expect(await switchItem.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should select the item when selected', async function () {
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).to.be.true();
			});

			it('should re-unselect the item when selected twice', async function () {
				await Page.spotlightSelect();
				await browser.pause(500);
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).to.be.false();
			});

			it('should move focus down on SpotlightDown', async function () {
				await Page.spotlightDown();
				expect(await Page.components.switchItemDefaultSelected.self.isFocused()).to.be.true();
			});

			it('should move focus up on SpotlightUp', async function () {
				await Page.components.switchItemDefaultSelected.focus();
				await Page.spotlightUp();
				expect(await switchItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should select the item when clicked', async function () {
				await switchItem.self.click();
				expect(await switchItem.isSelected).to.be.true();
			});

			it('should re-unselect the item when clicked twice', async function () {
				await switchItem.self.click();
				await browser.pause(500);
				await switchItem.self.click();
				expect(await switchItem.isSelected).to.be.false();
			});
		});
	});

	describe('default selected', function () {
		const switchItem = Page.components.switchItemDefaultSelected;

		it('should have correct text', async function () {
			expect(await switchItem.textContent).to.equal('Switch Item selected');
		});

		it('should be selected', async function () {
			expect(await switchItem.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', async function () {
				await switchItem.focus();
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).to.be.false();
			});

			it('should re-select the item when selected twice', async function () {
				await switchItem.focus();
				await Page.spotlightSelect();
				await browser.pause(500);
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', async function () {
				await switchItem.self.click();
				expect(await switchItem.isSelected).to.be.false();
			});

			it('should re-select the item when clicked twice', async function () {
				await switchItem.self.click();
				await browser.pause(500);
				await switchItem.self.click();
				expect(await switchItem.isSelected).to.be.true();
			});
		});
	});

	describe('inline', function () {
		const switchItem = Page.components.switchItemInline;

		it('should have correct text', async function () {
			expect(await switchItem.textContent).to.equal('Switch Item inline');
		});

		it('should be selected', async function () {
			expect(await switchItem.isSelected).to.be.true();
		});

		it('should display item inline', async function () {
			expect(await switchItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', async function () {
				await switchItem.focus();
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).to.be.false();
			});

			it('should re-select the item when selected twice', async function () {
				await switchItem.focus();
				await Page.spotlightSelect();
				await browser.pause(500);
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', async function () {
				await switchItem.self.click();
				expect(await switchItem.isSelected).to.be.false();
			});

			it('should re-select the item when clicked twice', async function () {
				await switchItem.self.click();
				await browser.pause(500);
				await switchItem.self.click();
				expect(await switchItem.isSelected).to.be.true();
			});
		});
	});

	// Note, the disabled test below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
	describe('disabled', function () {
		const switchItem = Page.components.switchItemDisabled;
		const prevSwitchItem = Page.components.switchItemInline;

		it('should have correct text', async function () {
			expect(await switchItem.textContent).to.equal('Switch Item disabled');
		});

		it('should be selected', async function () {
			expect(await switchItem.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the item', async function () {
				await prevSwitchItem.focus();
				await Page.spotlightDown();
				expect(await switchItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', async function () {
				await switchItem.self.click();
				expect(await switchItem.isSelected).to.be.true();
			});
		});
	});
	// Note, the disabled test above/below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.

	describe('inline disabled', function () {
		const switchItem = Page.components.switchItemInlineDisabled;
		const prevSwitchItem = Page.components.switchItemDisabled;

		it('should have correct text', async function () {
			expect(await switchItem.textContent).to.equal('Switch Item inline disabled');
		});

		it('should be selected', async function () {
			expect(await switchItem.isSelected).to.be.true();
		});

		it('should display item inline', async function () {
			expect(await switchItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the item', async function () {
				await prevSwitchItem.focus();
				await Page.spotlightDown();
				expect(await switchItem.self.isFocused()).to.be.true();
			});

			it('should not unselect the item when selected', async function () {
				await switchItem.focus();
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', async function () {
				await switchItem.self.click();
				expect(await switchItem.isSelected).to.be.true();
			});
		});
	});
	// Note, the disabled test above requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
});
