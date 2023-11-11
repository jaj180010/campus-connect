import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity, Button, Modal } from 'react-native';
import { clubData } from '../Data/clubData';
import FilterModal from '../Components/Club_Comps/FilterModal'

export default function ClubsScreen({ navigation }) {

  //Categorires displayed as filter options
  const categories = ['Art', 'Tech', 'Social', 'Science', 'Health'];

  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchedClubs, setSearchedClubs] = useState(clubData);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  // "SEARCH" functionality: if searched word is in club name
  const applySearch = () => {
    const searched = clubData.filter((club) =>
      club.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedClubs(searched);
  };

  // Toggle the selection state of categories by clicking
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((c) => c !== category)
      );
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  // "FILTER" functioanlity: display all clubs that have the selcted categories
  const applyFilters = () => {
    const filteredClubs = clubData.filter((club) =>
      selectedCategories.length === 0
        ? true
        : selectedCategories.some((category) =>
            club.categories.includes(category)
          )
    );
    setSearchedClubs(filteredClubs);
    setFilterModalVisible(false);
  };

  // Removes all selected filters
  const removeFilters = () => {
    setSelectedCategories([]);
    setSearchedClubs(clubData);
    setFilterModalVisible(false);
  };

  // Closes filter pop up
  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  return (
    <View style={styles.container}>
      
      {/* Search Bar/Button */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Club Name..."
          placeholderTextColor='grey'
          onChangeText={(text) => setSearch(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={applySearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {/* Filter Button */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}>
          <Text style={styles.searchButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Club List */}
      <ScrollView>
        {searchedClubs.map((club, index) => (
          <TouchableOpacity
            style={styles.clubButton}
            key={index}
            onPress={() => navigation.navigate(club.route, { club })}>
            <Image source={club.imageSource} style={styles.clubImage} />
            <Text style={styles.clubText}>{club.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter Pop-up */}
      <FilterModal
        isVisible={isFilterModalVisible}
        categories={categories}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        applyFilters={applyFilters}
        removeFilters={removeFilters}
        closeFilterModal={closeFilterModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F2F2F2',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  searchButton: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#E65728',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  searchButtonText: {
    color: 'white',
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
  clubImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 10
  },
  clubText: {
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
  },
});
