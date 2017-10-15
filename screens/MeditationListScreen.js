import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

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
        {
          this.state.meditations.map((meditation) => (
            <TouchableHighlight
              key={meditation.id}
              underlayColor={'#181818'}
              onPress={ () => navigate('meditation', {meditation}) }
              >
              <View>
                <Image
                style={styles.imageStyle}
                source={ require('../assets/images/sky-moon-cloud-min.jpg') } />
                <View style={styles.textContainer}>
                  <Text style={styles.textStyle}>{meditation.title}</Text>
                </View>
              </View>
            </TouchableHighlight>
          ))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50
  },
  imageStyle: {
    height: 200,
    width: null
  },
  textContainer: {
    paddingBottom: 30,
    paddingLeft: 10
  },
  textStyle: {
    color: '#fff',
    fontSize: 20
  }
});

export default MeditationListScreen;
