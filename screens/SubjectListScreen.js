import React, { Component } from 'react';
import { 
	Image, 
	Platform,
	ScrollView, 
	StyleSheet,
	Text,
	View 
} from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

class SubjectListScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state: { params = {} } } = navigation;
		const subjectColor = params.subject.colorGuide;

		return { 
			title: params.subject.topic || 'iSleep Guide', 
			headerLeft:
				<Icon
					name='navigate-before'
					size={32}
					color={'white'}
					onPress={ () => navigation.goBack() }
				/>,
			headerStyle: { marginTop: Platform.OS === 'android' ? 24 : 0, backgroundColor: subjectColor },
			headerTitleStyle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginHorizontal: 0, alignSelf: 'center', marginLeft: Platform.OS === 'android' ? -42 : 0 },
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			title: this.props.navigation.state.params.subject.topic,
			subjectCollection: this.props.navigation.state.params.subject.subjectCollection,
			colorGuide: this.props.navigation.state.params.subject.colorGuide,
			colorHeader: this.props.navigation.state.params.subject.colorHeader,
			colorDetails: this.props.navigation.state.params.subject.colorDetails
		}
	}

	_renderHeader = (section) => {
    return (
    	<View style={styles.header} backgroundColor={this.state.colorHeader}>  
      	<Text style={styles.subject}>{section.subject}</Text>
    	</View>
    );
  };

  _renderContent = (section) => {
    return (
      <View style={styles.content} backgroundColor={this.state.colorDetails}>
      	<Text style={styles.details}>{section.details}</Text>
      </View>
    );
  };

	render() {
		return (
			<View style={styles.contentContainerStyle}>
				<Image style={styles.bgImage} source={require('../assets/images/clouds/guide-background-only.png')} />
					<ScrollView>
						<View style={styles.list}>
							<Accordion
								underlayColor={'#b2b2b2'}
				        sections={this.state.subjectCollection}
				        renderHeader={ this._renderHeader}
				        renderContent={this._renderContent}
				      />
				    </View>
			    </ScrollView>
		   </View>	
		);
	}
}

const styles = StyleSheet.create({
	contentContainerStyle: {
		flex: 1,
		backgroundColor:"black"
	},
	bgImage: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	list: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderBottomColor: '#808080'
	},
	title: {
		textAlign: 'center',
		color: "#fff",
		fontSize: 22
	},
	header: {
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10
	},
	subject: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#fff',
		marginLeft: 10,
		padding: 8
	},
	content: {
		padding: 16
	},
	details: {
		fontSize: 14,
		color: '#fff',
		paddingLeft: 14,
		paddingRight: 14,
		paddingTop: 4,
		paddingBottom: 4
	}
});

export default SubjectListScreen;
