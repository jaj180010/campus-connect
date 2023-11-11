import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import QRScanner from '../Components/Home_Comp/QRScanner';
import { useNavigation } from '@react-navigation/native';
import { getUserProfile, saveUserProfile } from '../Storage';

export default function QRScannerScreen() {
  const navigation = useNavigation();
  const [points, setPoints] = useState(0);
  const [scannedLogs, setScannedLogs] = useState([]);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getUserProfile();
      if (profile) {
        setPoints(profile.points);
        setScannedLogs(profile.scannedLogs);
      }
    };

    loadProfile();
  }, []);

  const handleQRCodeScanned = (data) => {
    if (!isScanning) return;

    const newPoints = points + 1;
    const newScannedLogs = [...scannedLogs, data]; 
    
    const userProfile = {
      points: newPoints,
      scannedLogs: newScannedLogs,
    };
  
    saveUserProfile(userProfile).then(() => {
      setIsScanning(false); 
      navigation.navigate('ScanComplete', { points: newPoints, scannedLogs: newScannedLogs });
    }).catch(error => {
      console.error('Failed to save the user profile after scanning.', error);
    });

    setPoints(newPoints);
    setScannedLogs(newScannedLogs);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Check In!</Text>
        <Text style={styles.subtitles}>Scan the QR Code</Text>
      </View>

      <View style={styles.scannerContainer}>
        <QRScanner onScan={handleQRCodeScanned} />
      </View>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#E65728',
    padding: 10,
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 10, 
  },
  subtitles: {
    fontSize: 15,
    fontWeight: '200',
    color: 'white',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  scannerContainer: {
    flex: 1,
  },
});