import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from './Header';
import Loader from './Loader';
import Modem from './Modem';
import Sort from './Sort';
import Footer from './Footer';
import Popup from './Popup';

const MainScreen = () => {
  const [loading, setLoading] = useState(true);
  const [modems, setModems] = useState([]);
  const [sortedModems, setSortedModems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const [total, setTotal] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(0);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        setModems(data.products);
        setSortedModems(data.products); // Set default sorting
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Calculate the total based on item counts and prices
    const newTotal = Object.keys(itemCounts).reduce((acc, modemId) => {
      const modem = modems.find(modem => modem.id.toString() === modemId.toString());
  
      if (modem) {
        return acc + (itemCounts[modemId] || 0) * modem.price;
      } else {
        console.error(`Modem with ID ${modemId} not found.`);
        return acc;
      }
    }, 0);

    // Calculate the number of selected types
    const newSelectedTypes = Object.values(itemCounts).reduce(
      (acc, count) => (count > 0 ? acc + 1 : acc),
      0
    );

    setTotal(newTotal);
    setSelectedTypes(newSelectedTypes);
  }, [itemCounts, modems]);

  const handleIncrease = (modemId) => {
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [modemId]: (prevCounts[modemId] || 0) + 1,
    }));
  };

  const handleDecrease = (modemId) => {
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [modemId]: Math.max((prevCounts[modemId] || 0) - 1, 0),
    }));
  };

  const handleSort = (option) => {
    let sortedData = [...modems]; // Create a copy of the original data

    switch (option) {
      case 'Highest Price':
        sortedData.sort((a, b) => b.price - a.price);
        break;
      case 'Lowest Price':
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case 'Name':
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
        break;

      default:
    }

    setSortedModems(sortedData);
  };

  const handleReset = () => {
    setItemCounts({});
    setTotal(0);
  };

  const handleCheckout = () => {
    setShowPopup(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header selectedTypes={selectedTypes} />
      <Sort onSort={handleSort} />
      <ScrollView style={styles.scrollView}>
        {loading ? <Loader /> : (
          <>
            {sortedModems.map(modem => (
              <Modem
                key={modem.id}
                modem={modem}
                onIncrease={() => handleIncrease(modem.id)}
                onDecrease={() => handleDecrease(modem.id)}
                count={itemCounts[modem.id] || 0}
              />
            ))}
            <View style={{ height: 200 }} />
          </>
        )}
      </ScrollView>
      <View style={[styles.checkoutButtonContainer, { height: total === 0 ? 100 : 150 }]}>
        <Footer total={total} onHandleCheckout={handleCheckout} onReset={handleReset} />
      </View>
      {showPopup && (
        <Popup total={total} onClose={() => setShowPopup(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  checkoutButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    justifyContent: 'space-around',
    elevation: 10,
  },
});

export default MainScreen;
