import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

const Card = ({ backgroundImg, hiddenImgs }) => {
  const [tapCount, setTapCount] = useState(0);

  const getNextTapCount = () => {
    if (tapCount < hiddenImgs.length) {
      return tapCount + 1;
    } else {
      return 0;
    }
  };

  const handleCardPress = () => {
    setTapCount(getNextTapCount());
  };

  const renderHiddenImg = (index) => {
    if (index < tapCount) {
      return <Image source={hiddenImgs[index]} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
    }
  };

  const renderCard = () => {
    switch (tapCount) {
      case 0:
        return (
          <TouchableOpacity onPress={handleCardPress}>
            <Image source={backgroundImg} style={{ width: '100%', height: '100%' }} />
          </TouchableOpacity>
        );
      case 1:
        return (
          <TouchableOpacity onPress={handleCardPress}>
            <Image source={backgroundImg} style={{ width: '100%', height: '100%' }} />
            {renderHiddenImg(0)}
          </TouchableOpacity>
        );
      case 2:
        return (
          <TouchableOpacity onPress={handleCardPress}>
            <Image source={backgroundImg} style={{ width: '100%', height: '100%' }} />
            {renderHiddenImg(0)}
            {renderHiddenImg(1)}
          </TouchableOpacity>
        );
      case 3:
        return (
          <TouchableOpacity onPress={handleCardPress}>
            <Image source={backgroundImg} style={{ width: '100%', height: '100%' }} />
            {renderHiddenImg(0)}
            {renderHiddenImg(1)}
            {renderHiddenImg(2)}
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return <View style={{ width: 200, height: 200 }}>{renderCard()}</View>;
};

export default Card;
