import React, { Component } from 'react';
import { View, Text } from 'react-native';

const MeditationInfo = ({ meditation }) => {
  const { id, title, source } = meditation;

  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}

export default MeditationInfo;
