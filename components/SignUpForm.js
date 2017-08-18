import React from 'react';
import {
	View,
	StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { nameChanged, emailChanged, passwordChanged, confirmPasswordChanged } from '../actions';
import Button from './common/Button';
import InputField from './common/InputField';

class SignUpForm extends React.Component {
	onNameChange(text) {
		this.props.nameChanged(text);
	}

	onEmailChange(text) {
		this.props.emailChanged(text)
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text)
	}

	onConfirmPasswordChange(text) {
		this.props.confirmPasswordChanged(text)
	}

	render() {
		return (
			<View style={styles.form}>
				<InputField
					autoFocus
					label="First name"
					placeholder="Enter first name"
					onChangeText={this.onNameChange.bind(this)}
					value={this.props.name}
			 	/>

				<InputField
					label="Email"
					placeholder="Enter email"
					onChangeText={this.onEmailChange.bind(this)}
					value={this.props.email}
				/>

				<InputField
					secureTextEntry
					label="Password"
					placeholder="Enter password"
					onChangeText={this.onPasswordChange.bind(this)}
					value={this.props.password}
				/>

				<InputField
					secureTextEntry
					label="Confirm password"
					placeholder="Confirm password"
					onChangeText={this.onConfirmPasswordChange.bind(this)}
					value={this.props.confirmPassword}
				/>

				<View style={styles.button}>
					<Button>
						Submit
					</Button>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create ({
	form: {
		marginBottom: 100,
		marginLeft: 40,
		justifyContent: "center",
		marginRight: 40
	},
	button: {
		flex: 1,
		flexDirection: "row",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
	  marginTop: 40
	}
})

const mapStateToProps = ({ auth }) => {
	const { name, email, password, confirmPassword } = auth;
	return { name, email, password, confirmPassword };
};

export default connect(mapStateToProps, { nameChanged, emailChanged, passwordChanged, confirmPasswordChanged })(SignUpForm);
