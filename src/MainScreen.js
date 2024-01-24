import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setModems(data.products);
      setSortedModems(data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const newTotal = Object.entries(itemCounts).reduce(
      (acc, [modemId, count]) => {
        const modem = modems.find(modem => modem.id.toString() === modemId.toString());
        return acc + (count || 0) * (modem?.price || 0);
      },
      0
    );

    const newSelectedTypes = Object.values(itemCounts).reduce(
      (acc, count) => (count > 0 ? acc + 1 : acc),
      0
    );

    setTotal(newTotal);
    setSelectedTypes(newSelectedTypes);
  }, [itemCounts, modems]);

  const handleIncrease = (modemId) => {
    setDropdownOpen(false);
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [modemId]: (prevCounts[modemId] || 0) + 1,
    }));
  };

  const handleDecrease = (modemId) => {
    setDropdownOpen(false);
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [modemId]: Math.max((prevCounts[modemId] || 0) - 1, 0),
    }));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSort = (option) => {
    let sortedData = [...modems];

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
        // Handle unexpected option
    }

    setSortedModems(sortedData);
  };

  const handleReset = () => {
    setDropdownOpen(false);
    setItemCounts({});
    setTotal(0);
  };

  const handleCheckout = () => {
    setDropdownOpen(false);
    setShowPopup(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header selectedTypes={selectedTypes} />
      {loading ? <Loader /> : (
        <>
          <Sort onSort={handleSort} onToggleDropdown={toggleDropdown} dropdownOpen={dropdownOpen} />
          <ScrollView style={styles.scrollView}>
              <>
                {sortedModems.map(modem => (
                  <Modem
                    key={modem.id}
                    modem={modem}
                    onIncrease={() => handleIncrease(modem.id)}
                    onDecrease={() => handleDecrease(modem.id)}
                    count={itemCounts[modem.id] ?? 0}
                  />
                ))}
                <View style={{ height: 200 }} />
              </>
          </ScrollView>
        </>
      )}
      <View style={[styles.checkoutButtonContainer, { height: total === 0 ? 100 : 150 }]}>
        <Footer total={total} onHandleCheckout={handleCheckout} onReset={handleReset} />
      </View>
      {showPopup && (
        <Popup total={total} onClose={() => {
          setShowPopup(false);
          handleReset();
        }} />
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
