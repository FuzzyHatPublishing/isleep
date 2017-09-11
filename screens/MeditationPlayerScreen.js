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
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import { Asset, Audio, Font, Video, LinearGradient } from 'expo';

const ICON_PLAY_BUTTON = {
  name: 'ios-play'
};
const ICON_PAUSE_BUTTON = {
  name: 'ios-pause'
};
const ICON_STOP_BUTTON = {
	name: 'ios-square'
	};
const ICON_FORWARD_BUTTON = {
	name: 'ios-fastforward'
};
const ICON_BACK_BUTTON = {
	name: 'ios-rewind'
};
const ICON_MUTED_BUTTON = {
  name: 'ios-volume-off'
};

const ICON_UNMUTED_BUTTON = {
  name: 'ios-volume-up'
};

const ICON_TRACK_1 = require('../assets/images/line.png');
const ICON_THUMB_1 = require('../assets/images/dot.png');


const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';
const RATE_SCALE = 3.0;
// const VIDEO_CONTAINER_HEIGHT = DEVICE_HEIGHT * 2.0 / 7.0 - FONT_SIZE * 2;
const VIDEO_CONTAINER_HEIGHT = DEVICE_HEIGHT * .6;


class MeditationPlayerScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
		title: 'Meditation',
		headerLeft:
			<Icon
				name='navigate-before'
				size={32}
				onPress={ () => navigation.navigate('meditationList') }
			/>,
		headerStyle: { marginTop: Platform.OS === 'android' ? 24: 0 }
	});

  constructor(props) {
    super(props);
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      meditationTrack: this.props.navigation.state.params.meditation,
      muted: false,
      playbackInstanceName: LOADING_STRING,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      fontLoaded: false,
      volume: 1.0,
      rate: 1.0,
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
      fullscreen: false,
      modalVisible: false
    };
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    });
    (async () => {
      await Font.loadAsync({
        // I don't think we want this font, but left in case want another font.
        'cutive-mono-regular': require('../assets/fonts/CutiveMono-Regular.ttf')
      });
      this.setState({ fontLoaded: true });
    })();
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    
    const initialStatus = {
      shouldPlay: playing,
      volume: this.state.volume,
      isMuted: this.state.muted
    };

    const source = this.state.meditationTrack.id == 1 ? require('../assets/sounds/test-audio.mp3') : require('../assets/sounds/test-audio-2.mp3');

    const { sound, status } = await Audio.Sound.create(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate
    );
    this.playbackInstance = sound;

    this._updateScreenForLoading(false);
  }

  _mountVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true
      });
    } else {
      this.setState({
        playbackInstanceName: this.state.meditationTrack.title,
        isLoading: false
      });
    }
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
      });
      if (status.didJustFinish) {
        this._finishedMeditation(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  _onLoad = status => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = error => {
    console.log(`ON ERROR : ${error}`);
  };

  _onReadyForDisplay = event => {
    const widestHeight =
      DEVICE_WIDTH * event.naturalSize.height / event.naturalSize.width;
    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      this.setState({
        videoWidth:
          VIDEO_CONTAINER_HEIGHT *
          event.naturalSize.width /
          event.naturalSize.height,
        videoHeight: VIDEO_CONTAINER_HEIGHT
      });
    } else {
      this.setState({
        videoWidth: DEVICE_WIDTH,
        videoHeight:
          DEVICE_WIDTH * event.naturalSize.height / event.naturalSize.width
      });
    }
  };

  _onFullscreenUpdate = event => {
    console.log(
      `FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`
    );
  };

  _finishedMeditation = event => {
    this.playbackInstance = null;
    this.setModalVisible(!this.state.modalVisible);
    console.log(
      `AUDIO UPDATE : Finished meditation`
      );
  };

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this.setState({
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT
    });

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
  };

  _onForwardPressed = () => {
    if (this.playbackInstance != null) {
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onBackPressed = () => {
    if (this.playbackInstance != null) {
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onMutePressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsMutedAsync(!this.state.muted);
    }
  };

  _onVolumeSliderValueChange = value => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setVolumeAsync(value);
    }
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
  }

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

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return '';
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return !this.state.fontLoaded
      ? <View style={styles.emptyContainer} />
      : <View style={styles.container}>
          <View />
          
          <View style={styles.videoContainer}>
            <Video
              ref={this._mountVideo}
              onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
              onLoadStart={this._onLoadStart}
              onLoad={this._onLoad}
              onError={this._onError}
            />
            <Image
              source={ require('../assets/images/waterfall.png') }
              style={styles.image}
            >
              <LinearGradient
                colors={['transparent', 'rgba(255,255,255,0.8)']}
                style={styles.linearGradient}
              />
            </Image>  

          </View>

          <View
            style={[
              styles.playbackContainer,
              {
                opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0
              }
            ]}
          >
            <View style={styles.timestampRow}>
              <Text
                style={[
                  styles.text,
                  styles.buffering
                ]}
              >
                {this.state.isBuffering ? BUFFERING_STRING : ''}
              </Text>
              <Text
                style={[
                  styles.text,
                  styles.timestamp
                ]}
              >
                {this._getTimestamp()}
              </Text>
            </View>

            <View style={styles.volumeContainer}>
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onPlayPausePressed}
                disabled={this.state.isLoading}
              >
                <Ionicons
                  style={styles.ionicons}
                  name={
                    this.state.isPlaying
                    ? ICON_PAUSE_BUTTON.name
                    : ICON_PLAY_BUTTON.name
                  }
                  size={36}
                />
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onStopPressed}
                disabled={this.state.isLoading}            
              >
                 <Ionicons
                    style={styles.ionicons}
                    name={ICON_STOP_BUTTON.name}
                    size={28}
                  />
              </TouchableHighlight>
              <Slider
                style={styles.playbackSlider}
                trackImage={ICON_TRACK_1.module}
                thumbImage={ICON_THUMB_1.module}
                value={this._getSeekSliderPosition()}
                onValueChange={this._onSeekSliderValueChange}
                onSlidingComplete={this._onSeekSliderSlidingComplete}
                disabled={this.state.isLoading}
              />
            </View>

           <View
              style={[
                styles.buttonsContainerBase,
                styles.buttonsContainerMiddleRow
              ]}
            >
              <View style={styles.descriptionText}>
                <Text>
                  This is the short/long session that we will need to add a description to the meditaiton object for.
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {alert("On close go to Home screen")}}
              >
              <View style={styles.modal}>
                <Text>Enter a random string here</Text>
                <TouchableHighlight onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                  <Text>Hide the modal</Text>
                </TouchableHighlight>
              </View>
            </Modal>
          </View>


        </View>;
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
    backgroundColor: '#c9c7c7'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR
  },
  wrapper: {},
  nameContainer: {
    height: FONT_SIZE + 10
  },
  space: {
    height: FONT_SIZE
  },
  videoContainer: {
    flex: 1,
    height: VIDEO_CONTAINER_HEIGHT
  },
  video: {
    maxWidth: DEVICE_WIDTH
  },
  playbackContainer: {
    flex: 1,
    // flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#c9c7c7',
    // paddingTop: DEVICE_HEIGHT * .2,
    // minHeight: ICON_THUMB_1.height,
    // maxHeight: ICON_THUMB_1.height * 2.0
  },
  playbackSlider: {
    width: DEVICE_WIDTH * .6,

    // alignSelf: 'stretch',
    marginRight: 10,
    marginLeft: 5
  },
  volumeSlider: {
    width: DEVICE_WIDTH * .6
  },
  timestampRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    backgroundColor:'transparent',
    maxHeight: FONT_SIZE * 2
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE
  },
  buffering: {
    textAlign: 'left',
    paddingLeft: 20
  },
  timestamp: {
    textAlign: 'right',
    paddingRight: 20
  },
  buttonsContainerBase: {
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsContainerTopRow: {
    maxHeight: FONT_SIZE * 5,
    minHeight: FONT_SIZE * 5,

    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0
  },
  buttonsContainerMiddleRow: {
    maxHeight: FONT_SIZE * 5,
    minHeight: FONT_SIZE * 5,
    alignSelf: 'stretch'
  },
  ionicons: {
    paddingLeft: 8,
    paddingRight: 8
  },
  volumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: DEVICE_WIDTH / 1.2,
    maxWidth: DEVICE_WIDTH / 1.2
  },
  image: {
    height: DEVICE_HEIGHT * .45,
    width: DEVICE_WIDTH
  },
  linearGradient: {
    left: 0,
    right: 0,
    bottom: 0,
    height: DEVICE_HEIGHT * .45
  },
  descriptionText: {
    backgroundColor: '#fff',
    padding: 5,
    marginLeft: 3,
    marginRight: 3
  },
  modal: {
    flex: 1,
    // marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',

  }
});

export default MeditationPlayerScreen;
