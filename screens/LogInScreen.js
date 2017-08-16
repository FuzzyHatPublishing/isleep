import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

class LogInScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Log In',
		headerLeft:
			<Icon
				name='navigate-before'
				size={32}
				onPress={ () => navigation.navigate('home') }
			/>,
		headerStyle: { marginTop: Platform.OS === 'android' ? 24: 0 }
	});

	render() {
		return (
			<View>
				<Text>LogIn Screen</Text>
				<Text>LogIn Screen</Text>
				<Text>LogIn Screen</Text>
				<Text>LogIn Screen</Text>
				<Text>LogIn Screen</Text>
				<Text>LogIn Screen</Text>
			</View>
		);
	}
}

export default LogInScreen;
