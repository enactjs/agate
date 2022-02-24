const Page = require('./ItemPage');

describe('Item', function () {
	const {
		item1,
		item2Disabled,
		item3WithLabel,
		item4Inline,
		item5InlineDisabled,
		item8Inline
	} = Page.components;

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		it('should have focus on first item at start', async function () {
			expect(await item1.self.isFocused()).to.be.true();
		});

		describe('default', function () {

			describe('5-way', function () {
				it('should focus the first item with 5-way Up', async function () {
					await item2Disabled.focus();
					await Page.spotlightUp();
					expect(await item1.self.isFocused()).to.be.true();
				});

				it('should focus an item with label with 5-way Down', async function () {
					await item2Disabled.focus();
					await Page.spotlightDown();
					expect(await item3WithLabel.self.isFocused()).to.be.true();
				});

				// Validating that the items are in fact inline and can be navigated between via 5-way
				it('should focus an inline item with 5-way Left', async function () {
					await item8Inline.focus();
					await Page.spotlightLeft();
					expect(await Page.components.item7Inline.self.isFocused()).to.be.true();
				});

				it('should focus an inline item with 5-way Right', async function () {
					await item5InlineDisabled.focus();
					await Page.spotlightRight();
					expect(await Page.components.item6Inline.self.isFocused()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should focus an item when hovered', async function () {
					await item3WithLabel.hover();
					expect(await item3WithLabel.self.isFocused()).to.be.true();
				});

				it('should focus an item when switching from pointer to 5-way', async function () {
					await item1.hover();
					await item2Disabled.focus();
					expect(await item2Disabled.self.isFocused()).to.be.true();
				});
			});
		});

		describe('disabled', function () {

			describe('5-way', function () {
				it('should focus a disabled item with 5-way Up', async function () {
					await item3WithLabel.focus();
					await Page.spotlightUp();
					expect(await item2Disabled.self.isFocused()).to.be.true();
				});

				it('should focus a disabled item with 5-way Down', async function () {
					await item1.focus();
					await Page.spotlightDown();
					expect(await item2Disabled.self.isFocused()).to.be.true();
				});

				it('should focus an inline disabled item with 5-way Right', async function () {
					await item4Inline.focus();
					await Page.spotlightRight();
					expect(await item5InlineDisabled.self.isFocused()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should focus the disabled item with focus', async function () {
					await item2Disabled.hover();
					expect(await item2Disabled.self.isFocused()).to.be.true();
				});
			});
		});
	});

	describe('RTL locale', function () {
		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should have focus on first item at start', async function () {
			expect(await item1.self.isFocused()).to.be.true();
		});

		describe('default', function () {

			describe('5-way', function () {
				// Validating that the items are in fact inline and can be navigated between via 5-way
				it('should focus an inline item with 5-way Right', async function () {
					await item8Inline.focus();
					await Page.spotlightRight();
					expect(await Page.components.item7Inline.self.isFocused()).to.be.true();
				});

				it('should focus an inline item with 5-way Left', async function () {
					await item5InlineDisabled.focus();
					await Page.spotlightLeft();
					expect(await Page.components.item6Inline.self.isFocused()).to.be.true();
				});
			});
		});
	});
});
