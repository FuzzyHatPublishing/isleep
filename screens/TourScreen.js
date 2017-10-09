import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { Constants } from 'expo';
import RootNavigation from '../navigation/RootNavigation';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGES = [
	{
		message: "The best solution to finding the proper rest you need.",
		moreMessage: "Swipe to get started",
		backgroundColor: "#233243"
	},
	{
		message: "Listen in a quiet place",
		moreMessage: "Important!",
		backgroundColor: "#7E8578"
	},
	{
		message: "Get super comfey",
		moreMessage: "Like, reaallyyy comfey.",
		backgroundColor: "#C17918"
	},
	{
		message: "Turn phone off",
		moreMessage: "More best practices in the 'app guide'",
		backgroundColor: "#0B5F6A"
	},
	{
		message: "Choose meditation",
		moreMessage: "Pick the meditation that works with your schedule.",
		backgroundColor: "#695065"
	}
]

class TourScreen extends Component {

	state = {
    scroll: new Animated.Value(0),
  };

  render() {

    const position = Animated.divide(this.state.scroll, PAGE_WIDTH);
    const backgroundColor = position.interpolate({
      inputRange: PAGES.map((_, i) => i),
      outputRange: PAGES.map(p => p.backgroundColor),
    });

    return (
			<View style={styles.container}>
				<Animated.View style={[ StyleSheet.absoluteFill, { backgroundColor } ]} />

				<Animated.ScrollView
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					scrollEventThrottle={16}
					onScroll={Animated.event(
						[ { nativeEvent: { contentOffset: { x: this.state.scroll } } } ],
					)}>

					{PAGES.map((page, i) => (
						<View key={i} style={styles.page}>
							<View style={[ styles.card ]}>
								<Text style={styles.message}>{page.message}</Text>
								<Text style={styles.moreMessage}>{page.moreMessage}</Text>

							</View>

						</View>
					))}
				</Animated.ScrollView>
        <TouchableHighlight
          // onPress={ () => this.props.navigation('home') }
          onPress = {this.props.handler}
        >
          <View style={styles.button}>
            <Text
              style={styles.buttonText}
            >
              Get Started
            </Text>
  				</View>
        </TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    fontSize: PAGE_WIDTH/12,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },

  moreMessage: {
    fontSize: PAGE_WIDTH/18,
    color: '#fff',
    backgroundColor: 'transparent',
    marginTop: 20,
    lineHeight: 25,
    textAlign: 'center'
  },
  page: {
    width: PAGE_WIDTH,
    paddingTop: Constants.statusBarHeight + 48,
  },
  card: {
    position: 'absolute',
    margin: 12,
    marginTop: PAGE_WIDTH / 2,
    left: 12,
    top: 0,
    right: 0,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 140,
  },
  button: {
    backgroundColor: 'rgba(0,0,0, 0.3)',
    position: 'absolute',
    margin: 12,
    marginTop: 40,
    left: (PAGE_WIDTH / 2) - 100,
    borderRadius: 50,
    alignItems: 'center',
    bottom: 80,
  },
  buttonText: {
    margin: 15,
    marginLeft: 50,
    marginRight: 40,
    color: '#fff',
    fontSize: 14,
    fontVariant: ['small-caps'],
  }
});

export default TourScreen;
