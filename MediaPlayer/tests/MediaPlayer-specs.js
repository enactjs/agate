import React from 'react';
import {mount} from 'enzyme';

import MediaPlayer from '../MediaPlayer';
import css from '../../Slider/Slider.module.less';

const getNode = (slider) => slider.find(`div.${css.slider}`);

const blur = (slider) => getNode(slider).simulate('blur');
const activate = (slider) => getNode(slider).simulate('keyup', {keyCode: 13});

describe('MediaPlayer', () => {
	function getSourceNode (wrapper) {
		return wrapper.find('Media').instance().media;
	}

	const audioFiles = [
		'https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3',
		'https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3',
		'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Oceanic-Dawn-160.mp3',
		'https://sampleswap.org/mp3/artist/26546/benzoul_lovevoodoo-160.mp3',
		'https://sampleswap.org/mp3/artist/19139/MarkNine_In-my-Place-160.mp3',
		'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Dont-Forget-To-Be-Yourself-160.mp3'
	];

	describe('changing sources', () => {

		test('should use the same node when changing the `source`', () => {
			const subject = mount(
				<MediaPlayer>
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			);

			const expected = getSourceNode(subject);

			subject.setProps({
				source: ['abc.mp3']
			});

			const actual = getSourceNode(subject);

			expect(actual).toBe(expected);
		});

		test('should use same `source` when removing `source`', () => {
			const subject = mount(
				<MediaPlayer>
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			);

			const expected = getSourceNode(subject);

			subject.setProps({
				source: undefined // eslint-disable-line no-undefined
			});

			const actual = getSourceNode(subject);

			expect(actual).toBe(expected);
		});

		test('should reuse source node over two changes', () => {
			const subject = mount(
				<MediaPlayer>
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			);

			const source = getSourceNode(subject);

			subject.setProps({
				source: ['abc.mp3']
			});

			expect(getSourceNode(subject)).toBe(source);

			subject.setProps({
				source: ['def.mp3']
			});

			expect(getSourceNode(subject)).toBe(source);
		});

		test('should activate the mediaPlayer slider on enter keyup', () => {
			const subject = mount(
				<MediaPlayer>
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			);

			activate(subject);

			const expected = 'active';
			const actual = subject.find('Slider').prop('active') ? 'active' : 'not active';

			expect(actual).toBe(expected);
		});

		test('should deactivate the mediaPlayer slider on blur', () => {
			const subject = mount(
				<MediaPlayer>
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			);

			activate(subject);
			blur(subject);

			const expected = 'not active';
			const actual = subject.find('Slider').prop('active') ? 'active' : 'not active';

			expect(actual).toBe(expected);
		});
	});
});
