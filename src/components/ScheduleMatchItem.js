import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { format } from 'date-fns';
import { SelectedFlag } from './SelectedFlag.js';
import { PlayersList } from './PlayersList.js';

const ScheduleItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_court}>
          <Text style={styles.court_text}>{item.court}</Text>
        </View>
        <Text style={styles.header_time}>
          {format(new Date(`${item.sdate} ${item.stime}`), 'hh:mm a')}
        </Text>
        <Text style={styles.header_div}>{item.div}</Text>
      </View>
      <View style={styles.teamName}>
        <SelectedFlag teamId={item.team_1_id} flagState={item.flagTeam1} />
        <Text>{item.name1}</Text>
      </View>
      <PlayersList teamId={item.team_1_id} />
      <Text style={styles.teamVS}>-----vs-----</Text>
      <View style={styles.teamName}>
        <SelectedFlag teamId={item.team_2_id} flagState={item.flagTeam2} />
        <Text>{item.name2}</Text>
      </View>
      <PlayersList teamId={item.team_2_id} />
    </View>
  );
};
export default ScheduleMatchItem = React.memo(ScheduleItem);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    position: 'relative',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    marginBottom: 15,
  },
  header_court: {
    backgroundColor: '#6690FF',
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    left: -15,
  },
  court_text: {
    color: '#fff',
  },
  header_time: {
    paddingLeft: 75,
  },
  header_div: {
    paddingLeft: 15,
  },
  teamName: {
    backgroundColor: '#b3fff1',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  teamVS: {
    fontSize: 14,
  },
});
