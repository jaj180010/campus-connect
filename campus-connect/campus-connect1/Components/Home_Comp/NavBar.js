import { Dimensions } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function NavBar({ navigation }) {
  return (
    <View style={styles.navigationBar}>
      
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Clubs')}>
        <Icon name="cubes" size={30} color="white" />
        <Text style={styles.navButtonText}>Clubs</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Events')}>
        <Icon name="calendar" size={30} color="white" />
        <Text style={styles.navButtonText}>Events</Text>
      </TouchableOpacity>
      
      <View style={styles.scanStyle}>
        <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
          <View style={styles.iconCircle}>
            <Icon name="plus" size={40} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Messages')}>
        <Icon name="envelope" size={30} color="white" />
        <Text style={styles.navButtonText}>Messages</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
        <Icon name="user" size={30} color="white" />
        <Text style={styles.navButtonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const {width} = Dimensions.get('window');
const buttonWidth = 60;
const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: '#a8a8a8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  navButton: {
    alignItems: 'center',
    marginTop: '2%',
  },
  navButtonText: {
    marginTop: 5,
    fontSize: 14,
    color: 'white',
  },
  scanStyle: {
    position: 'absolute',
    top: -30,
    right: (width - buttonWidth) / 2,
    alignItems: 'center',
  },
  iconCircle: {
    width: 55,
    height: 55,
    backgroundColor: '#E65728',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
