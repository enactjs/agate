// Utility methods for testing

function validateTitle (drawer, title) {
	expect(drawer.title).to.equal(title);
}

function expectClosed (drawer) {
	expect(drawer.isDrawerExist).to.be.false();
	expect(drawer.isScrimExist).to.be.false();
}

function expectOpen (drawer) {
	expect(drawer.isDrawerExist).to.be.true();
	expect(drawer.isScrimExist).to.be.true();
}

function expectNoneScrimOpen (drawer) {
	expect(drawer.isDrawerExist).to.be.true();
	expect(drawer.isScrimExist).to.be.false();
}

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen,
	expectNoneScrimOpen
};
