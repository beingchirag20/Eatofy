import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from "react";
import { router } from "expo-router";

export default function Index() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(){
    if(email == 'owner@eatofy.in' && password == 'owner@123')
      {
        console.log('User Authenticated')
        router.push('/MainPage')
      }
      else{
        Alert.alert('Incorrect email or Password')
      }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={{ fontFamily: 'Semi-Bold', fontSize: 25, marginBottom: 20 }}>
            Login
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={text => setemail(text)}
          />
          <View style={styles.PasswordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}  // Toggle visibility
              style={styles.iconButton}
            >
              <Ionicons
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color="#f53a3a"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submit} onPress={handleLogin}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 200,
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  iconButton: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:15
  },
  PasswordContainer: {
    flexDirection: 'row'
  },
  submit: {
    backgroundColor: '#f53a3a',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  submitText: {
    fontFamily: 'Semi-Bold',
    fontSize: 16,
    color: '#fffefe',
    textAlign: 'center',
  },
})