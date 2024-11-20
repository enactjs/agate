/* eslint-disable react/jsx-no-bind */

/**
 * A internal DrumPicker component.
 *
 * @module agate/internal/DrumPicker
 * @exports DrumPicker
 * @exports DrumPickerDecorator
 * @private
 */
import kind from '@enact/core/kind';
import classnames from 'classnames';
import {forEventProp, forward, handle, oneOf} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import {clamp} from '@enact/core/util';
import Spottable from '@enact/spotlight/Spottable';
import IdProvider from '@enact/ui/internal/IdProvider';
import ri from '@enact/ui/resolution';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import $L from '../$L';
import Skinnable from '../../Skinnable';

import css from './DrumPicker.module.less';
import {useEffect, useRef, useState} from 'react';

const Div = Touchable(Spottable('div'));

// Set-up event forwarding
const forwardKeyDown = forward('onKeyDown');

const isDown = is('down');
const isLeft = is('left');
const isRight = is('right');
const isUp = is('up');

/**
 * The base component for {@link agate/internal/DrumPicker.DrumPicker}.
 *
 * @class DrumPicker
 * @memberof agate/internal/DrumPicker
 * @ui
 * @private
 */
const DrumPickerBase = kind({
    name: 'DrumPicker',

    functional: true,

    propTypes: /** @lends agate/internal/DrumPicker.DrumPicker.prototype */ {
        /**
         * The maximum value selectable by the picker (inclusive).
         *
         * The range between `min` and `max` should be evenly divisible by
         * [step]{@link agate/internal/DrumPicker.DrumPicker.step}.
         *
         * @type {Number}
         * @required
         * @public
         */
        max: PropTypes.number.isRequired,

        /**
         * The minimum value selectable by the picker (inclusive).
         *
         * The range between `min` and `max` should be evenly divisible by
         * [step]{@link agate/internal/DrumPicker.DrumPicker.step}.
         *
         * @type {Number}
         * @required
         * @public
         */
        min: PropTypes.number.isRequired,

        /**
         * Accessibility hint
         *
         * For example, `hour`, `year`, and `meridiem`
         *
         * @type {String}
         * @default ''
         * @public
         */
        accessibilityHint: PropTypes.string,

        /**
         * The "aria-label" for the picker.
         *
         * By default, `aria-valuetext` is set to the current value.
         * This should only be used when the parent controls the value of
         * the picker directly through the props.
         *
         * @type {String}
         * @public
         */
        'aria-label': PropTypes.string,

        /**
         * Overrides the `aria-valuetext` for the picker. By default, `aria-valuetext` is set
         * to the current value. This should only be used when the parent controls the value of
         * the picker directly through the props.
         *
         * @type {String|Number}
         * @memberof agate/internal/DrumPicker.DrumPicker.prototype
         * @public
         */
        'aria-valuetext': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

        /**
         * Children from which to pick.
         *
         * @type {Node}
         * @public
         */
        children: PropTypes.node,

        /**
         * Class name for component.
         *
         * @type {String}
         * @public
         */
        className: PropTypes.string,

        /**
         * Customizes the component by mapping the supplied collection of CSS class names
         * to the corresponding internal elements and states of this component.
         *
         * @type {Object}
         * @private
         */
        css: PropTypes.object,

        /**
         * Sets the hint string read when focusing the decrement button.
         *
         * @type {String}
         * @default 'previous item'
         * @public
         */
        decrementAriaLabel: PropTypes.string,

        /**
         * Disables the picker.
         *
         * @type {Boolean}
         * @public
         */
        disabled: PropTypes.bool,

        /**
         * The picker id reference for setting aria-controls.
         *
         * @type {String}
         * @private
         */
        id: PropTypes.string,

        /**
         * Sets the hint string read when focusing the increment button.
         *
         * @default 'next item'
         * @type {String}
         * @public
         */
        incrementAriaLabel: PropTypes.string,

        /**
         * By default, the picker will animate transitions between items.
         * Specifying `noAnimation` will prevent any transition animation for the
         * component.
         *
         * @type {Boolean}
         * @public
         */
        noAnimation: PropTypes.bool,

        /**
         * A function to run when the control should increment or decrement.
         *
         * @type {Function}
         * @public
         */
        onChange: PropTypes.func,

        /**
         * A function to run when the picker is removed while retaining focus.
         *
         * @type {Function}
         * @private
         */
        onSpotlightDisappear: PropTypes.func,

        /**
         * Orientation of the picker.
         *
         * Controls whether the buttons are arranged horizontally or vertically around the value.
         *
         * * Values: `'horizontal'`, `'vertical'`
         *
         * @type {String}
         * @default 'vertical'
         * @public
         */
        orientation: PropTypes.oneOf(['horizontal', 'vertical']),

        /**
         * When `true`, the component cannot be navigated using spotlight.
         *
         * @type {Boolean}
         * @public
         */
        spotlightDisabled: PropTypes.bool,

        /**
         * Allow the picker to only increment or decrement by a given value.
         *
         * A step of `2` would cause a picker to increment from 10 to 12 to 14, etc. It must evenly
         * divide into the range designated by `min` and `max`.
         *
         * @type {Number}
         * @default 1
         * @public
         */
        step: PropTypes.number,

        /**
         * The type of picker. It determines the aria-label for the next and previous buttons.
         *
         * Depending on the `type`, `decrementAriaLabel`, and `incrementAriaLabel`,
         * the screen readers read out differently when Spotlight is on the next button, the previous button,
         * or the picker itself.
         *
         * For example, if Spotlight is on the next button
         * and aria label props(`decrementAriaLabel` and `incrementAriaLabel`) are not defined,
         * then the screen readers read out as follows.
         *	`'string'` type: `'next item'`
         * 	`'number'` type: `'increase the value'`
         *
         * @type {('number'|'string')}
         * @default 'string'
         * @public
         */
        type: PropTypes.oneOf(['number', 'string']),

        /**
         * Index of the selected child.
         *
         * @type {Number}
         * @default 0
         * @public
         */
        value: PropTypes.number,

        /**
         * Choose a specific size for your picker. `'small'`, `'medium'`, `'large'`, or set to `null` to
         * assume auto-sizing. `'small'` is good for numeric pickers, `'medium'` for single or short
         * word pickers, `'large'` for maximum-sized pickers.
         *
         * You may also supply a number. This number will determine the minimum size of the DrumPicker.
         * Setting a number to less than the number of characters in your longest value may produce
         * unexpected results.
         *
         * @type {('small'|'medium'|'large'|Number)}
         * @public
         */
        width: PropTypes.oneOfType([
            PropTypes.oneOf([null, 'small', 'medium', 'large']),
            PropTypes.number
        ]),

        /**
         * Allows picker to continue from the start of the list after it reaches the end and vice-versa.
         *
         * @type {Boolean}
         * @public
         */
        wrap: PropTypes.bool
    },

    defaultProps: {
        accessibilityHint: '',
        orientation: 'vertical',
        step: 1,
        type: 'string',
        value: 0
    },

    render: (props) => {
        const contentRef = useRef();
        const rootRef = useRef();
        const indicatorRef = useRef();

        const {type, value} = props;
        const [selectedIndex, setSelectedIndex] = useState(props.children[0]);

        console.log(selectedIndex);

        let scrollY = -1;
        let lastY = 0;
        let startY = 0;
        let scrollX = -1;
        let lastX = 0;
        let startX = 0;
        let isMoving = false;

        useEffect(() => {
            if (type === 'number') {
                setSelectedIndex(clamp(0, props.children.length - 1, props.children.findIndex((element) => element.props.children === value)));
            } else {
                setSelectedIndex(value);
            }
        }, [props.children, type, value]);

        const changeValue = (index, value) => {
            const {type, onChange} = props;
            if (index !== selectedIndex) {
                setSelectedIndex(index);
                if (type === 'number') {
                    onChange({value});
                } else {
                    onChange({value: index});
                }
            }
        };

        const scrollTo = (val, transition) => {
            const {children, orientation, type} = props;
            if (!children || children.length === 0) return;

            const index = clamp(0, children.length, Math.min(val, children.length - 1));

            let child;
            if (type === 'number') {
                child = children[index].props.children;
            } else {
                child = index;
            }

            if (orientation === 'vertical') {
                const itemHeight = parseFloat(ri.unit(indicatorRef.current.getBoundingClientRect().height, 'rem').slice(0, -3));

                if (scrollY !== val * itemHeight) {
                    scrollY = val * itemHeight;

                    contentRef.current.style.transform = `translate(0, ${-((val + 1) * itemHeight)}rem)`;

                    if (scrollY >= 0 && (child || child === 0)) {
                        setTimeout(() => {
                            changeValue(index, child);
                        }, transition? 300 : 0)
                    }

                }
            } else {
                const itemWidth = parseFloat(ri.unit(indicatorRef.current.getBoundingClientRect().width, 'rem').slice(0, -3));

                if (scrollX !== val * itemWidth) {
                    scrollX = val * itemWidth;

                    contentRef.current.style.transform = `translate(${-((val + 1) * itemWidth)}rem, 0)`;

                    if (scrollX >= 0 && (child || child === 0)) {
                        setTimeout(() => {
                            changeValue(index, child);
                        }, transition? 300 : 0)
                    }
                }
            }
        };

        const handleClick = (direction) => {
            const {orientation, wrap} = props;

            if (!props.disabled && props.children.length > 0) {
                let itemHeight = parseFloat(ri.unit(indicatorRef.current.getBoundingClientRect().height, 'rem').slice(0, -3));
                let itemWidth = parseFloat(ri.unit(indicatorRef.current.getBoundingClientRect().width, 'rem').slice(0, -3));
                // this is to avoid division by 0
                if (itemHeight === 0) {
                    itemHeight = 1;
                }
                if (itemWidth === 0) {
                    itemWidth = 1;
                }

                contentRef.current.style.transition = 'transform 300ms';

                if (orientation === 'horizontal') {
                    scrollTo(wrap ? wrapRange(0, props.children.length - 1, scrollX / itemWidth + direction) : clamp(0, props.children.length - 1, scrollX / itemWidth + direction), true);
                } else if (orientation === 'vertical') {
                    scrollTo(wrap ? wrapRange(0, props.children.length - 1, scrollY / itemHeight + direction) : clamp(0, props.children.length - 1, scrollY / itemHeight + direction), true);
                }
                // remove transition for further touch related changes
                setTimeout(() => {
                    contentRef.current.style.transition = 'none';
                }, 300);
            }
        };

        const handleDecrement = () => {
            handleClick(-1);
        };

        const handleIncrement = () => {
            handleClick(1);
        };

        const onStart = (position) => {
            if (props.disabled || props.children.length === 0) {
                return;
            }
            isMoving = true;

            if (props.orientation === 'vertical') {
                startY = position.pageY / ri.unitToPixelFactors['rem'];
                lastY = scrollY;
            } else {
                startX = position.pageX / ri.unitToPixelFactors['rem'];
                lastX = scrollX;
            }
        };

        const onMove = (position) => {
            if (props.disabled || props.children.length === 0 || !isMoving) {
                return;
            }

            const unitToPixelFactor = ri.unitToPixelFactors['rem'];

            if (props.orientation === 'vertical') {
                const itemHeight = parseFloat(ri.unit(indicatorRef.current.getBoundingClientRect().height, 'rem').slice(0, -3));
                scrollY = (lastY - ( position.pageY / unitToPixelFactor) + startY);
                contentRef.current.style.transform = `translate(0, ${-scrollY - itemHeight}rem)`;
            } else {
                const itemWidth = parseFloat(ri.unit(indicatorRef.current.getBoundingClientRect().width, 'rem').slice(0, -3));
                scrollX = (lastX - (position.pageX / unitToPixelFactor) + startX);
                contentRef.current.style.transform = `translate(${-scrollX - itemWidth}rem, 0)`;
            }
        };

        const onFinish = () => {
            console.log('finish');
            if (isMoving === false) return;

            isMoving = false;

            if (props.orientation === 'vertical') {
                const itemHeight = parseFloat(ri.unit(indicatorRef.current.getBoundingClientRect().height, 'rem').slice(0, -3));

                let targetY = scrollY;
                const height = (props.children.length - 1) * itemHeight;
                if (targetY % itemHeight !== 0) {
                    targetY = Math.round(targetY / itemHeight) * itemHeight;
                }
                if (targetY < 0) {
                    targetY = 0;
                } else if (targetY > height) {
                    targetY = height;
                }
                scrollTo(targetY / itemHeight, false);
            }
            else
            {
                const itemWidth = parseFloat(ri.unit(indicatorRef.current.getBoundingClientRect().width, 'rem').slice(0, -3));

                let targetX = scrollX;
                const height = (props.children.length - 1) * itemWidth;
                if (targetX % itemWidth !== 0) {
                    targetX = Math.round(targetX / itemWidth) * itemWidth;
                }
                if (targetX < 0) {
                    targetX = 0;
                } else if (targetX > height) {
                    targetX = height;
                }
                scrollTo(targetX / itemWidth, false);
            }
        };

        const wrapRange = (min, max, value) => {
            if (value > max) {
                return min + (value - max - 1);
            } else if (value < min) {
                return max - (min - value - 1);
            } else {
                return value;
            }
        };

        const currentValueText = () => {
            const {accessibilityHint, 'aria-valuetext': ariaValueText, children, value} = props;
            if (ariaValueText != null) {
                return ariaValueText;
            }

            let valueText = value;

            if (children && Array.isArray(children)) {
                if (children[value] && children[value].props) {
                    valueText = children[value].props.children;
                } else {
                    valueText = children[value];
                }
            }

            if (accessibilityHint) {
                valueText = `${valueText} ${accessibilityHint}`;
            }

            return valueText;
        };

        const decrementAriaLabel = () => {
            const {decrementAriaLabel} = props;
            if (decrementAriaLabel != null) {
                return decrementAriaLabel;
            }

            if (!Array.isArray(props.children)) {
                return `${$L('decrease the value')}`;
            } else {
                return `${$L('previous item')}`;
            }
        };

        const incrementAriaLabel = () => {
            const {incrementAriaLabel} = props;
            if (incrementAriaLabel != null) {
                return incrementAriaLabel;
            }

            if (!Array.isArray(props.children)) {
                return `${$L('increase the value')}`;
            } else {
                return `${$L('next item')}`;
            }
        };

        const calcAriaLabel = () => {
            const {'aria-label': ariaLabel} = props;
            if (ariaLabel != null) {
                return ariaLabel;
            }
            return currentValueText();
        };

        const handleKeyDown = (ev) => {
            const {orientation, wrap} = props;
            const {keyCode} = ev;
            forwardKeyDown(ev, props);

            if (!props.disabled && props.children.length > 0) {
                let itemHeight = parseFloat(ri.unit(indicatorRef.current.getBoundingClientRect().height, 'rem').slice(0, -3));
                let itemWidth = parseFloat(ri.unit(indicatorRef.current.getBoundingClientRect().width, 'rem').slice(0, -3));
                // this is to avoid division by 0
                if (itemHeight === 0) {
                    itemHeight = 1;
                }
                if (itemWidth === 0) {
                    itemWidth = 1;
                }

                contentRef.current.style.transition = 'transform 300ms';

                if (orientation === 'horizontal' && isLeft(keyCode)) {
                    ev.stopPropagation();
                    scrollTo(wrap ? wrapRange(0, props.children.length - 1, scrollX / itemWidth - 1) : clamp(0, props.children.length - 1, scrollX / itemWidth - 1), true);
                } else if (orientation === 'horizontal' && isRight(keyCode) ) {
                    ev.stopPropagation();
                    scrollTo(wrap ? wrapRange(0, props.children.length - 1, scrollX / itemWidth + 1) : clamp(0, props.children.length - 1, scrollX / itemWidth + 1), true);
                } else if (orientation === 'vertical' && isUp(keyCode)) {
                    ev.stopPropagation();
                    scrollTo(wrap ? wrapRange(0, props.children.length - 1, scrollY / itemHeight - 1) : clamp(0, props.children.length - 1, scrollY / itemHeight - 1), true);
                } else if (orientation === 'vertical' && isDown(keyCode) ) {
                    ev.stopPropagation();
                    scrollTo(wrap ? wrapRange(0, props.children.length - 1, scrollY / itemHeight + 1) : clamp(0, props.children.length - 1, scrollY / itemHeight + 1), true);
                }

                // remove transition for further touch related changes
                setTimeout(() => {
                    contentRef.current.style.transition = 'none';
                }, 300);
            }
        };

        handle = handle.bind(this);

        const handleFlick = handle(
            forEventProp('direction', 'vertical'),
            // ignore "slow" flicks by filtering out velocity below a threshold
            oneOf(
                [({velocityY}) => velocityY < 0, handleIncrement],
                [({velocityY}) => velocityY > 0, handleDecrement]
            )
        );

        const valueId =  (id) => `${id}_value`;

        const {
            className,
            disabled,
            id,
            onSpotlightDisappear,
            orientation,
            spotlightDisabled,
            width,
            ...rest
        } = props;

        let {children: values} = props;

        const currentAriaValueText = currentValueText();
        const decAriaLabel = decrementAriaLabel();
        const incAriaLabel = incrementAriaLabel();
        const decrementAriaLabelText = `${currentAriaValueText} ${decAriaLabel}`;
        const incrementAriaLabelText = `${currentAriaValueText} ${incAriaLabel}`;
        const indicatorAriaLabel = calcAriaLabel();

        let sizingPlaceholder = null;
        if (typeof width === 'number' && width > 0) {
            sizingPlaceholder = <div aria-hidden className={css.sizingPlaceholder}>{'0'.repeat(width)}</div>;
        }

        delete rest['aria-valuetext'];
        delete rest.accessibilityHint;
        delete rest.decrementAriaLabel;
        delete rest.incrementAriaLabel;
        delete rest.index;
        delete rest.max;
        delete rest.min;
        delete rest.noAnimation;
        delete rest.onChange;
        delete rest.reverseTransition;
        delete rest.step;
        delete rest.type;
        delete rest.value;
        delete rest.wrap;

        console.log(props)

        const itemDecrementProps = {
            'aria-controls': valueId(id),
            'aria-disabled':disabled,
            'aria-label':decrementAriaLabelText,
            className: classnames(css.itemDecrement, css.item)
        };

        const itemIncrementProps = {
            'aria-controls': valueId(id),
            'aria-disabled':disabled,
            'aria-label':incrementAriaLabelText,
            className: classnames(css.itemIncrement, css.item)
        };

        const selectedItemProps = {
            className: classnames(css.selectedItem, css.item)
        };

        const otherItemProps = {
            className: css.item
        };

        values = values.map((value, index) => {
            let itemProps;
            let onClickEvent;
            if (selectedIndex === index + 1) {
                itemProps = itemDecrementProps;
                onClickEvent = handleDecrement;
            } else if (selectedIndex === index - 1) {
                itemProps = itemIncrementProps;
                onClickEvent = handleIncrement;
            } else if (selectedIndex === index) {
                itemProps = selectedItemProps;
            } else {
                itemProps = otherItemProps;
            }
            return (
                <div
                    key={index}
                    {...itemProps}
                    onClick={onClickEvent}
                >
                    {sizingPlaceholder}
                    {value}
                </div>
            );
        });

        return (
            <Div
                {...rest}
                className={classnames(className, css.drumPicker, css[orientation])}
                disabled={disabled}
                onFlick={handleFlick}
                onKeyDown={handleKeyDown}
                onPointerDown={(evt) => onStart(evt)}
                onPointerLeave={onFinish}
                onPointerMove={(evt) => {
                    evt.preventDefault(); onMove(evt);
                }}
                onPointerUp={onFinish}
                onSpotlightDisappear={onSpotlightDisappear}
                ref={rootRef}
                spotlightDisabled={spotlightDisabled}
            >
                <div
                    aria-label={indicatorAriaLabel}
                    aria-valuetext={currentAriaValueText}
                    className={classnames(css.indicator, css.item)}
                    ref={indicatorRef}
                />
                <div
                    className={css.root}
                    ref={contentRef}
                >
                    {values}
                </div>
            </Div>
        );
    }
});

/**
 * Applies Agate specific behaviors to [DrumPicker]{@link agate/DrumPicker.DrumPicker}.
 *
 * @hoc
 * @memberof agate/internal/DrumPicker
 * @mixes agate/Skinnable.Skinnable
 * @private
 */
const DrumPickerDecorator = compose(
    IdProvider({generateProp: null}),
    Skinnable
);

const DrumPicker = DrumPickerDecorator(DrumPickerBase);

export default DrumPicker;
export {
    DrumPicker,
    DrumPickerBase
};
export DrumPickerItem from './DrumPickerItem';