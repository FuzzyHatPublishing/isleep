import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Icon } from 'react-native-elements';


class SubjectListScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'iSleep Guide',
		headerLeft:
			<Icon
				name='navigate-before'
				size={32}
				onPress={ () => navigation.navigate('guideList') }
			/>,
		headerStyle: { marginTop: Platform.OS === 'android' ? 24 : 0 }
	});

	state = { subjectData: [] };

	componentWillMount() {
		let subjectData = this.props.navigation.state.params.subject;
		this.setState({ subjectData });
	}
	render() {
		return (
			<View>
				<Text>Subject List Screen</Text>
				<Text>Subject List Screen</Text>
				<Text>Subject List Screen</Text>
				<Text>Subject List Screen</Text>
				<Text>Subject List Screen</Text>
				<Text>Subject List Screen</Text>
			</View>
		);
	}
}

export default SubjectListScreen;