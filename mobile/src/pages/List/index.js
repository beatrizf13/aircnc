import React, { useState, useEffect } from 'react';
import { SafeAreaView, Image, AsyncStorage } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import SpotList from '../../components/SpotList';

import logo from '../../assets/img/logo.png';

import styles from './styles';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  async function logout() {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={logout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      {techs.map(tech => (
        <SpotList key={tech} tech={tech} />
      ))}
    </SafeAreaView>
  );
}
