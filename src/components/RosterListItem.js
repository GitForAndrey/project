import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Tag from './Tag';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAthlete } from '../redux/actions/athleteTagsActions';

export const RosterListItem = ({ item }) => {
  const navigation = useNavigation();
  const athleteTags = useSelector(state => state.roster.athleteTags).reduce(
    (foundValues, activeEl) => {
      if (
        !foundValues.some(i => i.id == activeEl.id) &&
        activeEl.athlete_id == item.id
      ) {
        foundValues.push(activeEl);
      }
      return foundValues;
    },
    [],
  );

  let dispatch = useDispatch();

  const onPressHandle = () => {
    navigation.navigate('Athlete');
    dispatch(setSelectedAthlete(item, athleteTags));
  };
  const renderTags = (array, type) => {
    return array.map(i =>
      i.primary == type ? (
        <Tag item={i} disable={true} key={i.id} color={i.color} />
      ) : null,
    );
  };
  return (
    <View style={styles.listItem}>
      {console.log(athleteTags)}
      <TouchableOpacity
        onPress={() => {
          onPressHandle();
        }}
        style={{ paddingBottom: 5 }}>
        <View style={styles.athleteName}>
          <Text>
            {' '}
            {item.uniform}, {item.last_name} {item.first_name}
          </Text>
        </View>

        <Text>{item.name}</Text>
      </TouchableOpacity>
      <View style={styles.tagContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.tagsBlock}>
          {renderTags(athleteTags, 'y')}
        </ScrollView>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.tagsBlock}>
          {renderTags(athleteTags, 'n')}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  athleteName: {
    backgroundColor: '#b3fff1',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
});
