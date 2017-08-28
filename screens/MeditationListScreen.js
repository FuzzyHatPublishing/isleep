import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/common/Button';


class MeditationListScreen extends Component {
  static navigationOptions = {
    title: 'Meditations',
  };

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
