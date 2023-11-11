import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import * as storage from '../Storage'; 

const UserProfileScreen = () => {
  const staticUserInfo = {
    name: "John Doe",
    classStanding: "Sophomore",
    major: "Computer Science",
    profilePic: require('../assets/Pfp.png'),
    contact: "john.doe@university.edu",
    address: "123 College st, University City, TX",
    interests: ["Coding", "AI", "VR", "Gaming"],
  };

  // State for dynamic user profile data
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Function to load user profile data
    const loadProfile = async () => {
      const profile = await storage.getUserProfile();
      if (profile) {
        setUserProfile(profile);
      } else {
        // Handle the scenario where no profile is returned
        console.log('No user profile data found');
      }
    };

    loadProfile();
  }, []);

  const renderInterests = (interests) => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.interestsContainer}>
        {interests.map((interest, index) => (
          <View key={index} style={styles.interest}>
            <Text style={styles.interestItem}>{interest}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  if (!userProfile) {
    return (
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
      </View>
      <View style={styles.profileHeader}>
        <Image source={staticUserInfo.profilePic} style={styles.profilePic} />
        <Text style={styles.name}>{staticUserInfo.name}</Text>
        <Text style={styles.details}>{staticUserInfo.classStanding} - {staticUserInfo.major}</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoText}>Contact: {staticUserInfo.contact}</Text>
        <Text style={styles.infoText}>Address: {staticUserInfo.address}</Text>
        <Text style={styles.infoText}>Interests:</Text>
        {renderInterests(staticUserInfo.interests)}
      </View>
        </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
      </View>
      <View style={styles.profileHeader}>
        <Image source={staticUserInfo.profilePic} style={styles.profilePic} />
        <Text style={styles.name}>{staticUserInfo.name}</Text>
        <Text style={styles.details}>{staticUserInfo.classStanding} - {staticUserInfo.major}</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoText}>Contact: {staticUserInfo.contact}</Text>
        <Text style={styles.infoText}>Address: {staticUserInfo.address}</Text>
        <Text style={styles.infoText}>Interests:</Text>
        {renderInterests(staticUserInfo.interests)}
      </View>
      <View style={styles.stampsContainer}>
      {userProfile.scannedLogs.map((log, index) => (
        <View key={index} style={styles.stamp}>
          <Text style={styles.stampText}>{log}</Text>
        </View>
      ))}
    </View>
  </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebe8e8',
  },
  header: {
    backgroundColor: '#E65728',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  details: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
  },
  infoSection: {
    padding: 15,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
  },
  interestsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  interest: {
    marginRight: 10,
  },
  interestItem: {
    fontSize: 14,
    fontWeight: '300',
    color: '#777',
  },
  stampsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  stamp: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E65728',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
  },
  stampText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    paddingHorizontal: 5,
    flexWrap: 'wrap',
  },
});

export default UserProfileScreen;
