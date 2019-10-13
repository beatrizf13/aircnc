/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import api from '../../services/api';

import styles from './styles';

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  async function loadSpots() {
    const response = await api.get('/spots', {
      params: { tech },
    });

    setSpots(response.data);
  }

  useEffect(() => {
    loadSpots();
  }, [tech]);

  function handleNavigate(id) {
    navigation.navigate('Book', { id });
  }

  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    loadSpots().then(setRefreshing(false));
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {spots.length ? (
        <View style={styles.container}>
          <Text style={styles.title}>
            Companies that use <Text style={styles.bold}>{tech}</Text>
          </Text>

          <FlatList
            style={styles.list}
            data={spots}
            keyExtractor={spot => spot._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Image
                  style={styles.thumbnail}
                  source={{ uri: item.thumbnail_url }}
                />
                <Text style={styles.company}>{item.company}</Text>
                <Text style={styles.price}>
                  {item.price ? `💵 ${item.price}/day` : '💸 free'}
                </Text>
                <TouchableOpacity
                  onPress={() => handleNavigate(item._id)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Request booking</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>
            No companies that use <Text style={styles.bold}>{tech} 😔</Text>
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

export default withNavigation(SpotList);
