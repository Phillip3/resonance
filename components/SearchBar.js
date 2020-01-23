// @flow

import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import textStyles from '../constants/TextStyles';

export default ({
  value = '',
  onChangeText = () => {
    console.log('`onChangeText` required');
  },
}: {
  value: string,
  onChangeText: Function,
}) => {
  return (
    <View style={styles.searchBar}>
      <Feather
        name={'search'}
        size={22}
        color={Colors.gray}
        style={styles.icon}
      />
      <TextInput
        testID="search-bar-input"
        style={[textStyles.body, styles.input]}
        keyboardAppearance="dark"
        returnKeyType="search"
        value={value}
        onChangeText={onChangeText}
      />
      {Boolean(value) && (
        <TouchableOpacity style={styles.clear} onPress={() => onChangeText('')}>
          <AntDesign name={'close'} size={22} color={Colors.gray} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const searchBarBackgroundColor = 'rgba(255,255,255,0.2)';

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    height: 40,
    position: 'relative',
    backgroundColor: searchBarBackgroundColor,
    borderRadius: 25,
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 8,
  },
  input: {
    height: 40,
    paddingHorizontal: 40,
    fontSize: 18,
    borderWidth: 0,
    color: Colors.white,
  },
  clear: {
    padding: 8,
    position: 'absolute',
    top: 0,
    right: 4,
  },
});
