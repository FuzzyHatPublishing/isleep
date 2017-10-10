/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  // Modal,
  Platform,
  // Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  // TouchableOpacity,
  View
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { Asset, Audio } from 'expo';

const ICON_PLAY_BUTTON = { name: 'ios-play' };
const ICON_PAUSE_BUTTON = { name: 'ios-pause' };

const ICON_TRACK_1 = require('../assets/images/line.png');
const ICON_THUMB_1 = require('../assets/images/dot.png');

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';


class MeditationPlayerScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
		title: 'iSleep',
		headerLeft:
			<Icon
				name='navigate-before'
				size={32}
				onPress={ () => navigation.goBack() }
			/>,
		headerStyle: { marginTop: Platform.OS === 'android' ? 24: 0 }
	});

  constructor(props) {
    super(props);
    this.playbackInstance = null;
    this.state = {
      // playbackInstanceName: LOADING_STRING,
      // playbackInstancePosition: null,
      // playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
    };

  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    });

    this._loadNewPlaybackInstance(false);
  }

  
  
  
  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    const source = require('../assets/sounds/test-audio.mp3');
    const initialStatus = {
      shouldPlay: playing
      // rate: this.state.rate,
      // volume: this.state.volume,
    };

    try  {
      const { sound, status } = await Audio.Sound.create(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate
      )
      this.playbackInstance = sound;
    } catch(e) {
      console.log("Problem creating sound object: ", e)
    }

    // console.log('in loadNew: playbackInstance after sound create ', this.playbackInstance )

    // this._updateScreenForLoading(false);
  } 

  _onPlaybackStatusUpdate = status => { 
    // console.log("jsut inside _onPlaybackStatusUpdate")
    // console.log(this.playbackInstance)
    if (!status.isLoaded) {
      // Update your UI for the unloaded state
      if (status.error) {
        console.log(`Encountered a fatal error during playback: ${status.error}`);
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      if (status.isLoaded) {
        this.setState({
          // playbackInstancePosition: status.positionMillis,
          // playbackInstanceDuration: status.durationMillis,
          shouldPlay: status.shouldPlay,
          isPlaying: status.isPlaying,
          // isBuffering: status.isBuffering,
        });
        if (status.didJustFinish) {
          this.playbackInstance.unloadAsync()
        }
      } else {
        if (status.error) {
          console.log(`FATAL PLAYER ERROR: ${status.error}`);
        }
      }
    }
  };

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };


  render() {
    return(
      <View style={styles.container}>
        
        <Image
          source={ require('../assets/images/meditation-on-beach.jpg') }
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.title}>
          Title Meditation
        </Text>
        <View style={styles.round}>
          <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              onPress={this._onPlayPausePressed}
              // disabled={this.state.isLoading}
            >
            <View>
              {this.state.isPlaying ? (
                <MaterialIcons
                  name="pause"
                  size={60}
                  color="#56D5FA"
                />
              ) : (
                <MaterialIcons
                  name="play-arrow"
                  size={60}
                  color="#56D5FA"
                />
              )}
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    alignItems: 'center',
    // alignSelf: 'stretch',
    paddingBottom: '10%',
    backgroundColor: '#000'
    // justifyContent: 'space-between'
  },
  image: {
    flex: 1, 
    // height: 100,
    // width: 100,
    height: DEVICE_WIDTH * .5,
    width: DEVICE_WIDTH,
    // height: undefined, 
    // width: undefined
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22
  },
  round: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'gold'
  }
});

export default MeditationPlayerScreen;
