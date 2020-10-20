import {generateTestData} from '@enact/ui-test-utils/utils';

import Button from './components/Button';
import ContextualPopupDecorator from './components/ContextualPopupDecorator';
import DateTimePicker from './components/DateTimePicker';
import Drawer from './components/Drawer';
import Dropdown from './components/Dropdown';
import FullscreenPopup from './components/FullscreenPopup';
import Header from './components/Header';
import Heading from './components/Heading';
import Icon from './components/Icon';
import Image from './components/Image';
import IncrementSlider from './components/IncrementSlider';
import Input from './components/Input';
import Item from './components/Item';
import Keypad from './components/Keypad';
import LabeledIcon from './components/LabeledIcon';
import LabeledIconButton from './components/LabeledIconButton';
import Panels from './components/Panels';
import ProgressBar from './components/ProgressBar';
import Popup from './components/Popup';
import PopupMenu from './components/PopupMenu';
import Picker from './components/Picker';
import RadioItem from './components/RadioItem';
import Slider from './components/Slider';
import SwitchItem from './components/SwitchItem';
import TabGroup from './components/TabGroup';
import ToggleButton from './components/ToggleButton';
import TooltipDecorator from './components/TooltipDecorator';

const agateComponents = {
	Button,
	ContextualPopupDecorator,
	DateTimePicker,
	Drawer,
	Dropdown,
	FullscreenPopup,
	Header,
	Heading,
	Icon,
	Image,
	IncrementSlider,
	Input,
	Item,
	Keypad,
	LabeledIcon,
	LabeledIconButton,
	Panels,
	ProgressBar,
	Popup,
	PopupMenu,
	Picker,
	RadioItem,
	Slider,
	SwitchItem,
	TabGroup,
	ToggleButton,
	TooltipDecorator
};

const agateTestMetadata = {};


Object.keys(agateComponents).forEach((component) => {
	let metaData = generateTestData(component, agateComponents[component]);
	agateTestMetadata[component] = metaData;
});

export default agateComponents;
export {agateComponents, agateTestMetadata};
