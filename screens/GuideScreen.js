import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
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
				<View style={styles.row}>
					<View style={[
						styles.col,
						styles.rowOne
					]}>
						<Text>Guide Screen</Text>
					</View>
					<View style={[
						styles.col,
						styles.rowTwo
					]}>
						<Text>Guide Screen Two</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={[
						styles.col,
						styles.rowThree
					]}>
						<Text>Guide Screen Three</Text>
					</View>
					<View style={[
						styles.col,
						styles.rowFour
					]}>
						<Text>Guide Screen Four</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	grid: {
		flex: 1
	},
	row: {
		flexDirection: 'row'
	},
	col: {
		flexDirection: 'column'
	},
	rowOne: { backgroundColor: 'blue'},
	rowTwo: { backgroundColor: 'red'},
	rowThree: { backgroundColor: 'green'},
	rowFour: { backgroundColor: 'yellow'}
})

export default GuideScreen;
