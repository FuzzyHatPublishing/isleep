import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class MeditationListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
		title: 'Meditations',
		headerStyle: { marginTop: Platform.OS === 'android' ? 24: 0 }
	});

  state = { meditations: [] };

  componentWillMount() {
    let meditationData = require('../assets/data/meditation_data');
    this.setState({ meditations: meditationData });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Image
          source={ require('../assets/images/meditating_arms.png') }
          style={styles.imageStyle}
        />
        <List style={styles.listStyle}>
          {
            this.state.meditations.map((meditation) => (
              <ListItem
                key={meditation.id}
                title={meditation.title}
                onPress={() => navigate('meditation', {meditation}) }
              />
            ))
          }
        </List>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: 300,
    width: null
  }
});

export default MeditationListScreen;
