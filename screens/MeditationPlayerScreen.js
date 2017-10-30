/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { Asset, Audio } from 'expo';

const ICON_TRACK = require('../assets/images/line-white-thin.png');
const ICON_THUMB = require('../assets/images/dot-sm.png');

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#000';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = '... loading ...';
// const BUFFERING_STRING = '...buffering...';


class MeditationPlayerScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'iSleep',
    headerLeft:
      <Icon
        name='navigate-before'
        size={32}
        color={'white'}
        onPress={ () => navigation.goBack() }
      />,
    headerStyle: { marginTop: Platform.OS === 'android' ? 24: 0, backgroundColor: "#000"  },
    headerTitleStyle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginHorizontal: 8 }
  });

  constructor(props) {
    super(props);
    this.playbackInstance = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      meditationTrack: this.props.navigation.state.params.meditation,
      playbackInstanceName: LOADING_STRING,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isLoading: true,
      modalVisible: false,
      closingMessage: ''
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

    const initialStatus = {
      shouldPlay: playing
    };

    const source = this.state.meditationTrack.id == 1 ? require('../assets/sounds/test-audio.mp3') : require('../assets/sounds/test-audio-2.mp3');
    
    try  {
      const { sound, status } = await Audio.Sound.create(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate
      )
      this.playbackInstance = sound;
      this._updateScreenForLoading(false);
    } catch(e) {
      console.log("Problem creating sound object: ", e)
    }
  } 

 _updateScreenForLoading(isLoading) {
    if (isLoading) {
      console.log("in updateScreenForLoading-if")
      this.setState({
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true
      });
    } else {
      console.log("in updateScreenForLoading-else")

      this.setState({
        playbackInstanceName: this.state.meditationTrack.title,
        isLoading: false
      });
    }
  }

  _onPlaybackStatusUpdate = status => { 
    if (!status.isLoaded) {
      // Update your UI for the unloaded state
      if (status.error) {
        console.log(`Encountered a fatal error during playback: ${status.error}`);
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      if (status.isLoaded) {
      console.log("in setOnPlaybackStatusUpdate-isLoaded")

        this.setState({
          playbackInstancePosition: status.positionMillis,
          playbackInstanceDuration: status.durationMillis,
          shouldPlay: status.shouldPlay,
          isPlaying: status.isPlaying,
          // isBuffering: status.isBuffering,
        });
        if (status.didJustFinish) {
          console.log(
            `AUDIO UPDATE : Finished meditation`
            );
          this.playbackInstance.unloadAsync()
          this._getRandomClosingMessage();
          this._setModalVisible(!this.state.modalVisible);
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

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      );
    }
    return 0;
  };

  _onSeekSliderValueChange = value => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
      if (this.playbackInstance != null) {
        this.isSeeking = false;
        const seekPosition = value * this.state.playbackInstanceDuration;
        if (this.shouldPlayAtEndOfSeek) {
          this.playbackInstance.playFromPositionAsync(seekPosition);
        } else {
          this.playbackInstance.setPositionAsync(seekPosition);
        }
      }
    };

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getTimestampIncr() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )}`;
    }
    return '';
  }

  _getTimestampDecr() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstanceDuration - this.state.playbackInstancePosition
      )}`;
    }
    return '';
  }

  _getRandomClosingMessage() {
    console.log("in _getRandomClosingMessage")

    let messages = require('../assets/data/closing_message_data');
    let randomMessage = messages[Math.floor(Math.random()*messages.length)];
    this.setState({closingMessage: randomMessage.message});
  }

  _setModalVisible(visible) {
    console.log(`MODAL UPDATE : _setModalVisible`)
    this.setState({modalVisible: visible});
  }

  _getImage(meditation) {
    return meditation.id == 1 ? require('../assets/images/sky-moon-cloud-min.jpg') : require('../assets/images/beach-meditation-min.jpg')
  }
  
  render() {
    const { goBack } = this.props.navigation;
    return(
      <View style={styles.container}>
        
        <Image
          source={ this._getImage(this.state.meditationTrack) }
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.title}>
          {this.state.playbackInstanceName}
        </Text>
        <Text style={styles.title}>
          YOGA NIDRA
        </Text>
        <View style={styles.timestampRow}>
          <Text
            style={[
              styles.text,
              styles.timestamp
            ]}
          >
            {this._getTimestampIncr()}
          </Text>
        <Slider
            style={styles.playbackSlider}
            minimumTrackTintColor={'#555555'}
            trackImage={ICON_TRACK.module}
            thumbImage={require('../assets/images/dot-white-12px.png')}
            value={this._getSeekSliderPosition()}
            onValueChange={this._onSeekSliderValueChange}
            onSlidingComplete={this._onSeekSliderSlidingComplete}
            disabled={this.state.isLoading}
          />
          <Text
            style={[
              styles.text,
              styles.timestamp
            ]}
          >
            {this._getTimestampDecr()}
          </Text>
        </View>
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
                  size={46}
                  color="#fff"
                />
              ) : (
                <MaterialIcons
                  name="play-arrow"
                  size={46}
                  color="#fff"
                />
              )}
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              console.log("On close go to Home screen")
            }}
            >
            <TouchableOpacity
              style={styles.container}
              activeOpacity={1}
              onPressOut={() => {
                this._setModalVisible(false)
                goBack();
              }}
            >
              <View style={styles.modal}>
                <Text style={styles.modalMessage}>{ this.state.closingMessage }</Text>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '10%',
    backgroundColor: BACKGROUND_COLOR
  },
  image: {
    flex: 1, 
    height: DEVICE_WIDTH * .6,
    width: DEVICE_WIDTH,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10
  },
  timestampRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    maxHeight: FONT_SIZE * 2
  },
  text: {
    color: '#fff',
    fontSize: 12
  },
  playbackSlider: {
    width: DEVICE_WIDTH * .6
  },
  round: {
    height: 70,
    width: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: BACKGROUND_COLOR
  },
   modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 22,
    color: '#fff'
  }
});

export default MeditationPlayerScreen;
