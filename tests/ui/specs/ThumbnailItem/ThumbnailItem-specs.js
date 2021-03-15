const Page = require('./ThumbnailItemPage');

describe('ThumbnailItem', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.thumbnailItemDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const thumbnailItem = Page.components.thumbnailItemDefault;

		it('should have correct text', function () {
			expect(thumbnailItem.textContent).to.equal('Thumbnail Item default');
		});

		it('should display an image', function () {
			expect(thumbnailItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the thumbnail item with 5-way Up', function () {
				Page.components.thumbnailItemLabel.focus();
				Page.spotlightUp();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the thumbnail item when hovered', function () {
				thumbnailItem.hover();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('thumbnail item with label', function () {
		const thumbnailItem = Page.components.thumbnailItemLabel;

		it('should have correct text', function () {
			expect(thumbnailItem.textContent).to.equal('Thumbnail Item with label');
		});

		it('should have correct label', function () {
			expect(thumbnailItem.labelContent).to.equal('label');
		});

		it('should display an image', function () {
			expect(thumbnailItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the thumbnail item with 5-way Down', function () {
				Page.components.thumbnailItemDefault.focus();
				Page.spotlightDown();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});

			it('should focus the thumbnail item with 5-way Up', function () {
				Page.components.thumbnailItemSelected.focus();
				Page.spotlightUp();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the thumbnail item when hovered', function () {
				thumbnailItem.hover();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('selected', function () {
		const thumbnailItem = Page.components.thumbnailItemSelected;

		it('should have correct text', function () {
			expect(thumbnailItem.textContent).to.equal('Thumbnail Item selected');
		});

		it('should be selected', function () {
			expect(thumbnailItem.isSelected).to.be.true();
		});

		it('should display an image', function () {
			expect(thumbnailItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the thumbnail item with 5-way Down', function () {
				Page.components.thumbnailItemLabel.focus();
				Page.spotlightDown();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});

			it('should focus the thumbnail item with 5-way Up', function () {
				Page.components.thumbnailItemInline.focus();
				Page.spotlightUp();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the thumbnail item when hovered', function () {
				thumbnailItem.hover();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('inline', function () {
		const thumbnailItem = Page.components.thumbnailItemInline;

		it('should have correct text', function () {
			expect(thumbnailItem.textContent).to.equal('Thumbnail Item inline');
		});

		it('should display an image', function () {
			expect(thumbnailItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the thumbnail item with 5-way Left', function () {
				Page.components.thumbnailItemInlineDisabled.focus();
				Page.spotlightLeft();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the thumbnail item when hovered', function () {
				thumbnailItem.hover();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('inline disabled', function () {
		const thumbnailItem = Page.components.thumbnailItemInlineDisabled;

		it('should have correct text', function () {
			expect(thumbnailItem.textContent).to.equal('Thumbnail Item inline disabled');
		});

		it('should display an image', function () {
			expect(thumbnailItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the thumbnail item with 5-way Right', function () {
				Page.components.thumbnailItemInline.focus();
				Page.spotlightRight();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the thumbnail item when hovered', function () {
				thumbnailItem.hover();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		const thumbnailItem = Page.components.thumbnailItemDisabled;

		it('should have correct text', function () {
			expect(thumbnailItem.textContent).to.equal('Thumbnail Item disabled');
		});

		it('should display an image', function () {
			expect(thumbnailItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the thumbnail item with 5-way Down', function () {
				Page.components.thumbnailItemInline.focus();
				Page.spotlightDown();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the thumbnail item when hovered', function () {
				thumbnailItem.hover();

				expect(thumbnailItem.self.isFocused()).to.be.true();
			});
		});
	});
});
