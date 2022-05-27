const Page = require('./ThumbnailItemPage');

describe('ThumbnailItem', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first item at start', async function () {
		expect(await Page.components.thumbnailItemDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const thumbnailItem = Page.components.thumbnailItemDefault;

		it('should have correct text', async function () {
			expect(await thumbnailItem.textContent).to.equal('Thumbnail Item default');
		});

		it('should display an image', async function () {
			expect(await thumbnailItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the thumbnail item with 5-way Up', async function () {
				await Page.components.thumbnailItemLabel.focus();
				await Page.spotlightUp();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the thumbnail item when hovered', async function () {
				await thumbnailItem.hover();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('thumbnail item with label', function () {
		const thumbnailItem = Page.components.thumbnailItemLabel;

		it('should have correct text', async function () {
			expect(await thumbnailItem.textContent).to.equal('Thumbnail Item with label');
		});

		it('should have correct label', async function () {
			expect(await thumbnailItem.labelContent).to.equal('label');
		});

		it('should display an image', async function () {
			expect(await thumbnailItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the thumbnail item with 5-way Down', async function () {
				await Page.components.thumbnailItemDefault.focus();
				await Page.spotlightDown();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});

			it('should focus the thumbnail item with 5-way Up', async function () {
				await Page.components.thumbnailItemSelected.focus();
				await Page.spotlightUp();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the thumbnail item when hovered', async function () {
				await thumbnailItem.hover();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('selected', function () {
		const thumbnailItem = Page.components.thumbnailItemSelected;

		it('should have correct text', async function () {
			expect(await thumbnailItem.textContent).to.equal('Thumbnail Item selected');
		});

		it('should be selected', async function () {
			expect(await thumbnailItem.isSelected).to.be.true();
		});

		it('should display an image', async function () {
			expect(await thumbnailItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the thumbnail item with 5-way Down', async function () {
				await Page.components.thumbnailItemLabel.focus();
				await Page.spotlightDown();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});

			it('should focus the thumbnail item with 5-way Up', async function () {
				await Page.components.thumbnailItemInline.focus();
				await Page.spotlightUp();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the thumbnail item when hovered', async function () {
				await thumbnailItem.hover();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('inline', function () {
		const thumbnailItem = Page.components.thumbnailItemInline;

		it('should have correct text', async function () {
			expect(await thumbnailItem.textContent).to.equal('Thumbnail Item inline');
		});

		it('should display an image', async function () {
			expect(await thumbnailItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the thumbnail item with 5-way Left', async function () {
				await Page.components.thumbnailItemInlineDisabled.focus();
				await Page.spotlightLeft();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the thumbnail item when hovered', async function () {
				await thumbnailItem.hover();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('inline disabled', function () {
		const thumbnailItem = Page.components.thumbnailItemInlineDisabled;

		it('should have correct text', async function () {
			expect(await thumbnailItem.textContent).to.equal('Thumbnail Item inline disabled');
		});

		it('should display an image', async function () {
			expect(await thumbnailItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the thumbnail item with 5-way Right', async function () {
				await Page.components.thumbnailItemInline.focus();
				await Page.spotlightRight();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the thumbnail item when hovered', async function () {
				await thumbnailItem.hover();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		const thumbnailItem = Page.components.thumbnailItemDisabled;

		it('should have correct text', async function () {
			expect(await thumbnailItem.textContent).to.equal('Thumbnail Item disabled');
		});

		it('should display an image', async function () {
			expect(await thumbnailItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the thumbnail item with 5-way Down', async function () {
				await Page.components.thumbnailItemInline.focus();
				await Page.spotlightDown();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the thumbnail item when hovered', async function () {
				await thumbnailItem.hover();

				expect(await thumbnailItem.self.isFocused()).to.be.true();
			});
		});
	});
});
