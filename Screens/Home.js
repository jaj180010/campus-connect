import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { eventData } from '../Data/eventData';
import { orgData } from '../Data/userOrgData';
import ClubCard from '../Components/Home_Comp/ClubCard';
import EventCard from '../Components/Home_Comp/EventCard';
import NavBar from '../Components/Home_Comp/NavBar';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Campus Connect Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Campus Connect</Text>
        <Text style={styles.subtitles}>The University of Texas at Dallas</Text>
      </View>

      {/* User Information - Middle Section */}
      <View style={styles.middleSection}>
        {/* Row 1: Your Organizations */}
        <View style={styles.subSection}>
          <Text style={styles.subSectionHeading}>Your Organizations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {orgData.map((club, index) => (
              <ClubCard
                key={index}
                name={club.name}
                imageSource={club.imageSource}
              />
            ))}
          </ScrollView>
        </View>

        {/* Row 2: Upcoming Events */}
        <View style={styles.subSection}>
          <Text style={styles.subSectionHeading}>Your Upcoming Events</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {eventData.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                imageSource={event.imageSource}
                time={event.time}
                date={event.date}
                location={event.location}
                description={event.description}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Navigation Bar */}
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebe8e8',
  },
  header: {
    backgroundColor: '#E65728',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  subtitles: {
    fontSize: 15,
    fontWeight: 200,
    color: 'white',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 700,
    color: 'white',
  },
  middleSection: {
    flex: 1,
    backgroundColor: '#ebe8e8',
  },
  subSection: {
    padding: 5,
  },
  subSectionHeading: {
    fontSize: 20,
    fontWeight: 300,
    padding: 10,
  },
});
