import {generateTestData} from '@enact/ui-test-utils/utils';

import Button from './components/Button';
import DateTimePicker from './components/DateTimePicker';
import Heading from './components/Heading';
import IncrementSlider from './components/IncrementSlider';
import Input from './components/Input';
import Icon from './components/Icon';
import Item from './components/Item';
import LabeledIcon from './components/LabeledIcon';
import LabeledIconButton from './components/LabeledIconButton';
import ProgressBar from './components/ProgressBar';
import Popup from './components/Popup';
import Picker from './components/Picker';
import RadioItem from './components/RadioItem';
import Slider from './components/Slider';
import SwitchItem from './components/SwitchItem';
import ToggleButton from './components/ToggleButton';

const agateComponents = {
	Button,
	DateTimePicker,
	Heading,
	IncrementSlider,
	Input,
	Icon,
	Item,
	LabeledIcon,
	LabeledIconButton,
	ProgressBar,
	Popup,
	Picker,
	RadioItem,
	Slider,
	SwitchItem,
	ToggleButton
};

const agateTestMetadata = {};


Object.keys(agateComponents).forEach((component) => {
	let metaData = generateTestData(component, agateComponents[component]);
	agateTestMetadata[component] = metaData;
});

export default agateComponents;
export {agateComponents, agateTestMetadata};
