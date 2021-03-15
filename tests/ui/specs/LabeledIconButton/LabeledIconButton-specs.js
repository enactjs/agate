const Page = require('./LabeledIconButtonPage');

describe('LabeledIconButton', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first labeled icon button at start', function () {
		expect(Page.components.LabeledIconButtonDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const labeledIconButton = Page.components.LabeledIconButtonDefault;

		it('should have correct text', function () {
			expect(labeledIconButton.valueText).to.equal('LabeledIconButton default');
		});

		it('should display `temperature` icon', function () {
			expect(labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Up', function () {
				Page.components.LabeledIconButtonCustom.focus();
				Page.spotlightLeft();

				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', function () {
				labeledIconButton.hover();
				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('custom', function () {
		const labeledIconButton = Page.components.LabeledIconButtonCustom;

		it('should have correct text', function () {
			expect(labeledIconButton.valueText).to.equal('LabeledIconButton custom icon');
		});

		it('should display `happyface` icon', function () {
			expect(labeledIconButton.iconValue()).to.equal(983060); // decimal converted charCode of Unicode 'happyface' character
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', function () {
				Page.components.LabeledIconButtonDefault.focus();
				Page.spotlightRight();

				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', function () {
				labeledIconButton.hover();
				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('selected', function () {
		const labeledIconButton = Page.components.LabeledIconButtonSelected;

		it('should have correct text', function () {
			expect(labeledIconButton.valueText).to.equal('LabeledIconButton selected');
		});

		it('should display `temperature` icon', function () {
			expect(labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should be selected', function () {
			expect(labeledIconButton.isSelected()).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', function () {
				Page.components.LabeledIconButtonCustom.focus();
				Page.spotlightRight();

				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', function () {
				labeledIconButton.hover();
				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('highlighted', function () {
		const labeledIconButton = Page.components.LabeledIconButtonHighlighted;

		it('should have correct text', function () {
			expect(labeledIconButton.valueText).to.equal('LabeledIconButton highlighted');
		});

		it('should display `temperature` icon', function () {
			expect(labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should be highlighted', function () {
			expect(labeledIconButton.isHighlighted()).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', function () {
				Page.components.LabeledIconButtonDefault.focus();
				Page.spotlightDown();

				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', function () {
				labeledIconButton.hover();
				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('transparent', function () {
		const labeledIconButton = Page.components.LabeledIconButtonTransparent;

		it('should have correct text', function () {
			expect(labeledIconButton.valueText).to.equal('LabeledIconButton backgroundOpacity transparent');
		});

		it('should display `temperature` icon', function () {
			expect(labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should be transparent', function () {
			expect(labeledIconButton.isTransparent()).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', function () {
				Page.components.LabeledIconButtonCustom.focus();
				Page.spotlightDown();

				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', function () {
				labeledIconButton.hover();
				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('smallest', function () {
		const labeledIconButton = Page.components.LabeledIconButtonSmallest;

		it('should have correct text', function () {
			expect(labeledIconButton.valueText).to.equal('LabeledIconButton smallest');
		});

		it('should display `temperature` icon', function () {
			expect(labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should have smallest button', function () {
			expect(labeledIconButton.isSmallest()).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', function () {
				Page.components.LabeledIconButtonSelected.focus();
				Page.spotlightDown();

				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', function () {
				labeledIconButton.hover();
				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('small', function () {
		const labeledIconButton = Page.components.LabeledIconButtonSmall;

		it('should have correct text', function () {
			expect(labeledIconButton.valueText).to.equal('LabeledIconButton small');
		});

		it('should display `temperature` icon', function () {
			expect(labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should have small button', function () {
			expect(labeledIconButton.isSmall()).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', function () {
				Page.components.LabeledIconButtonHighlighted.focus();
				Page.spotlightDown();

				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', function () {
				labeledIconButton.hover();
				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('huge', function () {
		const labeledIconButton = Page.components.LabeledIconButtonHuge;

		it('should have correct text', function () {
			expect(labeledIconButton.valueText).to.equal('LabeledIconButton huge');
		});

		it('should display `temperature` icon', function () {
			expect(labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should have huge button', function () {
			expect(labeledIconButton.isHuge()).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', function () {
				Page.components.LabeledIconButtonTransparent.focus();
				Page.spotlightDown();

				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', function () {
				labeledIconButton.hover();
				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		const labeledIconButton = Page.components.LabeledIconButtonDisabled;

		it('should have correct text', function () {
			expect(labeledIconButton.valueText).to.equal('LabeledIconButton disabled');
		});

		it('should display `temperature` icon', function () {
			expect(labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should be disabled', function () {
			expect(labeledIconButton.isDisabled()).to.equal('true');
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', function () {
				Page.components.LabeledIconButtonSmallest.focus();
				Page.spotlightDown();

				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', function () {
				labeledIconButton.hover();
				expect(labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});
});
