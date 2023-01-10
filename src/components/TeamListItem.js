import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { SelectedFlag } from './SelectedFlag.js';
import Tag from './Tag.js';

const TeamList = ({ item }) => {
  const { allTags } = useSelector(state => state.athleteTags);
  const teamTags = useSelector(state => state.team.activeTags).reduce(
    (acc, el) => {
      if (el.team_id == item.id) {
        acc[el.tag_id] = (acc[el.tag_id] || 0) + 1;
      }
      return acc;
    },
    {},
  );
  const renderTags = (teamTags, allTags) => {
    return Object.entries(teamTags).map(el => {
      let item = allTags.find(i => i.id == el[0]);

      return (
        <View
          key={item.id}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Tag item={item} color={item.color} disable={true} />
          <Text style={styles.tagsSum}>{el[1]}</Text>
        </View>
      );
    });
  };
  return (
    <View style={styles.container}>
      {console.log(444)}
      <View style={styles.teamName}>
        <SelectedFlag teamId={item.id} flagState={item.flag} />
        <Text>{item.teamName}</Text>
      </View>
      <Text>{item.name}</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}>
        {renderTags(teamTags, allTags)}
      </ScrollView>
    </View>
  );
};
export default TeamListItem = React.memo(TeamList);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: 'relative',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },

  teamName: {
    backgroundColor: '#b3fff1',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  tagsSum: {
    fontWeight: 'bold',
    right: 13,
    bottom: 4,
    fontSize: 16,
  },
});
