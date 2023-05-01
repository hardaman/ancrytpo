import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';

const Card = ({ title, description, image, hiddenImage, messageIcon, shareIcon }) => {
  const [hiddenImageHeight, setHiddenImageHeight] = useState('0%');
  const [imageOpacity, setImageOpacity] = useState(1);

  const onPressCard = () => {
    setHiddenImageHeight((prevHeight) => {
      if (prevHeight === '0%') {
        setImageOpacity(imageOpacity - 0.33);
        return '33.33%';
      } else if (prevHeight === '33.33%') {
        setImageOpacity(imageOpacity - 0.33);
        return '66.66%';
      } 
      else if(prevHeight === '66.66%') {
            setImageOpacity(imageOpacity - 0.33);
            return '100%';
      }
      else {
        return prevHeight;
      }
    });
  };

  const hiddenImageStyle = {
    ...styles.hiddenImage,
    height: hiddenImageHeight,
    transform: [{ translateY: -0.33 * imageOpacity * 260 }],
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPressCard}>
      <Image source={image} style={[styles.backgroundImage, { opacity: imageOpacity }]} />
      <Image source={hiddenImage} style={hiddenImageStyle} />
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', paddingHorizontal: 20, paddingVertical: 60, color: '#B7B7B7' }}>{description}</Text>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.iconContainer}>
          <Ionicons name={messageIcon} size={24} color="white" />
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name={shareIcon} size={24} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 260,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#555',
  },
  bottomSection: {
    width: '100%',
    height: 50,
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 10,
  },
  iconContainer: {
    width: 24,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  hiddenImage: {
    width: '100%',
    position: 'absolute',
    zIndex: -2
  }
})

export default Card;
