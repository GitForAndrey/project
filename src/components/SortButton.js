import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export const SortButton = ({activeFilter, data, title}) => {
  const navigation = useNavigation();
  const onPressHandle = () => {
    navigation.navigate('Filters', {
      title,
      data,
    });
  };
  return (
    <TouchableOpacity onPress={() => onPressHandle()} style={styles.container}>
      <Text style={styles.text}>{activeFilter.value}</Text>
      <Icon name="chevron-forward-outline" size={16} color="#2f39a6" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 4,
    text: 26,
    marginRight: 20,
  },
  text: {
    color: '#2f39a6',
  },
});
