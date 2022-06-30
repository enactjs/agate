const Page = require('./ToggleButton-Page');

describe('ToggleButton', function () {

	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first item at start', async function () {
		expect(await Page.components.toggleDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const toggleButton = Page.components.toggleDefault;

		it('should have correct text', async function () {
			expect((await toggleButton.textContent).toLowerCase()).to.equal('missing toggle label');
		});

		it('should be unselected', async function () {
			expect(await toggleButton.isSelected).to.be.false();
		});
	});

	describe('labelled', function () {
		const toggleButton = Page.components.toggleWithLabels;

		it('should have correct text', async function () {
			expect((await toggleButton.textContent).toLowerCase()).to.equal('off');
		});

		it('should be unselected', async function () {
			expect(await toggleButton.isSelected).to.be.false();
		});
	});

});
