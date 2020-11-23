const Page = require('./ButtonPage');

describe('Button', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		buttonDefault,
		buttonDisabled,
		buttonFalseMinWidth,
		buttonJoinedRight,
		buttonSizeSmall,
		buttonTransparent,
		iconButton
	} = Page.components;

	describe('button appearance', function () {
		it('should display an icon button', function () {
			expect(iconButton.isIconButton).to.be.true();
		});

		it('should not display a large size button', function () {
			expect(buttonSizeSmall.isLarge).to.not.be.true();
		});

		it('should not have minWidth class', function () {
			expect(buttonFalseMinWidth.isMinWidth).to.not.be.true();
		});

		it('should have default opaque backgroundOpacity', function () {
			expect(buttonDefault.isOpaque).to.be.true();
		});

		it('should be transparent', function () {
			expect(buttonTransparent.isTransparent).to.be.true();
		});
	});

	describe('5-way', function () {
		it('should focus disabled button on 5-way right', function () {
			buttonDefault.focus();
			Page.spotlightRight();
			expect(buttonDisabled.self.isFocused()).to.be.true();
		});

		it('should focus buttonJoinedRight button on 5-way left', function () {
			iconButton.focus();
			Page.spotlightLeft();
			expect(buttonJoinedRight.self.isFocused()).to.be.true();
		});
	});

	describe('pointer', function () {
		it('should focus the disabled when hovered', function () {
			buttonDisabled.hover();
			expect(buttonDisabled.self.isFocused()).to.be.true();
		});

		it('should focus first when hovered', function () {
			buttonDefault.hover();
			expect(buttonDefault.self.isFocused()).to.be.true();
		});
	});

});
