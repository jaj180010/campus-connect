import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScanner({ onScan }) {
  const [hasPermission, setHasPermission] = useState(null);

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (type === BarCodeScanner.Constants.BarCodeType.qr) {
      onScan(data); // Pass the scanned data back
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
