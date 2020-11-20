const Page = require('./ButtonPage');

describe('Button', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		buttonDefault,
		buttonDisabled,
		buttonJoinedRight,
		iconButton
	} = Page.components;

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
