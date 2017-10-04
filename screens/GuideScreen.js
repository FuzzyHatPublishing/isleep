import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Text,
	Platform,
	Dimensions,
	TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';

class GuideScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'iSleep Guide',
		headerStyle: { marginTop: Platform.OS === 'android' ? 24 : 0 }
	});

	state = { guideSubjects: [] };

	componentWillMount() {
		let guideData = require('../assets/data/guide_data');
		this.setState({ guideSubjects: guideData });
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={styles.grid}>
				{
					this.state.guideSubjects.map((subject) => (
						<TouchableHighlight 
							style={styles.box} 
							key={subject.id}
							underlayColor={'#a3a1a1'}
							onPress={ () => navigate('subjectList', {subject}) }
							>
							<Text style={styles.topic}>{subject.topic}</Text>
						</TouchableHighlight>
					))
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	grid: {
		flex: 1,
		backgroundColor: '#FAFAFA',
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 2
	},
	box: {
		margin: 2,
		width: Dimensions.get('window').width / 2 -6,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FAFAFA',
		borderWidth: 5,
		borderColor: '#607D8B'
	},
	topic: {
		fontSize: 20,
		paddingBottom: 10
	}
})

export default GuideScreen;
