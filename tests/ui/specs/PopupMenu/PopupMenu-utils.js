// Utility methods for testing

function validateTitle (popupMenu, title) {
	expect(popupMenu.title).to.equal(title);
}

function expectClosed (popupMenu) {
	expect(popupMenu.isPopupMenuExist).to.be.false();
	expect(popupMenu.isScrimExist).to.be.false();
}

function expectOpen (popupMenu) {
	expect(popupMenu.isPopupMenuExist).to.be.true();
	expect(popupMenu.isScrimExist).to.be.true();
}

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen
};
