import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
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
        <Text>{section.details}</Text>
      </View>
    );
  }

	render() {
		return (
			<View>
				<Text>{this.state.title}</Text>
				<Accordion
	        sections={this.state.subjectCollection}
	        renderHeader={this._renderHeader}
	        renderContent={this._renderContent}
	      />
	    </View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: 'tomato'
	},
	subject: {
		backgroundColor: 'yellow'
	},
	content: {
		backgroundColor: 'purple'
	}
});

export default SubjectListScreen;