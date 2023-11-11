
import { View, Text, FlatList, StyleSheet } from 'react-native';
import EventCard from '../Components/Event_Comps/EventCard';

import { eventData } from '../Data/eventData';
import { useNavigation } from '@react-navigation/native';

export default function Events() {
  const navigation = useNavigation();

  const onEventPress = (eventData) => {
    navigation.navigate('EventDetail', { eventData });
  };

  const renderEvent = ({ item }) => (
    <EventCard
      title={item.title}
      imageSource={item.imageSource[0]}
      time={item.time}
      date={item.date}
      description={item.description}
      location={item.location}
      onPress={() => onEventPress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={eventData}
        renderItem={renderEvent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
