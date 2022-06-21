const Page = require('./LabeledIconButtonPage');

describe('LabeledIconButton', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first labeled icon button at start', async function () {
		expect(await Page.components.LabeledIconButtonDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const labeledIconButton = Page.components.LabeledIconButtonDefault;

		it('should have correct text', async function () {
			expect(await labeledIconButton.valueText).to.equal('LabeledIconButton default');
		});

		it('should display `temperature` icon', async function () {
			expect(await labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Up', async function () {
				await Page.components.LabeledIconButtonCustom.focus();
				await Page.spotlightLeft();

				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', async function () {
				await labeledIconButton.hover();
				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('custom', function () {
		const labeledIconButton = Page.components.LabeledIconButtonCustom;

		it('should have correct text', async function () {
			expect(await labeledIconButton.valueText).to.equal('LabeledIconButton custom icon');
		});

		it('should display `happyface` icon', async function () {
			expect(await labeledIconButton.iconValue()).to.equal(983060); // decimal converted charCode of Unicode 'happyface' character
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', async function () {
				await Page.components.LabeledIconButtonDefault.focus();
				await Page.spotlightRight();

				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', async function () {
				await labeledIconButton.hover();
				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('selected', function () {
		const labeledIconButton = Page.components.LabeledIconButtonSelected;

		it('should have correct text', async function () {
			expect(await labeledIconButton.valueText).to.equal('LabeledIconButton selected');
		});

		it('should display `temperature` icon', async function () {
			expect(await labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should be selected', async function () {
			expect(await labeledIconButton.isSelected()).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', async function () {
				await Page.components.LabeledIconButtonCustom.focus();
				await Page.spotlightRight();

				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', async function () {
				await labeledIconButton.hover();
				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('highlighted', function () {
		const labeledIconButton = Page.components.LabeledIconButtonHighlighted;

		it('should have correct text', async function () {
			expect(await labeledIconButton.valueText).to.equal('LabeledIconButton highlighted');
		});

		it('should display `temperature` icon', async function () {
			expect(await labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should be highlighted', async function () {
			expect(await labeledIconButton.isHighlighted()).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', async function () {
				await Page.components.LabeledIconButtonDefault.focus();
				await Page.spotlightDown();

				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', async function () {
				await labeledIconButton.hover();
				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('transparent', function () {
		const labeledIconButton = Page.components.LabeledIconButtonTransparent;

		it('should have correct text', async function () {
			expect(await labeledIconButton.valueText).to.equal('LabeledIconButton backgroundOpacity transparent');
		});

		it('should display `temperature` icon', async function () {
			expect(await labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should be transparent', async function () {
			expect(await labeledIconButton.isTransparent()).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', async function () {
				await Page.components.LabeledIconButtonCustom.focus();
				await Page.spotlightDown();

				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', async function () {
				await labeledIconButton.hover();
				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('smallest', function () {
		const labeledIconButton = Page.components.LabeledIconButtonSmallest;

		it('should have correct text', async function () {
			expect(await labeledIconButton.valueText).to.equal('LabeledIconButton smallest');
		});

		it('should display `temperature` icon', async function () {
			expect(await labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should have smallest button', async function () {
			expect(await labeledIconButton.isSmallest()).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', async function () {
				await Page.components.LabeledIconButtonSelected.focus();
				await Page.spotlightDown();

				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', async function () {
				await labeledIconButton.hover();
				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('small', function () {
		const labeledIconButton = Page.components.LabeledIconButtonSmall;

		it('should have correct text', async function () {
			expect(await labeledIconButton.valueText).to.equal('LabeledIconButton small');
		});

		it('should display `temperature` icon', async function () {
			expect(await labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should have small button', async function () {
			expect(await labeledIconButton.isSmall()).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', async function () {
				await Page.components.LabeledIconButtonHighlighted.focus();
				await Page.spotlightDown();

				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', async function () {
				await labeledIconButton.hover();
				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('huge', function () {
		const labeledIconButton = Page.components.LabeledIconButtonHuge;

		it('should have correct text', async function () {
			expect(await labeledIconButton.valueText).to.equal('LabeledIconButton huge');
		});

		it('should display `temperature` icon', async function () {
			expect(await labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should have huge button', async function () {
			expect(await labeledIconButton.isHuge()).to.be.true();
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', async function () {
				await Page.components.LabeledIconButtonTransparent.focus();
				await Page.spotlightDown();

				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', async function () {
				await labeledIconButton.hover();
				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		const labeledIconButton = Page.components.LabeledIconButtonDisabled;

		it('should have correct text', async function () {
			expect(await labeledIconButton.valueText).to.equal('LabeledIconButton disabled');
		});

		it('should display `temperature` icon', async function () {
			expect(await labeledIconButton.iconValue()).to.equal(983232); // decimal converted charCode of Unicode 'temperature' character
		});

		it('should be disabled', async function () {
			expect(await labeledIconButton.isDisabled()).to.equal('true');
		});

		describe('5-way', function () {
			it('should focus the labeled icon button with 5-way Down', async function () {
				await Page.components.LabeledIconButtonSmallest.focus();
				await Page.spotlightDown();

				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should focus the labeled icon button when hovered', async function () {
				await labeledIconButton.hover();
				expect(await labeledIconButton.self.isFocused()).to.be.true();
			});
		});
	});
});
