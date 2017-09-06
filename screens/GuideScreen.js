import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Text,
	Platform,
	Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';

class GuideScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Guide',
		headerLeft:
			<Icon
				name='navigate-before'
				size={32}
				onPress={ () => navigation.navigate('home') }
			/>,
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
				<View style={styles.container}>
					{
						this.state.guideSubjects.map((subject) => (
							<View style={styles.box} key={subject.id}>
								<Text style={styles.title}>{subject.title}</Text>
								<Text style={styles.subhead}>{subject.subhead}</Text>
							</View>
						))
					}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	grid: {
		flex: 1,
		backgroundColor: '#FAFAFA'
	},
	container: {
		flex: 1,
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
	title: {
		fontSize: 20,
		paddingBottom: 10
	},
	subhead: {
		fontSize: 16,
	}
})

export default GuideScreen;
