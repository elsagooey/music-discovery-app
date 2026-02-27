import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetch from your backend using the IP address from your terminal
    fetch('http://10.19.14.192:5001/songs/recommendations')
      .then(res => res.json())
      .then(data => setSongs(data.songs))
      .catch(err => console.log("Fetch error:", err));
  }, []);

  const renderCard = (song) => (
    <View style={styles.card}>
      <Image source={{ uri: song.art }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discover</Text>
      {songs.length > 0 ? (
        <Swiper
          cards={songs}
          renderCard={renderCard}
          onSwipedRight={(index) => console.log('Liked:', songs[index].title)}
          onSwipedLeft={(index) => console.log('Skipped:', songs[index].title)}
          cardIndex={0}
          backgroundColor={'#121212'}
          stackSize={3}
          cardVerticalMargin={60}
        />
      ) : (
        <Text style={styles.loading}>Loading songs...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { 
    color: '#1DB954', 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginTop: 80, 
    marginLeft: 20 
  },
  loading: { color: 'white', textAlign: 'center', marginTop: 100 },
  card: {
    height: SCREEN_HEIGHT * 0.6,
    borderRadius: 20,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  info: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  artist: {
    fontSize: 18,
    color: '#b3b3b3',
    marginTop: 5,
  },
});