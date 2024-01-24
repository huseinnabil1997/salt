// Sort.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Sort = ({ onSort }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSort = (option) => {
    console.log('Sorting by:', option);
    setSortOption(option);
    onSort(option);
    toggleDropdown();
  };

  return (
    <View style={{ height: dropdownOpen ? 150 : 100, ...styles.container}}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="sort" size={30} color="gray" style={{ marginRight: 10 }} />    
        <Text style={styles.sortBy}>Sort By :</Text>
      </View>
      <TouchableOpacity onPress={toggleDropdown} style={styles.sortButton}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{sortOption}</Text>
        <Icon name={dropdownOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color="gray" />
      </TouchableOpacity>
      {dropdownOpen && (
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={() => handleSort('Default')} style={styles.dropdownItem}>
              <Text style={sortOption === 'Default' ? { fontWeight: 'bold' } : {}}>Default</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSort('Highest Price')} style={styles.dropdownItem}>
              <Text style={sortOption === 'Highest Price' ? { fontWeight: 'bold' } : {}}>Highest Price</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSort('Lowest Price')} style={styles.dropdownItem}>
              <Text style={sortOption === 'Lowest Price' ? { fontWeight: 'bold' } : {}}>Lowest Price</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSort('Name')} style={styles.dropdownItem}>
              <Text style={sortOption === 'Name' ? { fontWeight: 'bold' } : {}}>Name</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sortBy: {
    fontWeight: '400',
    fontSize: 16,
  },
  sortButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: 125,
  },
  dropdown: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    elevation: 5,
    padding: 10,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
});

export default Sort;
