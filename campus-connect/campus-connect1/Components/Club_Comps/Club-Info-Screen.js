import { View, Text, Image, StyleSheet, Linking } from 'react-native';

export default function ClubDetailScreen({ route }) {
  const { club } = route.params;

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.clubHeader}>
        <Image source={club.imageSource} style={styles.clubImage} />
        <Text style={styles.clubName}>{club.name}</Text>
      </View>

      <Text style={styles.heading}>About</Text>
      <View style={styles.divider} />
      <Text style={styles.clubDescription}>{club.description}</Text>

      <Text style={styles.heading}>How to Join</Text>
      <View style={styles.divider} />
      <Text style={styles.clubDescription}>{club.join}</Text>
      <Text style={styles.linkText} onPress={() => openLink(club.link)}>
        Click Here to Join!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF',
  },
  clubImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  clubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  clubName: {
    fontSize: 25,
    fontWeight: 600,
    maxWidth: '80%',
    flexWrap: 'wrap',
  },
  clubDescription: {
    fontSize: 16,
    marginBottom: 5
  },
  heading: {
    fontWeight: 400,
    fontSize: 20,
    marginTop: 20,
    color: '#E65728'
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 10,
  },
  linkText: {
    color: 'blue', // You can style the link text as you like
    textDecorationLine: 'underline',
    marginBottom: 20
  },
});
