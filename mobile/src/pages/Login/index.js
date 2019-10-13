import React, { useState, useEffect } from 'react';
import {
  Alert,
  View,
  AsyncStorage,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import api from '../../services/api';

import logo from '../../assets/img/logo.png';

import styles from './styles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        return navigation.navigate('List');
      }
      return 0;
    });
  }, [navigation]);

  async function handleSubmit() {
    try {
      const response = await api.post('/sessions', {
        email,
      });

      const { _id } = response.data;

      await AsyncStorage.setItem('user', _id);
      await AsyncStorage.setItem('techs', techs);

      navigation.navigate('List');
    } catch (err) {
      Alert.alert('Sorry, something went wrong. 😔.');
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>Your e-mail</Text>
        <TextInput
          required
          style={styles.input}
          placeholder="email@example.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Techs you love ❤</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: React Native, ReactJS, NodeJS"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Find spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
