import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import SignUpForm from '../components/SignUpForm';

class SignUpScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Sign Up',
		headerLeft:
			<Icon
				name='navigate-before'
				size={32}
				onPress={ () => navigation.navigate('home') }
			/>,
		headerStyle: { marginTop: Platform.OS === 'android' ? 24: 0 }
	});

	render() {
		return(
			<SignUpForm />
			)
	}
}

export default SignUpScreen;
