const Page = require('./WindDirectionControlPage');

describe('WindDirectionControl', function () {
	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const windDirectionControl = Page.components.windDirectionControlDefault;

		it('should have the first arc selected by default', function () {
			expect(windDirectionControl.coloredPath(1).getCSSProperty('stroke').value).to.equal('rgb(68,68,68)');
		});
	});

	describe('air right', function () {
		const windDirectionControl = Page.components.winDirectionControlAirRight;

		it('should have the second arc selected', function () {
			expect(windDirectionControl.coloredPath(2).getCSSProperty('stroke').value).to.equal('rgb(68,68,68)');
		});
	});

	describe('air up', function () {
		const windDirectionControl = Page.components.windDirectionControlAirUp;

		it('should have the third arc selected', function () {
			expect(windDirectionControl.coloredPath(3).getCSSProperty('stroke').value).to.equal('rgb(68,68,68)');
		});
	});
});
