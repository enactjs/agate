// A set of utility methods for testing
module.exports = {
	expectChecked,
	expectInline,
	expectUnchecked
};

async function expectChecked (checkboxItem) {
	expect(await checkboxItem.isChecked).toBe(true);
}

async function expectUnchecked (checkboxItem) {
	expect(await checkboxItem.isChecked).toBe(false);
}

async function expectInline (checkboxItem1, checkboxItem2) {
	expect((await checkboxItem1.getLocation().x) === (await checkboxItem2.getLocation().x)).toBe(false);
}
