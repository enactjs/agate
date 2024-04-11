// Utility methods for testing

async function validateTitle (drawer, title) {
	expect(await drawer.title).toBe(title);
}

async function expectClosed (drawer) {
	expect(await drawer.isDrawerExist).toBe(false);
	expect(await drawer.isScrimExist).toBe(false);
}

async function expectOpen (drawer) {
	expect(await drawer.isDrawerExist).toBe(true);
	expect(await drawer.isScrimExist).toBe(true);
}

async function expectNoneScrimOpen (drawer) {
	expect(await drawer.isDrawerExist).toBe(true);
	expect(await drawer.isScrimExist).toBe(false);
}

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen,
	expectNoneScrimOpen
};
