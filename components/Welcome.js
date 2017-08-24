import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from './common/Button';

export default class Welcome extends React.Component {


  render() {
    return (
      <View style={styles.welcomeContainer}>
        <Image
          source={ require('../assets/images/silhouette.jpg') }
          style={styles.welcomeImage}
        />
        <Text style={styles.welcomeText}>Welcome to your place of rest.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  // twoButtons: {
  //   flex: 1,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginTop: 40
  // },
  welcomeContainer: {
    marginTop: 50
  },
  welcomeText: {
    fontFamily: "Futura",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10
  },
  welcomeImage: {
    height: 300,
    width: 600
  }
})
