// Utility methods for testing

async function validateTitle (popupMenu, title) {
	expect(await popupMenu.title).to.equal(title);
}

async function expectClosed (popupMenu) {
	expect(await popupMenu.isPopupMenuExist).to.be.false();
	expect(await popupMenu.isScrimExist).to.be.false();
}

async function expectOpen (popupMenu) {
	expect(await popupMenu.isPopupMenuExist).to.be.true();
	expect(await popupMenu.isScrimExist).to.be.true();
}

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen
};
