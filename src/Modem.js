import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Modem = ({ modem, onIncrease, onDecrease, count }) => {
  return (
    <View style={styles.container}>
      <View style={styles.modemInfo}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{modem.title}</Text>
        <Text style={{ color: '#7D8285', marginTop: 10 }}>Price: ${modem.price}</Text>
      </View>
      {/* <Text>Stock: {modem.stock}</Text> */}
      <View style={styles.itemCount}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: count === 0 ? '#CFCFCF' : 'black' }]}
          onPress={onDecrease}
          disabled={count === 0}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>-</Text>
        </TouchableOpacity>
        <Text>{count}</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: count === modem.stock ? '#CFCFCF' : 'black' }]}
          onPress={onIncrease}
          disabled={count === modem.stock}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  modemInfo: {
    flex: 2,
  },
  itemCount: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
    height: 50,
    width: 150,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 30, 
    height: 30, 
  },
});

export default Modem;
