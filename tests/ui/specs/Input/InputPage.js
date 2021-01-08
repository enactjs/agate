'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class InputPage extends Page {
	constructor () {
		super();
		this.title = 'Agate Input Test';
	}

	open (urlExtra) {
		super.open('Input-View', urlExtra);
	}

	get input1 () {
		return $('#input1');
	}
	get input2 () {
		return $('#input2');
	}
	get input3 () {
		return $('#input3');
	}
	get input4 () {
		return $('#input4');
	}
	get disabledInput () {
		return $('#input5');
	}
	get smallInput () {
		return $('#input6')
	}
	get inputElement1 () {
		return $('#input1 input');
	}
}

module.exports = new InputPage();
