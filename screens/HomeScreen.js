import React from 'react';
import {
  AppLoading,
  AsyncStorage,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Welcome from '../components/Welcome';
import TourScreen from './TourScreen';
import Temp from '../components/Temp';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      firstLaunch: null
    }
  }

  componentWillMount() {
    AsyncStorage.removeItem("alreadyLaunched");
  }
  
  componentDidMount() {
    AsyncStorage.getItem("alreadyLaunched").then(value => {
      if(value == null) {
        AsyncStorage.setItem('alreadyLaunched', '1', (err, result) => {
          console.log("error",err,"result",result);
        });
        this.setState({firstLaunch: true});
      }
      else {
        this.setState({firstLaunch: false});
      }})
  }

  render() {
    const { navigate } = this.props.navigation;

    if(this.state.firstLaunch == null) {
      return <Temp />;  
    } else if (this.state.firstLaunch == true) {
      return <TourScreen navigation={navigate} />;
    } else {
      return  (
        <View style={styles.container}>
          <Welcome />
        </View>
      ); 
    }
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn all the things
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
