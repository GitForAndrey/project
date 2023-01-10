import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import PlayerItemSchedule from './PlayerItemSchedule';

export const PlayersList = ({teamId}) => {
  const playersList = useSelector(state => state.schedule.players).filter(
    el => el.team_id === teamId,
  );
  const renderPlayer = array =>
    array.map(item => <PlayerItemSchedule item={item} key={item.rid} />);

  return <View>{renderPlayer(playersList)}</View>;
};
const styles = StyleSheet.create({});
