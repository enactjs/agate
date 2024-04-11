const Page = require('./CheckboxItemPage');
const {expectChecked, expectUnchecked, expectInline} = require('./CheckboxItem-utils');
const {expectOrdering} = require('@enact/ui-test-utils/utils');

describe('CheckboxItem', function () {

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('default', function () {
			const checkboxItem = Page.components.checkboxItemDefault;

			it('should have focus on first item at start', async function () {
				expect(await checkboxItem.self.isFocused()).toBe(true);
			});

			it('should have correct text', async function () {
				expect(await checkboxItem.valueText).toBe('Checkbox Item');
			});

			it('should not be checked', async function () {
				await expectUnchecked(checkboxItem);
			});

			it('should have the icon to the left of text', async function () {
				expectOrdering(checkboxItem.checkboxIcon, checkboxItem.value);
			});

			describe('5-way', function () {
				it('should check the item when selected', async function () {
					await Page.spotlightSelect();
					await expectChecked(checkboxItem);
				});

				it('should re-uncheck the item when selected twice', async function () {
					await Page.spotlightSelect();
					await Page.spotlightSelect();
					await expectUnchecked(checkboxItem);
				});

				it('should display icon `check` when selected', async function () {
					await Page.spotlightSelect();
					expect(await checkboxItem.checkboxIconSymbol).toBe('✓');
				});

				it('should move focus down on 5-way down', async function () {
					await Page.spotlightDown();
					expect(await Page.components.checkboxItemDefaultSelected.self.isFocused()).toBe(true);
				});

				it('should move focus up on 5-way up', async function () {
					await Page.components.checkboxItemDefaultSelected.focus();
					await Page.spotlightUp();
					expect(await checkboxItem.self.isFocused()).toBe(true);
				});
			});

			describe('pointer', function () {
				it('should check the item when clicked', async function () {
					await checkboxItem.self.click();
					await expectChecked(checkboxItem);
				});

				it('should re-uncheck the item when clicked twice', async function () {
					await checkboxItem.self.click();
					await checkboxItem.self.click();
					await expectUnchecked(checkboxItem);
				});

				it('should display the `check` icon when clicked', async function () {
					await checkboxItem.self.click();
					expect(await checkboxItem.checkboxIconSymbol).toBe('✓');
				});
			});
		});

		describe('selected', function () {
			const checkboxItem = Page.components.checkboxItemDefaultSelected;

			it('should have correct text', async function () {
				expect(await checkboxItem.valueText).toBe('Checkbox Item selected');
			});

			it('should be checked', async function () {
				await expectChecked(checkboxItem);
			});

			it('should display correct icon', async function () {
				expect(await checkboxItem.checkboxIconSymbol).toBe('✓');
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', async function () {
					await checkboxItem.focus();
					await Page.spotlightSelect();
					await expectUnchecked(checkboxItem);
				});

				it('should re-check the item when selected twice', async function () {
					await checkboxItem.focus();
					await Page.spotlightSelect();
					await Page.spotlightSelect();
					await expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', async function () {
					await checkboxItem.self.click();
					await expectUnchecked(checkboxItem);
				});

				it('should re-check the item when clicked twice', async function () {
					await checkboxItem.self.click();
					await checkboxItem.self.click();
					await expectChecked(checkboxItem);
				});
			});
		});

		describe('indeterminate', function () {
			const checkboxItem = Page.components.checkboxItemIndeterminate;

			it('should have correct text', async function () {
				expect(await checkboxItem.valueText).toBe('Checkbox Item indeterminate');
			});

			it('should be indeterminate state', async function () {
				expect(await checkboxItem.isIndeterminate).toBe(true);
			});

			it('should dislay an indeterminate icon', async function () {
				expect(await checkboxItem.indeterminateIconSymbol).toBe('-');
			});
		});

		describe('slotBefore', function () {
			const checkboxItem = Page.components.checkboxItemSlotBefore;

			it('should have correct text', async function () {
				expect(await checkboxItem.valueText).toBe('Checkbox Item slotBefore');
			});

			it('should have a node(icon) to the right of checkbox icon ', async function () {
				expectOrdering(checkboxItem.checkboxIcon, checkboxItem.slotBeforeNode);
			});

			it('should have a node(icon) to the left of text', async function () {
				expectOrdering(checkboxItem.slotBeforeNode, checkboxItem.value);
			});
		});

		describe('inline', function () {
			const checkboxItem = Page.components.checkboxItemInline;

			it('should have two inlined checkboxes positioned inlined', async function () {
				const checkboxItem2 = await Page.components.checkboxItemInlineIndeterminate.self;

				expectInline(await checkboxItem.self, checkboxItem2);
			});

			it('should have correct text', async function () {
				expect(await checkboxItem.valueText).toBe('Checkbox Item inline');
			});

			it('should be checked', async function () {
				await expectChecked(checkboxItem);
			});

			it('should display item inline', async function () {
				expect(await checkboxItem.isInline).toBe(true);
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', async function () {
					await checkboxItem.focus();
					await Page.spotlightSelect();
					await expectUnchecked(checkboxItem);
				});

				it('should re-check the item when selected twice', async function () {
					await checkboxItem.focus();
					await Page.spotlightSelect();
					await Page.spotlightSelect();
					await expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', async function () {
					await checkboxItem.self.click();
					await expectUnchecked(checkboxItem);
				});

				it('should re-check the item when clicked twice', async function () {
					await checkboxItem.self.click();
					await checkboxItem.self.click();
					await expectChecked(checkboxItem);
				});
			});
		});

		describe('inline indeterminate', function () {
			const checkboxItem = Page.components.checkboxItemInlineIndeterminate;

			it('should have correct text', async function () {
				expect(await checkboxItem.valueText).toBe('Checkbox Item inline indeterminate');
			});

			it('should display item inline', async function () {
				expect(await checkboxItem.isInline).toBe(true);
			});
		});

		// Note, the disabled test below requires the previous component to be known for 5-way
		// navigation and assumes there's no next component.  If you add components before or after
		// this test, please update the links.
		describe('disabled', function () {
			const checkboxItem = Page.components.checkboxItemDisabled;
			const prevCheckboxItem = Page.components.checkboxItemInlineIndeterminate;

			it('should have correct text', async function () {
				expect(await checkboxItem.valueText).toBe('Checkbox Item disabled');
			});

			it('should be checked', async function () {
				await expectChecked(checkboxItem);
			});

			describe('5-way', function () {
				it('should be able to focus the item', async function () {
					await prevCheckboxItem.focus();
					await Page.spotlightDown();
					expect(await checkboxItem.self.isFocused()).toBe(true);
				});

				it('should not uncheck the item when selected', async function () {
					await Page.spotlightDown();
					await expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should not uncheck the item when clicked', async function () {
					await checkboxItem.self.click();
					await expectChecked(checkboxItem);
				});
			});
		});
		// Note, the disabled test above requires the previous component to be known for 5-way
		// navigation and assumes there's no next component.  If you add components before or after
		// this test, please update the links.
	});

	describe('RTL locale', function () {
		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should have focus on first item at start', async function () {
			expect(await Page.components.checkboxItemDefault.self.isFocused()).toBe(true);
		});

		it('should have checkbox icon to the right of text when default', async function () {
			const checkboxItem = Page.components.checkboxItemDefault;
			expectOrdering(checkboxItem.value, checkboxItem.checkboxIcon);
		});

		it('should have a node(icon) to the right of text when default', async function () {
			const checkboxItem = Page.components.checkboxItemSlotBefore;
			expectOrdering(checkboxItem.value, checkboxItem.slotBeforeNode);
		});

		it('should have checkbox icon to the right of a node(icon)', async function () {
			const checkboxItem = Page.components.checkboxItemSlotBefore;
			expectOrdering(checkboxItem.slotBeforeNode, checkboxItem.checkboxIcon);
		});

		it('should have two inline checkboxItems positioned inline', async function () {
			const checkboxItem1 = await Page.components.checkboxItemInline.self;
			const checkboxItem2 = await Page.components.checkboxItemInlineIndeterminate.self;

			expectInline(checkboxItem1, checkboxItem2);
		});
	});
});
