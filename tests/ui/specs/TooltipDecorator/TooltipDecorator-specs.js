const Page = require('./TooltipDecoratorPage');

describe('TooltipDecorator', function () {

	const wrapper = Page.wrapper;

	beforeEach(function () {
		Page.open();
	});

	const {
		tooltipButton1,
		tooltipButton2,
		tooltipButton3
	} = Page.components;

	describe('default', function () {
		it('should focus the first button on start', function () {
			expect(tooltipButton1.self.isFocused()).to.be.true();
		});

		it('should show tooltip after 500ms delay when focused on start', function () {
			Page.delay(1000);
			console.log(wrapper)
			expect(wrapper.isTooltipShowing).to.be.true();
		});
	});

	describe('using 5-way', function () {
		it('should focus second button on 5-way right', function () {
			expect(tooltipButton1.self.isFocused()).to.be.true();

			Page.spotlightRight();
			expect(tooltipButton2.self.isFocused()).to.be.true();
		});

		// it('should focus second button on 5-way right', function () {
		// 	expect(tooltipButton1.self.isFocused()).to.be.true();
		//
		// 	Page.spotlightRight();
		// 	expect(tooltipButton2.self.isFocused()).to.be.true();
		// });
	});

	// describe('pointer', function () {
	// 	it('should focus the disabled when hovered', function () {
	// 		buttonDisabled.hover();
	// 		expect(buttonDisabled.self.isFocused()).to.be.true();
	// 	});
	//
	// 	it('should focus first when hovered', function () {
	// 		buttonDefault.hover();
	// 		expect(buttonDefault.self.isFocused()).to.be.true();
	// 	});
	// });
});
