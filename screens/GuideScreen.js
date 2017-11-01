import React, { Component } from 'react';
import {
	Image,
	View,
	StyleSheet,
	Text,
	Platform,
	Dimensions,
	ScrollView,
	TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';

class GuideScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Guide',
		headerStyle: { marginTop: Platform.OS === 'android' ? 24 : 0, backgroundColor: "#000" },
		headerTitleStyle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginHorizontal: 8 }
	});

	state = { guideSubjects: [] };

	_getImage(i) {
	 	switch (i) {
	 		case 0:
	 			return require('../assets/images/guide-icons/question.png')
	 			break;
	 		case 1:
	 			return require('../assets/images/guide-icons/checked.png')
	 			break;
	 		case 2:
	 			return require('../assets/images/guide-icons/inclined-candy.png')
	 			break;
	 		case 3:
				return require('../assets/images/guide-icons/coffee.png')
				break;
		}
	 }

	componentWillMount() {
		let guideData = require('../assets/data/guide_data');
		this.setState({ guideSubjects: guideData });
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={{backgroundColor:"black"}}>
				<Image style={styles.bgImage} source={require('../assets/images/clouds/guide-clouds.png')} />
				<ScrollView>
					<View style={styles.container}>
						{
							this.state.guideSubjects.map((subject, i) => (
								<TouchableHighlight
									key={subject.id}
									underlayColor={'#494949'}
									onPress={ () => navigate('subjectList', {subject}) }
									>
									<View backgroundColor={subject.colorGuide} style={styles.box}>
										<Text style={styles.topic}>{subject.topic}</Text>
										<Image style={styles.icons} source={ this._getImage(i) } />
									</View>
								</TouchableHighlight>
							))
						}
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bgImage: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	box: {
		marginTop: 8,
		marginBottom: 8,
		height: 200,
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: 3,
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: 'white',
    shadowOffset: { height: 10, width: 10 }
	},
	container: {
		paddingTop: 8,
		paddingBottom: 8,
	},
	icons: {
		marginTop: 10,
		height: 60,
		width: 60
	},
	topic: {
		fontSize: 36,
		paddingBottom: 10,
		color: '#fff',
		fontWeight: 'bold'
	}
})

export default GuideScreen;
