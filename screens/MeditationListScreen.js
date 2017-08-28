import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import MeditationInfo from '../components/MeditationInfo';

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
      return this.state.meditations.map(meditation =>
        <MeditationInfo key={meditation.id} meditation={meditation} />
      );
  }

  render() {
    return (
      <ScrollView>
        {this.renderMeditations()}
      </ScrollView>
    )
  }
}

export default MeditationListScreen;
