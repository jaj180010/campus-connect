import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ScanCompleteScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Eo_circle_green_checkmark.png')}
        style={styles.image}
      />
      <Text style={styles.message}>Scan Complete! Returning to home...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150, 
    marginBottom: 20, 
  },
  message: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ScanCompleteScreen;
