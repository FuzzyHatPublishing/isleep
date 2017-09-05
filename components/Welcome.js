import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Welcome extends React.Component {


  render() {
    return (
      <View style={styles.welcomeContainer}>
        <Image
          source={ require('../assets/images/silhouette.jpg') }
          style={styles.welcomeImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome to your</Text>
          <Text style={styles.welcomeText}>place of rest.</Text>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  textContainer: {
    paddingBottom: 50
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
    fontFamily: "Futura",
    textAlign: "center",
    fontSize: 24,
    paddingTop: 10
  }
})
