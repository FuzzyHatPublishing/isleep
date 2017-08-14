import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Form from '../components/Form';

class SignUpScreen extends Component {
	static navigationOptions = {
		title: 'Sign Up'
	}

	render() {
		return(
			<Form />
			)
	}
}

export default SignUpScreen;
