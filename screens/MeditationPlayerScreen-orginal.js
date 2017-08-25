import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MeditationPlayerSample from '../components/MeditationPlayerSample';

class MeditationPlayerScreen extends Component {
	static navigationOptions = {
    title: 'Meditation',
  };
	render() {
		return (
			<View>
				<Text>Meditation Screen</Text>
				<Text>Meditation Screen</Text>
				<MeditationPlayerSample />
			</View>
		);
	}
}

export default MeditationPlayerScreen;