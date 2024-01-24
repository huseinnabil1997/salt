// Loader.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Loader = () => {
  return (
    <View style={styles.overlay}>
      <Icon name="mobile-alt" size={100} color="black" style={{ marginBottom: 20 }} />
      <Text style={styles.title}>Loading Product Data</Text>
      <Text style={styles.subtitle}>Please Wait...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#7D8285',
  }
});

export default Loader;
