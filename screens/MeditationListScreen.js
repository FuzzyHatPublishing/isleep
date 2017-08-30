import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import Button from '../components/common/Button';


class MeditationListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
		title: 'Meditations',
		headerLeft:
			<Icon
				name='navigate-before'
				size={32}
				onPress={ () => navigation.navigate('home') }
			/>,
		headerStyle: { marginTop: Platform.OS === 'android' ? 24: 0 }
	});

  state = { meditations: [] };

  componentWillMount() {
    let meditationData = require('../assets/meditations/meditation_data');
    this.setState({ meditations: meditationData });
  }

  renderMeditations() {
      const { navigate } = this.props.navigation;

      return this.state.meditations.map(meditation =>
        <Button
          key={meditation.id}
          onPress={() => navigate('meditation', { meditation })}
          title={ meditation.title }
        >
        {meditation.title}
        </Button>
      );
  }

  render() {

    return (
      <View style={styles.container}>
        {this.renderMeditations()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  twoButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40
  }
});

export default MeditationListScreen;
