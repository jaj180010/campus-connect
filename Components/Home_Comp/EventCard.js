import { View, Text, Image, StyleSheet} from 'react-native';

export default function EventCard({ title, imageSource, time, date, description, location }) {
  const dateParts = date.split(' ');
  const month = dateParts[0].substring(0, 3); // Get the first three characters of the month
  const day = dateParts[1];

  return (
    <View style={eventCardStyles.container}>

      <Image source={imageSource} style={eventCardStyles.image}/>

      <View style={eventCardStyles.dateContainer}>
        <View style={eventCardStyles.dateBox}>
          <Text style={eventCardStyles.monthText}>{month}</Text>
          <Text style={eventCardStyles.dayText}>{day}</Text>
        </View>
      </View>

      <View style={eventCardStyles.textContainer}>
        <Text style={eventCardStyles.title}>{title}</Text>
        <Text style={eventCardStyles.description}>{description}</Text>
        <View style={eventCardStyles.description}>    
          <Text style={eventCardStyles.info}>Location: {location}</Text>
          <Text style={eventCardStyles.info}>Time: {time}</Text>
        </View>
      </View>
    </View>
  );
}

const eventCardStyles = StyleSheet.create({
  container: {
    margin: 10,
    width: 250,
    borderRadius: 20,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.24)', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  dateContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dateBox: {
    width: 40,
    padding: 4,
    alignItems: 'center',
  },
  monthText: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  dayText: {
    fontSize: 18,
    fontWeight: '800',
  },
  image: {
    width: 250,
    height: 100,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'white',
    height: 140,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    padding: 5,
  },
  info: {
    fontSize: 12,
    color: 'grey'
  }
});