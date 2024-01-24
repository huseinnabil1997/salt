// Footer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Footer = ({ total, onHandleCheckout, onReset }) => {
  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Total:</Text>
        <Text>${total}</Text>
      </View>
      <TouchableOpacity
        style={[styles.chekoutButton, {
          backgroundColor: total === 0 ? '#CFCFCF' : 'black',
          borderColor: total === 0 ? '#CFCFCF' : 'black',
        }]}
        onPress={onHandleCheckout}
        disabled={total === 0}
      >
        <Text style={{ color: '#FFF', textAlign: 'center'}}>Checkout</Text>
      </TouchableOpacity>
      {total !== 0 && (
        <TouchableOpacity
          style={[styles.chekoutButton, { backgroundColor: 'white' }]}
          onPress={onReset}
        >
          <Text style={{ color: 'black', textAlign: 'center'}}>Reset</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  chekoutButton: {
    height: 42,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Footer;
