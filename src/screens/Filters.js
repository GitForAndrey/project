import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { getMatchData, resetData } from '../redux/actions/scheduleActions';
import { setActiveFilters } from '../redux/actions/scheduleFilterActions';

const Filters = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { title, data } = route.params;
  let { activeFilter } = useSelector(state => state.scheduleFilter);

  //set page title name
  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, []);

  // when press on filter value, first dispatch- save filter value to state, second dispatch- reset old data in state to initial value
  // third dispatch- get data from db with new filters value  and go back to previous page

  const handleSelectValue = item => {
    dispatch(
      setActiveFilters({
        ...activeFilter,
        [title]: { value: item.value, dbValue: item.dbValue },
      }),
    );
    dispatch(resetData());
    dispatch(getMatchData());
    navigation.goBack();
  };

  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => handleSelectValue(item)}>
        <Text>{item.value}</Text>
        {activeFilter[title].value == item.value ? (
          <Icon name="checkmark-outline" size={26} color="#2f39a6" />
        ) : null}
      </TouchableOpacity>
    );
  };
  const separator = () => {
    return <View style={styles.divider} />;
  };
  return (
    <View style={styles.container}>
      <View style={styles.radiusListWrap}>
        <FlatList
          data={data}
          ItemSeparatorComponent={separator}
          renderItem={renderItems}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  radiusListWrap: { borderRadius: 20, overflow: 'hidden' },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  divider: {
    height: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginHorizontal: 15,
  },
});

export default Filters;
