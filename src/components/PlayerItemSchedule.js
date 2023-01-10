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

const PlayerItem = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const athleteTags = useSelector(state => state.schedule.athleteTags).reduce(
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

  const onPressHandle = () => {
    navigation.navigate('Athlete');
    dispatch(setSelectedAthlete(item, athleteTags));
  };
  const renderTags = (array, type) =>
    array.map(i =>
      i.primary == type ? (
        <Tag item={i} disable={true} key={i.id} color={i.color} />
      ) : null,
    );

  return (
    <View style={styles.listItem}>
      <TouchableOpacity
        onPress={() => {
          onPressHandle();
        }}>
        <Text style={{ fontSize: 16 }}>
          {item.uniform}, {item.last_name} {item.first_name}
        </Text>
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
export default PlayerItemSchedule = React.memo(PlayerItem);
const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
