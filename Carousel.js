import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Card from './Card';

const Carousel = () => {
  return (
    <View style={styles.carousel}>
      <View style={styles.container}>
        <Card
          title="Card 1"
          subtitle="Lorem ipsum dolor sit amet"
          imageSource={require('./assets/splash.png')}
          position={{ left: 0 }}
        />
        <Card
          title="Card 2"
          subtitle="Consectetur adipiscing elit"
          imageSource={require('./assets/splash.png')}
          position={{ left: '25%', zIndex: 2 }}
        />
        <Card
          title="Card 3"
          subtitle="Sed do eiusmod tempor incididunt"
          imageSource={require('./assets/splash.png')}
          position={{ right: 0 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
   
  },
  container: {
    flexDirection: 'row',
    position: 'relative',
    height: 200,
  },
});

export default Carousel;
