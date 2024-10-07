import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

export default function MainPage() {
    //Logic for search bar
    type TableSections = {
        [key: string]: string[];
    };

  // Table Data
  const tables = {
    Garden: ['Table 1', 'Table 2', 'Table 3'],
    'First Floor': ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6'],
    Terrace: ['Table 1', 'Table 2', 'Table 3', 'Table 4'],
    Lounge:['Table 1', 'Table 2']
  };
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTables = (tables: TableSections, searchQuery: string): TableSections => {
      const filteredTables: TableSections = {};
      Object.keys(tables).forEach((section) => {
          filteredTables[section] = tables[section].filter(table =>
              table.toLowerCase().includes(searchQuery.toLowerCase())
          );
      });
      return filteredTables;
  };
  const filteredTables = filterTables(tables, searchQuery);

  const router = useRouter();

  const handleTables = (table: string) => {
    router.push('/Dishes')
  }
  
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ padding: 10 }}>
        <TextInput
          style={styles.searchBar}
          placeholder='Search...'
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {Object.keys(filteredTables).map(section => (
          <View key={section}>
            <View style={styles.TableContainer}>
              <Text style={{ textAlign: 'center', fontFamily: 'Semi-Bold', fontSize: 18, color:'#FFFF' }}>{section}</Text>
            </View>

            <View style={styles.TablesRow}>
              {filteredTables[section].map(table => (
                <TouchableOpacity key={table} style={styles.Tables} onPress={() => handleTables(table)}>
                  <Text style={{ textAlign: 'center' }}>{table}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFF',
    borderWidth: 1,
    borderColor: '#fa1f1f',
    marginTop: 10,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10
  },

  TableContainer: {
    backgroundColor: '#ff5353',
    marginTop: 40,
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  TablesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10
  },

  Tables: {
    backgroundColor: '#f4f4f4',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
  }
});
