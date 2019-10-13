import React, { useState } from 'react';
import {
  TouchableOpacity,
  Alert,
  SafeAreaView,
  AsyncStorage,
  TextInput,
  Text,
} from 'react-native';

import api from '../../services/api';

import styles from './styles';

export default function Book({ navigation }) {
  const [date, setDate] = useState('');
  const id = navigation.getParam('id');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, { date }, { headers: { user_id } });

    Alert.alert('Booking request sent.');

    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Date of interest</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 05/13/2020"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Request book</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
