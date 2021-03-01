import classnames from 'classnames/bind';
import spotlight from '@enact/spotlight';
import {urlParamsToObject} from '@enact/ui-test-utils/utils';
import {cloneElement, Component as ReactComponent} from 'react';

import ThemeDecorator from '../../../ThemeDecorator';

import {agateComponents, agateTestMetadata} from './AgateComponents';

import AgateImports from './importer';

import css from './Agate-View.less';

const url = new URL(window.location.href);

// Bind our classnames against css modules
const cx = classnames.bind(css);

const LoremString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat.';

spotlight.setPointerMode(true);

const parsed = urlParamsToObject();

function getWrapperClasses ({wrapper}) {
	return cx('wrapper', wrapper, parsed.skin);
}

function prepareTest (componentName, testId) {
	const ElementProps = {
		'data-ui-test-id': 'test',
		style: {outlineColor: 'lime'},
		className: css.outline
	};

	if (!agateComponents[componentName] || !agateComponents[componentName][testId]) {
		return {
			testElement: <div>INVALID COMPONENT OR TEST ID</div>,
			wrapperClasses: css.error
		};
	}

	let component = agateComponents[componentName][testId];

	// If this is a complex test (not a bare component), extract component for cloning
	if (component.component) {
		component = component.component;
	}

	let children = component.props.children;
	if (children === '-Lorem') {
		children = LoremString;
	}

	// TODO: extract back to test and in metadata converter unpack date?
	if (component.props.defaultValue && /\d{4}-\d{2}-\d{2}/.test(component.props.defaultValue)) {
		ElementProps.defaultValue = new Date(component.props.defaultValue);
	}

	return {
		testElement: cloneElement(component, ElementProps, children),
		wrapperClasses: getWrapperClasses(agateComponents[componentName][testId])
	};
}

function prepareFromUrl () {
	// Naively, assuming parsed in the form of: {component: 'ComponentName', props: {}}
	const Component = AgateImports[parsed.component];
	const componentProps = parsed.props || {};
	const wrapperProps = parsed.wrapper || {};

	if (componentProps.children === '-Lorem') {
		componentProps.children = LoremString;
	}

	if (componentProps.defaultValue && /\d{4}-\d{2}-\d{2}/.test(componentProps.defaultValue)) {
		componentProps.defaultValue = new Date(componentProps.defaultValue);
	}
	return {
		testElement: <Component {...componentProps} />,
		wrapperClasses: getWrapperClasses({skin: parsed.skin, wrapper: wrapperProps})
	};
}
class App extends ReactComponent {
	static getDerivedStateFromError () {
		// Update state so the next render will show the fallback UI.
		return {hasError: true};
	}

	constructor (props) {
		super(props);
		this.state = {hasError: false};
	}

	render () {
		const {component, testId, locale, ...props} = this.props;
		let testElement;
		let wrapperClasses;

		if (this.state.hasError) {
			return (
				<div {...props}>
					<div className={css.error}>
						ERROR IN {component} test {testId}
					</div>
				</div>
			);
		}

		if (testId >= 0) {
			({testElement, wrapperClasses} = prepareTest(component, testId, locale));
		} else {
			({testElement, wrapperClasses} = prepareFromUrl());
		}

		return (
			<div {...props}>
				<div className={wrapperClasses}>{testElement}</div>
			</div>
		);
	}
}

const WrappedAgateApp = ThemeDecorator({noAutoFocus: true}, App);

const ExportedAgateApp = (props) => {

	// Common test parameters
	const skin = url.searchParams.get('skin');
	const skinVariants = JSON.parse(url.searchParams.get('skinVariants'));

	// Legacy test parameters
	let locale = url.searchParams.get('locale');

	if (props.testId >= 0 && agateComponents[props.component] && agateComponents[props.component][props.testId]) {
		locale = agateComponents[props.component][props.testId].locale;
	}

	return (
		<WrappedAgateApp {...props} skin={skin} skinVariants={skinVariants} locale={locale} />
	);
};

export default ExportedAgateApp;
export {agateComponents as components, agateTestMetadata as testMetadata};
