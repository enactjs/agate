// Utility methods for testing

async function validateTitle (popupMenu, title) {
	expect(await popupMenu.title).toBe(title);
}

async function expectClosed (popupMenu) {
	expect(await popupMenu.isPopupMenuExist).toBe(false);
	expect(await popupMenu.isScrimExist).toBe(false);
}

async function expectOpen (popupMenu) {
	expect(await popupMenu.isPopupMenuExist).toBe(true);
	expect(await popupMenu.isScrimExist).toBe(true);
}

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen
};
