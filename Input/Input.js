/**
 * Agate styled button components and behaviors.
 *
 * @example
 * <Input small>Hello Enact!</Input>
 *
 * @module agate/Input
 * @exports Input
 * @exports InputBase
 * @exports InputDecorator
 */

import kind from '@enact/core/kind';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import {isRtlText} from '@enact/i18n/util';
import Changeable from '@enact/ui/Changeable';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import React from 'react';

// import $L from '@enact/internal/$L';
import Skinnable from '../Skinnable';
// import Tooltip from '@enact/TooltipDecorator/Tooltip';

import componentCss from './Input.less';
// import InputDecoratorIcon from '@enact/moonstone/InputDecoratorIcon';
// import InputSpotlightDecorator from '@enact/moonstone/InputSpotlightDecorator';
import {extractAriaProps, extractInputProps} from '@enact/core/util';

/**
 * A button component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [Input]{@link agate/Input.Input}.
 *
 * @class InputBase
 * @memberof agate/Input
 * @extends ui/Input.InputBase
 * @ui
 * @public
 */
const InputBase = kind({
	name: 'Input',

	propTypes: {
		css: PropTypes.object,
		disabled: PropTypes.bool,
		dismissOnEnter: PropTypes.bool,
		focused: PropTypes.bool,
		iconAfter: PropTypes.string,
		iconBefore: PropTypes.string,
		invalid: PropTypes.bool,
		invalidMessage: PropTypes.string,
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onClick: PropTypes.func,
		onFocus: PropTypes.func,
		onKeyDown: PropTypes.func,
		placeholder: PropTypes.string,
		rtl: PropTypes.bool,
		type: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},

	defaultProps: {
		disabled: false,
		dismissOnEnter: false,
		invalid: false,
		placeholder: '',
		type: 'text'
	},

	styles: {
		css: componentCss,
		className: 'decorator',
		publicClassNames: ['decorator', 'input']
	},

	handlers: {
		onChange: (ev, {onChange}) => {
			if (onChange) {
				onChange({value: ev.target.value});
			}
		}
	},

	computed: {
		'aria-label': ({placeholder, type, value}) => {
			const title = (value == null || value === '') ? placeholder : '';
			return extractAriaProps(title, type, value);
		},
		className: ({focused, invalid, small, styler}) => styler.append({focused, invalid, small}),
		dir: ({value, placeholder}) => isRtlText(value || placeholder) ? 'rtl' : 'ltr',
		// invalidTooltip: ({css, invalid, invalidMessage = $L('Please enter a valid value.'), rtl}) => {
		// 	if (invalid && invalidMessage) {
		// 		const direction = rtl ? 'left' : 'right';
		// 		return (
		// 			<Tooltip arrowAnchor="top" className={css.invalidTooltip} direction={direction}>
		// 				{invalidMessage}
		// 			</Tooltip>
		// 		);
		// 	}
		// },
		// ensure we have a value so the internal <input> is always controlled
		value: ({value}) => typeof value === 'number' ? value : (value || '')
	},


	render: ({css, dir, disabled, iconAfter, iconBefore, onChange, placeholder, small, type, value, 'data-webos-voice-group-label': voiceGroupLabel, 'data-webos-voice-intent' : voiceIntent, 'data-webos-voice-label': voiceLabel, ...rest}) => {
		// const inputProps = extractInputProps(rest);
		delete rest.dismissOnEnter;
		delete rest.focused;
		delete rest.invalid;
		delete rest.invalidMessage;
		delete rest.rtl;

		return (
			<div {...rest} disabled={disabled}>
				<input
					// {...inputProps}
					aria-disabled={disabled}
					className={css.input}
					data-webos-voice-group-label={voiceGroupLabel}
					data-webos-voice-intent={voiceIntent}
					data-webos-voice-label={voiceLabel}
					dir={dir}
					disabled={disabled}
					onChange={onChange}
					placeholder={placeholder}
					tabIndex={-1}
					type={type}
					value={value}
				/>
			</div>
		);
	}
});

const Input = Pure(
	I18nContextDecorator(
		{rtlProp: 'rtl'},
		Changeable(
			Skinnable(
				InputBase
			)
		)
	)
);

export default Input;
export {
	extractAriaProps,
	extractInputProps,
	Input,
	InputBase
};
