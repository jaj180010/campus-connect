import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

const FilterModal = ({
  isVisible,
  categories,
  selectedCategories,
  toggleCategory,
  applyFilters,
  removeFilters,
  closeFilterModal,
}) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.filterModal}>
          
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeFilterModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          
          {/* List of Filter Categories */}
          <Text style={styles.filterHeader}>Choose Category:</Text>
          <View style={styles.filterOptions}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategories.includes(category) &&
                    styles.selectedCategory,
                ]}
                onPress={() => toggleCategory(category)}>
                <Text style={styles.categoryButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Apply Button */}
          <TouchableOpacity
            style={styles.applyFiltersButton}
            onPress={applyFilters}>
            <Text style={styles.applyFiltersButtonText}>Apply</Text>
          </TouchableOpacity>

          {/* Remove All Button */}
          <TouchableOpacity
            style={styles.removeFiltersButton}
            onPress={removeFilters}>
            <Text style={styles.removeFiltersButtonText}>Remove All</Text>
          </TouchableOpacity>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  filterModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(230, 87, 40, 0.96)',
    padding: 20,
    width: '85%',
    alignSelf: 'center',
    marginTop: '70%',
    borderRadius: 10,
  },
  filterHeader: {
    fontSize: 25,
    fontWeight: '600',
    color: 'black',
    marginBottom: 20,
  },
  filterOptions: {
    flexDirection: 'col',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#b5b3b3',
  },
  categoryButtonText: {
    color: 'black',
    fontWeight: '300',
  },
  applyFiltersButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    marginTop: 30,
    width: 150,
    alignItems: 'center',
  },
  applyFiltersButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
  },
  removeFiltersButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    width: 100,
    alignItems: 'center',
  },
  removeFiltersButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 300,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default FilterModal;
