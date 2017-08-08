import React from 'react';
import { 
	View,
	StyleSheet
} from 'react-native';
import Button from './common/Button';
import InputField from './common/InputField';

export default class Form extends React.Component {
	onPasswordChange(text) {
		// this.props.passwordChanged(text)
	}

	onNameChange(text) {
		// this.props.nameChanged(text)
	}

	onEmailChange(text) {
		// this.props.emailChanged(text)
	}

	render() {
		return(
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





