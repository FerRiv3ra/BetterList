import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const FloatingButton = () => {
  return (
    <View style={styles.button}>
      <TouchableOpacity>
        <Icon name="add-outline" size={25} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: '#6663F1',
    bottom: 25,
    right: 25,
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
