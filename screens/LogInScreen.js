import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import LogInForm from '../components/LogInForm';

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
			<LogInForm />
		);
	}
}

export default LogInScreen;
