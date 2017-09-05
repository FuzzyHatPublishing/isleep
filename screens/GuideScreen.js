import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform, Dimensions } from 'react-native';
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
					{ 
						this.state.guideSubjects.map((guideItem) => (
						<View style={styles.box}>
							<Text 
								key={guideItem.id}
							>
								{guideItem.subject}
							</Text>
						</View>
						))
					}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	grid: {
    flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
    backgroundColor: '#fff',
    padding: 2
  },
	box: { 
		backgroundColor: '#e88024',
		margin: 2,
		width: Dimensions.get('window').width / 2 - 6,
		height: Dimensions.get('window').width / 2 - 6,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default GuideScreen;
