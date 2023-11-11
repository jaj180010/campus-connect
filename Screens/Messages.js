import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-native-modal';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Button } from 'react-native';
import { clubData } from '../Data/clubData';

const CustomCheckbox = ({ isChecked, onCheck, label }) => (
  <TouchableOpacity onPress={onCheck} style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{
      height: 20,
      width: 20,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    }}>
      {isChecked && <View style={{
        height: 12,
        width: 12,
        backgroundColor: 'blue',
      }} />}
    </View>
    <Text>{label}</Text>
  </TouchableOpacity>
);


const SurveyModal = React.memo(
  ({
    isVisible,
    categories,
    selectedCategories,
    onSelectCategory,
    onClose,
    onRecommend,
  }) => {
    const isAnyCategorySelected = categories.some(
      (category) => selectedCategories[category]
    );
    const maxModalHeight = 10 * 44;

    return (
      <Modal isVisible={isVisible} onBackdropPress={onClose}>
        <View style={styles.modalContent}>
          <ScrollView
            style={{ maxHeight: maxModalHeight }}
            showsVerticalScrollIndicator={false}
          >
            {categories.map((category, index) => (
              <View key={category} style={[
                styles.checkboxRow,
                index === categories.length - 1 && styles.lastCheckboxRow,
              ]}>
                <CustomCheckbox
                  label={category}
                  isChecked={selectedCategories[category]}
                  onCheck={() => onSelectCategory(category)}
                />
              </View>
            ))}
          </ScrollView>
          <Button
            title="Join Recommended Club"
            onPress={onRecommend}
            disabled={!isAnyCategorySelected}
            color={isAnyCategorySelected ? '#007AFF' : '#cccccc'}
          />
        </View>
      </Modal>
    );
  }
);

export default function Messages() {
  const [clubs, setClubs] = useState({});
  const [currentClub, setCurrentClub] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isSurveyVisible, setSurveyVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({});
  const categories = [...new Set(clubData.flatMap((club) => club.categories))];

  useEffect(() => {
    const initialClubs = {};
    clubData.forEach((club) => {
      const prepopulatedMessages = [
        {
          _id: 1,
          text: 'Welcome to the ' + club.name + ' club!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Bot',
            avatar: club.imageSource,
          },
        },
      ];

      initialClubs[club.name] = {
        messages: prepopulatedMessages,
        image: club.imageSource,
      };
    });
    setClubs(initialClubs);
  }, []);

  const onSend = useCallback(
    (newMessages = []) => {
      setClubs((previousClubs) => {
        const updatedMessages = GiftedChat.append(
          previousClubs[currentClub].messages,
          newMessages
        );
        const currentClubData = clubData.find(club => club.name === currentClub);
        const automatedReply = {
          _id: Math.round(Math.random() * 1000000),
          text: 'This is an automated response to your message!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'AutoResponder',
            avatar: currentClubData.imageSource,
          },
        };

        setTimeout(() => {
          setClubs((prevClubs) => ({
            ...prevClubs,
            [currentClub]: {
              ...prevClubs[currentClub],
              messages: GiftedChat.append(prevClubs[currentClub].messages, [
                automatedReply,
              ]),
            },
          }));
        }, 1000);
        return {
          ...previousClubs,
          [currentClub]: {
            ...previousClubs[currentClub],
            messages: updatedMessages,
          },
        };
      });
    },
    [currentClub]
  );

  const handleClubSelection = useCallback(
    (clubName) => {
      setCurrentClub(clubName);
      setCurrentUser({
        _id: 1,
        avatar: clubs[clubName].image,
      });
    },
    [clubs]
  );

  const handleSelectCategory = useCallback((category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  const recommendClub = useCallback(() => {
    const selected = Object.entries(selectedCategories)
      .filter(([category, isSelected]) => isSelected)
      .map(([category]) => category);

    const recommendedClubs = clubData.filter((club) =>
      club.categories.some((category) => selected.includes(category))
    );

    setSurveyVisible(false);
    setCurrentClub(
      recommendedClubs[0]?.name ||
        'No recommendation based on the selected categories.'
    );
  }, [selectedCategories]);

  const handleHelpMeDecide = useCallback(() => {
    setSurveyVisible(true);
  }, []);

  const closeModal = useCallback(() => setSurveyVisible(false), []);

  return (
    <View style={{ flex: 1 }}>
      {!currentClub && (
        <TouchableOpacity
          style={styles.recommendButton}
          onPress={handleHelpMeDecide}>
          <Text style={styles.recommendButtonText}>Join a new Club!</Text>
        </TouchableOpacity>
      )}
      {currentClub ? (
        <View style={{ flex: 1 }}>
          <Text style={styles.clubHeader}>{currentClub}</Text>
          <GiftedChat
            messages={clubs[currentClub].messages}
            onSend={onSend}
            user={currentUser}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentClub(null)}>
            <Text style={styles.backButtonText}>Back to Club Selection</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView>
          {clubData.map((club) => (
            <TouchableOpacity
              key={club.name}
              style={styles.clubButton}
              onPress={() => handleClubSelection(club.name)}>
              <View style={styles.clubItem}>
                <Image source={club.imageSource} style={styles.clubImage} />
                <Text>{club.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <SurveyModal
        isVisible={isSurveyVisible}
        categories={categories}
        selectedCategories={selectedCategories}
        onSelectCategory={handleSelectCategory}
        onClose={closeModal}
        onRecommend={recommendClub}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginVertical: 20,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  clubButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
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
  clubHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
 modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    overflow: 'hidden', 
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    width: '100%',
    paddingHorizontal: 10,
  },
  lastCheckboxRow: {
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  recommendButton: {
    marginVertical: 20, 
    backgroundColor: '#007AFF',
    borderRadius: 10, 
    paddingVertical: 15, 
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  recommendButtonText: {
    color: 'white', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    fontSize: 16, 
  },
});
