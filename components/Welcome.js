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
        <Text style={styles.welcomeText}>Welcome to your place of rest.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  welcomeContainer: {
    marginTop: 50,
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
