import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { clubData } from '../Data/clubData'; // Import clubData

export default function Messages() {
  const [clubs, setClubs] = useState({});
  const [currentClub, setCurrentClub] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  // Initialize clubs state with the clubData and set the currentUser
  useEffect(() => {
    const initialClubs = {};
    clubData.forEach(club => {
      initialClubs[club.name] = {
        messages: [],
        image: club.imageSource, // Save the image path/source here
      };
    });
    setClubs(initialClubs);
  }, []);

  const onSend = (newMessages = []) => {
    setClubs(previousClubs => ({
      ...previousClubs,
      [currentClub]: {
        ...previousClubs[currentClub],
        messages: GiftedChat.append(previousClubs[currentClub].messages, newMessages),
      }
    }));
  };

  const handleClubSelection = (clubName) => {
    setCurrentClub(clubName);
    setCurrentUser({
      _id: 1,
      avatar: clubs[clubName].image, // Set the avatar to the club's image when selecting the club
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {currentClub ? (
        <View style={{ flex: 1 }}>
          <Text style={styles.clubHeader}>{currentClub}</Text>
          <GiftedChat
            messages={clubs[currentClub].messages}
            onSend={messages => onSend(messages)}
            user={currentUser} // Use the currentUser with the avatar
          />
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentClub(null)}>
            <Text>Back to Club Selection</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView>
          {clubData.map((club) => (
            <TouchableOpacity
              key={club.name}
              style={styles.clubButton}
              onPress={() => handleClubSelection(club.name)}
            >
              <View style={styles.clubItem}>
                <Image source={club.imageSource} style={styles.clubImage} />
                <Text>{club.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F2F2F2',
  },
  flexOne: {
    flex: 1,
  },
  backButton: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  clubButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },
  clubItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clubImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  clubText: {
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
  },
  clubHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  // ... other styles if necessary
});