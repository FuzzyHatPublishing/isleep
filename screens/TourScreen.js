import React, { Component } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { Constants } from 'expo';
import RootNavigation from '../navigation/RootNavigation';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGES = [
	{
		id: 1,
		message: "",
		moreMessage: "The best solution to finding the proper rest you need.",
		backgroundColor: "#233243"
	},
	{
		id: 2,
		message: "Listen in a quiet place",
		moreMessage: "Important!",
		backgroundColor: "#7E8578"
	},
	{
		id: 3,
		message: "Get super comfey",
		moreMessage: "Like, reaallyyy comfey.",
		backgroundColor: "#C17918"
	},
	{
		id: 4,
		message: "Turn phone off",
		moreMessage: "More best practices in the 'app guide'.",
		backgroundColor: "#0B5F6A"
	},
	{
		id: 5,
		message: "Choose meditation",
		moreMessage: "Pick the meditation that works with your schedule.",
		backgroundColor: "#695065"
	}
]

class TourScreen extends Component {

	state = {
    scroll: new Animated.Value(0),
	}

	_getImage(i) {
		switch (i) {
			case 0:
				return require('../assets/images/clouds/tour-page-1.jpg')
				break;
			case 1:
				return require('../assets/images/clouds/tour-page-2.jpg')
				break;
			case 2:
				return require('../assets/images/clouds/tour-page-3.jpg')
				break;
			case 3:
				return require('../assets/images/clouds/tour-page-4.jpg')
				break;
			case 4:
				return require('../assets/images/clouds/tour-page-5.jpg')
				break;
		}
	}

  render() {

    const position = Animated.divide(this.state.scroll, PAGE_WIDTH);
    const backgroundColor = position.interpolate({
      inputRange: PAGES.map((_, i) => i),
      outputRange: PAGES.map(p => p.backgroundColor),
    });

		function renderIf(condition, content) {
	    if (condition) {
	        return content;
	    } else {
	        return null;
	    }
		}

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
						)}
						>

						{PAGES.map((page, i) => (
							<View key={i} style={styles.page}>
								<Image 
								style={styles.image}
								source={ this._getImage(i) } />
								<View style={[ styles.card ]}>
									{renderIf(i===0,
										<Text style={styles.header}>iSLEEP</Text>
									)}
									<Text style={styles.message}>{page.message}</Text>
									<Text style={styles.moreMessage}>{page.moreMessage}</Text>
									{renderIf(i===0,
										<View>
											<Image 
												style={styles.gesture}
												source={ require('../assets/images/swipe-gesture.png') } />
											<Text style={styles.swipeText}>Swipe to get started</Text>
										</View>
	                )}
									{renderIf(i===4,
										<View style={styles.button}>
											<TouchableHighlight style={styles.touchable} onPress={() => {this.props.handler()}}>
												<Text style={styles.buttonText}>
													Get Started
												</Text>
											</TouchableHighlight>
										</View>
	                )}
								</View>
							</View>
						))}
					</Animated.ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
  	flex: 1,
    width: PAGE_WIDTH
  },
  gesture: {
  	alignSelf: 'center',
  	marginTop: 20,
  	width: 57,
  	height: 78
  },
  header: {
    fontSize: PAGE_WIDTH/10,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center'
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
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
    lineHeight: 25,
    textAlign: 'center'
  },
  swipeText: {
    fontSize: PAGE_WIDTH/22,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  page: {
    width: PAGE_WIDTH,
    paddingTop: Constants.statusBarHeight,
  },
  card: {
    position: 'absolute',
    margin: 12,
    marginTop: PAGE_WIDTH / 3,
    left: 12,
    top: 0,
    right: 0,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 300,
  },
  touchable: {
    borderRadius: 50
  },
  button: {
    flex: 1,
    backgroundColor: 'rgba(42, 24, 39, 0.8)',
    position: 'absolute',
    margin: 12,
    marginTop: 300,
    alignSelf: 'center',
    borderRadius: 50,
  },
  buttonText: {
    margin: 15,
    marginLeft: 50,
    marginRight: 40,
    color: '#fff',
    fontSize: PAGE_WIDTH/16,
  }
});

export default TourScreen;
