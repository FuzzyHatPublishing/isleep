import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

class MeditationListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
		title: 'Meditations',
		headerStyle: { marginTop: Platform.OS === 'android' ? 24: 0, backgroundColor: "#000" },
    headerTitleStyle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginHorizontal: 8, alignSelf: 'center' }
	});

  state = { meditations: [] };

  componentWillMount() {
    let meditationData = require('../assets/data/meditation_data');
    this.setState({ meditations: meditationData });
  }

  _getImage(meditation) {
    return meditation.id == 1 ? require('../assets/images/sky-moon-cloud-min.jpg') : require('../assets/images/long-rest.jpg')
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
                source={ this._getImage(meditation) } >
                  <View style={styles.textContainer}>
                    <View style={styles.textRow}>
                      <Text style={styles.textStyle}>{meditation.title}</Text>
                      <Text style={styles.textStyle}>{meditation.length}</Text>
                    </View>
                  </View>
                </Image>
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
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 5
  },
  imageStyle: {
    height: 200,
    width: null
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default MeditationListScreen;
