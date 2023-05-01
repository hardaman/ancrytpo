import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from "react-native-progress/Bar";
import Icon from "react-native-vector-icons/FontAwesome";

export const TransactionList = ({ transactions, onPressCard, Card, updateNFTCount }) => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [allTransactions, setAllTransactions] = useState(transactions);
 
    const [isSelected, setIsSelected] = useState(true);
    
    

    const handleTransactionPress = (transaction) => {
        if (transaction.completed < transaction.total) {
          const updatedTransaction = {
            ...transaction,
            completed: transaction.completed + 1,
          };
          const updatedTransactions = allTransactions.map((t) =>
            t === transaction ? updatedTransaction : t
          );
          setSelectedTransaction(
            updatedTransaction.completed === updatedTransaction.total
              ? null
              : updatedTransaction
          );
          setAllTransactions(updatedTransactions);
        }
      };
      
      useEffect(() => {
        if (allTransactions.every((t) => t.completed === t.total)) {
          updateNFTCount();
        }
      }, [allTransactions]);
      
      
  
    return (
      <View>
        {allTransactions.map((transaction, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleTransactionPress(transaction)}
            style={{
              marginHorizontal: 14,
              borderRadius: 10,
              backgroundColor:
                selectedTransaction === transaction ? "lightgrey" : "transparent",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: transaction.completed === transaction.total ? "green" : "grey",
                marginRight: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {transaction.completed === transaction.total ? (
                <Icon name="check" size={20} color="white" />
              ) : (
                <Icon name="gift" size={20} color="white" />
              )}
            </View>
            <View style={{ display:'flex', flexDirection:'column', gap: 3 }}    >
                
              <Text style={{ color: "grey" }}>{transaction.total} {transaction.name}</Text>
              <Text style={{ color: "grey" }}>
                {transaction.completed}/{transaction.total} completed
              </Text>
              <ProgressBar
                progress={transaction.completed / transaction.total}
                width={200}
                height={2}
                color="orange"
              />
            </View>
            <View style={{ marginLeft: "auto" }}>
              <Icon name="chevron-right" size={20} color="grey" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

export const Card = ({ title, description, image, hiddenImage, messageIcon, shareIcon, transactions, onPressCard, setTransactions, lockedIcon, isLocked }) => {
    const [hiddenImageHeight, setHiddenImageHeight] = useState('0%');
    const [imageOpacity, setImageOpacity] = useState(1);
  
    onPressCard = (index) => {
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
        {isLocked && (
            <Ionicons
              name={lockedIcon}
              size={24}
              color="#FFC300"
              style={styles.lockIcon}
            />)}
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
    lockIcon:{
        top: 10,
        left: 74
    },
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

