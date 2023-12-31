import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();

import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClubsScreen from './Screens/Clubs'
import HomeScreen from './Screens/Home'
import EventsScreen from './Screens/Events'
import MessageScreen from './Screens/Messages'
import ProfileScreen from './Screens/Profile'
import ScanScreen from './Screens/Scan'
import ClubDetailScreen from './Components/Club_Comps/Club-Info-Screen'
import EventDetail from './Components/Event_Comps/EventDetail';
import {clubData} from './Data/clubData'
import ScanCompleteScreen from './Screens/ScanCompleteScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {
   useEffect(() => {
    // This will run only once when the app starts
    AsyncStorage.clear(); // No need to handle errors here if you don't need to log them
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Clubs" component={ClubsScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="ClubDetail" component={ClubDetailScreen} />
        <Stack.Screen name="EventDetail" component={EventDetail} options={{title: 'Event Detail'}} />
        <Stack.Screen name="Messages" component={MessageScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="ScanComplete" component={ScanCompleteScreen} />
        {clubData.map((club) => (
          <Stack.Screen key={club.route} name={club.route} component={ClubDetailScreen} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
