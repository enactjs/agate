const Page = require('./ButtonPage');

describe('Button', function () {

	beforeEach(async function () {
		await Page.open();
	});

	const {
		buttonDefault,
		buttonDisabled,
		buttonFalseMinWidth,
		buttonJoinedRight,
		buttonSizeSmall,
		buttonTransparent,
		buttonWithBadge,
		iconButton
	} = Page.components;

	describe('button appearance', function () {
		it('should display an icon button', async function () {
			expect(await iconButton.isIconButton).to.be.true();
		});

		it('should not display a large size button', async function () {
			expect(await buttonSizeSmall.isLarge).to.not.be.true();
		});

		it('should not have minWidth class', async function () {
			expect(await buttonFalseMinWidth.isMinWidth).to.not.be.true();
		});

		it('should have default opaque backgroundOpacity', async function () {
			expect(await buttonDefault.isOpaque).to.be.true();
		});

		it('should be transparent', async function () {
			expect(await buttonTransparent.isTransparent).to.be.true();
		});

		it('should have badge decoration', async function () {
			expect(await buttonWithBadge.isWithBadge).to.be.true();
		});
	});

	describe('5-way', function () {
		it('should focus disabled button on 5-way right', async function () {
			await buttonDefault.focus();
			await Page.spotlightRight();
			expect(await buttonDisabled.self.isFocused()).to.be.true();
		});

		it('should focus buttonJoinedRight button on 5-way left', async function () {
			await iconButton.focus();
			await Page.spotlightLeft();
			expect(await buttonJoinedRight.self.isFocused()).to.be.true();
		});
	});

	describe('pointer', function () {
		it('should focus the disabled when hovered', async function () {
			await buttonDisabled.hover();
			expect(await buttonDisabled.self.isFocused()).to.be.true();
		});

		it('should focus first when hovered', async function () {
			await buttonDefault.hover();
			expect(await buttonDefault.self.isFocused()).to.be.true();
		});
	});

});
