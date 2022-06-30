// Utility methods for testing

async function validateTitle (drawer, title) {
	expect(await drawer.title).to.equal(title);
}

async function expectClosed (drawer) {
	expect(await drawer.isDrawerExist).to.be.false();
	expect(await drawer.isScrimExist).to.be.false();
}

async function expectOpen (drawer) {
	expect(await drawer.isDrawerExist).to.be.true();
	expect(await drawer.isScrimExist).to.be.true();
}

async function expectNoneScrimOpen (drawer) {
	expect(await drawer.isDrawerExist).to.be.true();
	expect(await drawer.isScrimExist).to.be.false();
}

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen,
	expectNoneScrimOpen
};
