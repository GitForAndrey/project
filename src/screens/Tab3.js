import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getRosterData, setRosterPage } from '../redux/actions/rosterActions';
import { RosterListItem } from '../components/RosterListItem';

const Tab3 = () => {
  const { status, data, rosterPage } = useSelector(state => state.roster);
  const { initDb } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (initDb && data.length == 0) {
      dispatch(getRosterData());
    }
  }, []);

  const renderItem = ({ item }) => <RosterListItem item={item} />;

  const renderLoader = () => {
    return status == 'loading' ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    dispatch(setRosterPage(rosterPage + 10));
    dispatch(getRosterData());
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listStyle}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id + item.name}
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
  loader: {
    marginVertical: 16,
    alignItems: 'center',
  },
  listStyle: {
    marginTop: 40,
    paddingHorizontal: 15,
  },
});

export default Tab3;
