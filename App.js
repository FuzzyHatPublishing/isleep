import React from 'react';
import { AsyncStorage, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import TourScreen from './screens/TourScreen';

export default class App extends React.Component {
  constructor() {
    super();
    this.handler = this.handler.bind(this)
    this.state = {
      assetsAreLoaded: false,
      firstLaunch: null,
      showTour: true
    }
  }
 
  componentDidMount() {
    AsyncStorage.getItem("alreadyLaunched").then(value => {
      if(value == null) {
        AsyncStorage.setItem('alreadyLaunched', '1');
        this.setState({firstLaunch: true});
      }
      else {
        this.setState({firstLaunch: false});
      }})
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  handler(e) {
    console.log("In handler in App.js")
    // e.preventDefault()
    this.setState({
      showTour: false
    })
  }

  render() {
    if (!this.state.assetsAreLoaded && !this.props.skipLoadingScreen || this.state.firstLaunch === null) {
      return <AppLoading />;
    } else {
      if(this.state.firstLaunch == true && this.state.showTour == true) {
        return <TourScreen handler={this.handler} />;
      } else {
        return  <RootNavigation />;
      }
    }
  }

  async _loadAssetsAsync() {
    try {
      await Promise.all([
        Asset.loadAsync([
          require('./assets/images/robot-dev.png'),
          require('./assets/images/robot-prod.png'),
        ]),
        Font.loadAsync([
          // This is the font that we are using for our tab bar
          Ionicons.font,
          // We include SpaceMono because we use it in HomeScreen.js. Feel free
          // to remove this if you are not using it in your app
          { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
        ]),
      ]);
    } catch (e) {
      // In this case, you might want to report the error to your error
      // reporting service, for example Sentry
      console.warn(
        'There was an error caching assets (see: App.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e);
    } finally {
      this.setState({ assetsAreLoaded: true });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
