'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class CheckboxInterface {
	constructor (id) {
		this.id = `${id}`;
	}

	get self () {
		return $(`#${this.id}`);
	}

	get isChecked () {
		return $(`#${this.id}.Checkbox_Checkbox_selected`).isExisting();
	}
}

class CheckboxPage extends Page {
	constructor () {
		super();
		this.title = 'Checkbox Test';
		const defaultCheckbox = new CheckboxInterface('defaultCheckbox');
		const selectedCheckbox = new CheckboxInterface('selectedCheckbox');
		const indeterminateCheckbox = new CheckboxInterface('indeterminateCheckbox');
		const disabledCheckbox = new CheckboxInterface('disabledCheckbox');

		this.components = {
			defaultCheckbox,
			selectedCheckbox,
			indeterminateCheckbox,
			disabledCheckbox
		};
	}

	async open (urlExtra) {
		await super.open('Checkbox-View', urlExtra);
	}
}

module.exports = new CheckboxPage();
