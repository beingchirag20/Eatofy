import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

export default function Dishes() {
  // Dishes with prices
  const dishes = [
    { name: 'Mojito', type: 'Veg', category: 'Beverages', price: 80 },
    { name: 'Chicken-Biryani', type: 'Non-Veg', category: 'Main Course', price: 250 },
    { name: 'Paneer-Tikka', type: 'Veg', category: 'Starters', price: 120 },
    { name: 'Fries', type: 'Veg', category: 'Snacks', price: 70 },
    { name: 'Ice-Cream', type: 'Veg', category: 'Deserts/Sweets', price: 90 },
    { name: 'Nachos', type: 'Veg', category: 'Snacks', price: 100 },
    { name: 'Coldrinks', type: 'Veg', category: 'Beverages', price: 50 },
    { name: 'Mutton-Chaap', type: 'Non-Veg', category: 'Starters', price: 300 },
    { name: 'Kulcha-Nihari', type: 'Non-Veg', category: 'Main Course', price: 350 },
    { name: 'Chicken 65', type: 'Non-Veg', category: 'Starters', price: 200 },
  ];

  // State hooks
  const [dishSearchQuery, setDishSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDishes, setSelectedDishes] = useState<{ name: string; price: number }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Filter dishes based on search query
  const filterDishes = (dishes: { name: string; type: string; category: string; price: number }[], searchQuery: string, category: string) => {
    return dishes.filter(dish => {
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === 'All' || dish.category === category;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredDishes = filterDishes(dishes, dishSearchQuery, selectedCategory);

  // Add selected dish to order
  const addDish = (dish: { name: string; price: number }) => {
    if (!selectedDishes.some(selectedDish => selectedDish.name === dish.name)) {
      setSelectedDishes([...selectedDishes, dish]);
    }
  };

  // Remove dish from order
  const removeDish = (dishToRemove: { name: string; price: number }) => {
    setSelectedDishes(selectedDishes.filter(dish => dish.name !== dishToRemove.name));
  };

  // Calculate total amount
  const calculateTotal = () => {
    return selectedDishes.reduce((total, dish) => total + dish.price, 0);
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ padding: 10 }}>
        {/* Search bar for dishes */}
        <TextInput
          style={styles.searchBar}
          placeholder='Search Dishes...'
          value={dishSearchQuery}
          onChangeText={setDishSearchQuery}
        />

        {/* Dropdown to filter dishes by category */}
        <View style={styles.pickerContainer}>
          <Text style={styles.filterLabel}>Filter by Category:</Text>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Starters" value="Starters" />
            <Picker.Item label="Main Course" value="Main Course" />
            <Picker.Item label="Beverages" value="Beverages" />
            <Picker.Item label="Deserts/Sweets" value="Deserts/Sweets" />
          </Picker>
        </View>

        {/* Display filtered dishes */}
        <View style={{ marginTop: 20 }}>
          {filteredDishes.length > 0 ? (
            <View style={styles.TablesRow}>
              {filteredDishes.map(dish => (
                <TouchableOpacity
                  key={dish.name}
                  style={[
                    styles.Tables,
                    { borderColor: dish.type === 'Veg' ? 'green' : 'red' },
                    selectedDishes.some(selectedDish => selectedDish.name === dish.name) ? styles.selected : {}
                  ]}
                  onPress={() => addDish(dish)} // Add dish on press
                >
                  <Text style={{ textAlign: 'center' }}>{dish.name}</Text>
                  <Text style={{ textAlign: 'center' }}>Price: ₹{dish.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.noResults}>No dishes found.</Text>
          )}
        </View>

        {/* Button to view order summary */}
        <TouchableOpacity style={styles.orderButton} onPress={() => setModalVisible(true)}>
          <Text style={{ color: '#FFF', textAlign: 'center' }}>View Order Summary</Text>
        </TouchableOpacity>

        {/* Modal for Order Summary */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Order Summary</Text>
              {selectedDishes.length > 0 ? (
                selectedDishes.map((dish, index) => (
                  <View key={index} style={styles.dishRow}>
                    <Text>{dish.name} - ₹{dish.price}</Text>
                    <Button title="Remove" onPress={() => removeDish(dish)} color="#fa1f1f" />
                  </View>
                ))
              ) : (
                <Text>No dishes selected.</Text>
              )}
              <Text style={styles.totalAmount}>Total: ₹{calculateTotal()}</Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#fa1f1f',
    marginTop: 10,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10
  },

  pickerContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  filterLabel: {
    fontSize: 16,
    color: '#333'
  },

  picker: {
    height: 50,
    width: '100%',
    borderColor: '#fa1f1f',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginTop: 10
  },

  TablesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },

  Tables: {
    backgroundColor: '#f4f4f4',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    flexBasis: '48%',
    marginBottom: 15,
    alignItems: 'center',
  },

  selected: {
    backgroundColor: '#e0ffe0', // Highlight selected dishes
  },

  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#ff5353',
  },

  orderButton: {
    backgroundColor: '#fa1f1f',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },

  dishRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
});
