const Page = require('./ItemPage');

describe('Item', function () {
	const item1 = Page.components.item1;
	const item2Disabled = Page.components.item2Disabled;
	const item3WithLabel = Page.components.item3WithLabel;
	const item4Inline = Page.components.item4Inline;
	const item5InlineDisabled = Page.components.item5InlineDisabled;
	const item6Inline = Page.components.item6Inline;
	const item7Inline = Page.components.item7Inline;

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should have focus on first item at start', function () {
			expect(item1.self.isFocused()).to.be.true();
		});

		describe('default', function () {

			describe('5-way', function () {
				it('should focus the first item with 5-way Up', function () {
					item2Disabled.focus();
					Page.spotlightUp();
					expect(item1.self.isFocused()).to.be.true();
				});

				it('should focus an item with label with 5-way Down', function () {
					item2Disabled.focus();
					Page.spotlightDown();
					expect(item3WithLabel.self.isFocused()).to.be.true();
				});

				// Validating that the items are in fact inline and can be navigated between via 5-way
				it('should focus an inline item with 5-way Left', function () {
					item7Inline.focus();
					Page.spotlightLeft();
					expect(Page.components.item6Inline.self.isFocused()).to.be.true();
				});

				it('should focus an inline item with 5-way Right', function () {
					item6Inline.focus();
					Page.spotlightRight();
					expect(Page.components.item7Inline.self.isFocused()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should focus an item when hovered', function () {
					item3WithLabel.hover();
					expect(item3WithLabel.self.isFocused()).to.be.true();
				});

				it('should focus an item when switching from pointer to 5-way', function () {
					item1.hover();
					item2Disabled.focus();
					expect(item2Disabled.self.isFocused()).to.be.true();
				});
			});
		});

		describe('disabled', function () {

			describe('5-way', function () {
				it('should focus a disabled item with 5-way Up', function () {
					item3WithLabel.focus();
					Page.spotlightUp();
					expect(item2Disabled.self.isFocused()).to.be.true();
				});

				it('should focus a disabled item with 5-way Down', function () {
					item1.focus();
					Page.spotlightDown();
					expect(item2Disabled.self.isFocused()).to.be.true();
				});

				it('should focus an inline disabled item with 5-way Right', function () {
					item4Inline.focus();
					Page.spotlightRight();
					expect(item5InlineDisabled.self.isFocused()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should focus the disabled item with focus', function () {
					item2Disabled.hover();
					expect(item2Disabled.self.isFocused()).to.be.true();
				});
			});
		});
	});

	describe('RTL locale', function () {
		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should have focus on first item at start', function () {
			expect(item1.self.isFocused()).to.be.true();
		});

		describe('default', function () {

			describe('5-way', function () {
				// Validating that the items are in fact inline and can be navigated between via 5-way
				it('should focus an inline item with 5-way Right', function () {
					item7Inline.focus();
					Page.spotlightRight();
					expect(Page.components.item6Inline.self.isFocused()).to.be.true();
				});

				it('should focus an inline item with 5-way Left', function () {
					item6Inline.focus();
					Page.spotlightLeft();
					expect(Page.components.item7Inline.self.isFocused()).to.be.true();
				});
			});
		});
	});
});
