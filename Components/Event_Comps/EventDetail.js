import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const EventDetail = ({ route }) => {
  const { eventData } = route.params;


  return (
    <ScrollView style={styles.container}>
      <Image source={eventData.imageSource[1]} style={styles.image1} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{eventData.title}</Text>
        <Text style={styles.info}>Date: {eventData.date}</Text>
        <Text style={styles.info}>Time: {eventData.time}</Text>
        <Text style={styles.info}>Location: {eventData.location}</Text>
        <Text style={styles.description}>{eventData.description}</Text>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image1: {
    width: '100%',
    height: 450, // Adjust as needed
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: 'grey',
    marginTop: 10,
  },
});

export default EventDetail;