import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

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

	constructor(props) {
		super(props);
		this.state = {
			title: this.props.navigation.state.params.subject.topic,
			subjectCollection: this.props.navigation.state.params.subject.subjectCollection
		}
	}

	_renderHeader(section) {
    return (
    	<View style={styles.header}>
      	<Text style={styles.subject}>{section.subject}</Text>
    	</View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text style={styles.details}>{section.details}</Text>
      </View>
    );
  }

	render() {
		return (
			<View>
				<Text style={styles.title}>{this.state.title}</Text>
				<View style={styles.list}>
					<Accordion
		        sections={this.state.subjectCollection}
		        renderHeader={this._renderHeader}
		        renderContent={this._renderContent}
		      />
		    </View>
	    </View>
		);
	}
}

const styles = StyleSheet.create({
	list: {
		marginTop: 12, 
		borderTopWidth: 1, 
		borderBottomWidth: 1, 
		borderBottomColor: '#cbd2d9'
	},
	title: {
		textAlign: 'center',
		fontSize: 22
	},
	header: {
		backgroundColor: 'transparent',
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		borderBottomColor: '#bbb',
		borderBottomWidth: 1
	},
	subject: {
		fontSize: 16,
		color: '#43484d',
		marginLeft: 10,
		padding: 8
	},
	content: {
		backgroundColor: '#bbb',
		padding: 10
	},
	details: {
		fontSize: 14
	}
});

export default SubjectListScreen;