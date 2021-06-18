'use strict';
const {getText, Page} = require('@enact/ui-test-utils/utils');

class InputPage extends Page {
	constructor () {
		super();
		this.title = 'Agate Input Test';
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
		return $('#input6');
	}
	get inputElement1 () {
		return $('#input1 input');
	}
	get inputWithClearButton () {
		return $('#input7');
	}
	get inputWithCustomClearButton () {
		return $('#input8');
	}
	get inputWithClearButtonElement () {
		return $('#input7 .Input_Input_icon').isExisting();
	}
	get inputWithCustomClearButtonElement () {
		return $('#input8 .Input_Input_icon').isExisting();
	}
	get inputWithClearButtonIconValue () {
		return getText($('#input7 .Input_Input_icon')).codePointAt();
	}
	get inputWithCustomClearButtonIconValue () {
		return getText($('#input8 .Input_Input_icon')).codePointAt();
	}

	open (urlExtra) {
		super.open('Input-View', urlExtra);
	}
}

module.exports = new InputPage();
