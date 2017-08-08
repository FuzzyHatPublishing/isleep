import React from 'react';
import { 
	View, 
	TextInput,
	Text,
	StyleSheet 
} from 'react-native';

const InputField = ({ label, secureTextEntry, placeholder, onChangeText, value, autoCorrect, autoFocus }) => {
	
	return(
		<View>
			<Text style={styles.labelText}>
				{label}
			</Text>
			<TextInput style={styles.inputBox}
				secureTextEntry={secureTextEntry}
				placeholder={placeholder}
				onChangeText={onChangeText}
				value={value}
				autoCorrect={false}
				autoFocus={autoFocus}
				/>
		</View>
	);
};

const styles = StyleSheet.create ({
	inputBox: {
		marginBottom: 20,
		fontSize: 24
	},
	labelText: {
		fontSize: 18
	}
})

export default InputField;
