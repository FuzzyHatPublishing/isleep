import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import MeditationListScreen from '../screens/MeditationListScreen';
import MeditationPlayerScreen from '../screens/MeditationPlayerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GuideScreen from '../screens/GuideScreen';
import SubjectListScreen from '../screens/SubjectListScreen';
import TourScreen from '../screens/TourScreen';

export default TabNavigator(
  {
    Home: {
      screen: StackNavigator({
        home: { screen: HomeScreen },
        tour: { screen: TourScreen }
      },
      { headerMode: 'none' })
    },
    MeditationList: {
      screen: StackNavigator({
        meditationList: { screen: MeditationListScreen },
        meditation: { screen: MeditationPlayerScreen }
      },
      { headerMode: 'none' })
    },
    GuideList: {
      screen: StackNavigator({
        guideList: { screen: GuideScreen },
        subjectList: { screen: SubjectListScreen }
      },
      { headerMode: 'none' })
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-information-circle';
            break;
          case 'MeditationList':
            iconName = Platform.OS === 'ios'
              ? `ios-headset${focused ? '' : '-outline'}`
              : 'md-headset';
            break;
          case 'GuideList':
            iconName = Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-information-circle';
            break;
          case 'Settings':
            iconName = Platform.OS === 'ios'
              ? `ios-options${focused ? '' : '-outline'}`
              : 'md-options';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
