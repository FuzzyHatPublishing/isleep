import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class Welcome extends React.Component {

  render() {
    return (
      <View style={styles.welcomeContainer}>
        <Image
          source={ require('../assets/images/night-sky-min.jpg') }
          style={styles.welcomeImage}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.welcomeText, styles.headerOne]}>Welcome to iSleep</Text>
          <Text style={[styles.welcomeText, styles.headerTwo]}>The new way to a beneficial</Text>
          <Text style={[styles.welcomeText, styles.headerTwo]}> sleep journey</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  headerOne: {
    fontSize: 30,
    paddingBottom: 15
  },
  headerTwo: {
    fontSize: 20,
  },
  textContainer: {
    paddingBottom: 200
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "space-between"
  },
  welcomeImage: {
    height: 300,
    width: 600
  },
  welcomeText: {
    // fontFamily: "Futura",
    textAlign: "center",
    color: '#fff'
  }
})

export default Welcome;
