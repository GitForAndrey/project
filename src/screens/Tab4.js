import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { getTeamsData, setTeamsPage } from '../redux/actions/teamsActions';
import TeamListItem from '../components/TeamListItem';

const Tab4 = () => {
  const { status, data, teamsPage } = useSelector(state => state.team);
  const { initDb } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initDb) {
      dispatch(getTeamsData());
    }
  }, []);

  const renderItem = ({ item }) => {
    return <TeamListItem item={item} />;
  };

  const renderLoader = () => {
    return status == 'loading' ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    dispatch(setTeamsPage(teamsPage + 10));
    dispatch(getTeamsData());
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
  listStyle: {
    marginTop: 40,
    paddingHorizontal: 15,
  },
  loader: {
    marginVertical: 16,
    alignItems: 'center',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Tab4;
