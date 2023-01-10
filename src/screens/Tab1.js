import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import {
  getScheduleData,
  setSchedulePage,
} from '../redux/actions/scheduleActions';
import ScheduleMatchItem from '../components/ScheduleMatchItem';
import { SortButton } from '../components/SortButton';

const Tab1 = () => {
  const { status, scheduleData, schedulePage } = useSelector(
    state => state.schedule,
  );
  const { filterValue, activeFilter } = useSelector(
    state => state.scheduleFilter,
  );
  const { initDb } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initDb) {
      dispatch(getScheduleData());
    }
  }, []);

  const renderItem = ({ item }) => <ScheduleMatchItem item={item} />;
  const keyExtractor = item => item.id;

  const renderLoader = () => {
    return status == 'loading' ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    dispatch(setSchedulePage(schedulePage + 5));
    dispatch(getScheduleData());
  };
  const timeValue = () => {
    return filterValue.filter(el => el.value == activeFilter.Date.value)[0]
      .times;
  };
  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <SortButton
          data={filterValue}
          title={'Date'}
          activeFilter={activeFilter.Date}
        />
        <SortButton
          data={timeValue()}
          title={'Time'}
          activeFilter={activeFilter.Time}
        />
      </View>

      <FlatList
        style={styles.listStyle}
        data={scheduleData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
    paddingHorizontal: 15,
  },
  loader: {
    marginVertical: 16,
    alignItems: 'center',
  },
  listItem: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    position: 'relative',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  filters: {
    marginVertical: 20,
    flexDirection: 'row',
  },
});

export default Tab1;
