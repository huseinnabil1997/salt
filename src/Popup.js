import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const Popup = ({ total, onClose, isVisible }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Success!</Text>
          <Text style={styles.subtitle}>
            You have successfully purchased 4{'\n'}
            products with a total of ${total}{'\n'}
            Click close to buy another modem
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 16,
    height: 227,
    width: 324,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
  },
});

export default Popup;
