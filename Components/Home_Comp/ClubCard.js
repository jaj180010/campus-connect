import { View, Text, Image, StyleSheet} from 'react-native';

//ClubCard component
export default function ClubCard({ name, imageSource }) {
  return (
    <View style={clubCardStyles.container}>
      <Image source={imageSource} style={clubCardStyles.image} />
      <Text style={clubCardStyles.name}>{name}</Text>
    </View>
  );
}

const clubCardStyles = StyleSheet.create({
  container: {
    margin: 10,
    width: 250,
    elevation: 5, 
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 20,
    backgroundColor: 'white',    
  },
  image: {
    width: 250,
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  name: {
    fontSize: 16,
    fontWeight: 500,
    padding: 10,
    height: 40
  },
});