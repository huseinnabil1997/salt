// Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = ({ selectedTypes }) => {
  return (
    <View style={styles.header}>
      <Icon name="mobile-alt" size={25} color="white" style={styles.phoneIcon} />
      <View>
        <Text style={styles.headerText}>Product List</Text>
        {selectedTypes > 0 && (
          <Text style={styles.selectedTypesText}>
            {`${selectedTypes} ${selectedTypes > 1 ? 'Products' : 'Product'}`}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#D81A3C',
    padding: 20,
    height: 94,
    flexDirection: 'row',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedTypesText: {
    color: 'white',
    fontSize: 14,
  },
  phoneIcon: {
    marginRight: 20,
  },
});

export default Header;
