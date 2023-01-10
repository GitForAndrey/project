import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import MatchupItem from '../components/MatchupItem';
import {
  getMatchupData,
  setMatchupPage,
} from '../redux/actions/matchupActions';

const Tab5 = () => {
  const { status, matchupData, matchupPage } = useSelector(
    state => state.matchup,
  );
  useEffect(() => {
    if (initDb) {
      dispatch(getMatchupData());
    }
  }, []);

  const { initDb } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    return <MatchupItem item={item} />;
  };

  const renderLoader = () => {
    return status == 'loading' ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    dispatch(setMatchupPage(matchupPage + 10));
    dispatch(getMatchupData());
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listStyle}
        data={matchupData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
  listStyle: { marginTop: 40, paddingHorizontal: 15 },
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

export default Tab5;
