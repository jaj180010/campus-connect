// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserProfile = async () => {
  try {
    const userProfileString = await AsyncStorage.getItem('userProfile');
    return userProfileString != null ? JSON.parse(userProfileString) : null;
  } catch (e) {
    // saving error
    console.error('Failed to load the user profile.', e);
  }
};

export const saveUserProfile = async (userProfile) => {
  try {
    const userProfileString = JSON.stringify(userProfile);
    await AsyncStorage.setItem('userProfile', userProfileString);
  } catch (e) {
    // saving error
    console.error('Failed to save the user profile.', e);
  }
};

export const clearUserProfile = async () => {
  try {
    await AsyncStorage.removeItem('userProfile');
  } catch(e) {
    // removing error
    console.error('Failed to clear the user profile.', e);
  }
};
