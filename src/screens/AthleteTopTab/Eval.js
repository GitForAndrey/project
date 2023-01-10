import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Tag from '../../components/Tag';
import { getALLTags } from '../../redux/actions/athleteTagsActions';

const Eval = ({ navigation }) => {
  const dispatch = useDispatch();
  const { selectedAthlete, allTags, selectedTags } = useSelector(
    state => state.athleteTags,
  );

  const tagsPrimary = (disable = false) => {
    return allTags
      .map(i => {
        if (selectedTags.find(el => i.id === el.id && i.primary === 'y')) {
          return (
            <Tag
              item={i}
              key={i.id}
              athlete={selectedAthlete}
              color={i.color}
              disable={disable}
            />
          );
        } else if (i.primary === 'y') {
          return (
            <Tag
              item={i}
              key={i.id}
              athlete={selectedAthlete}
              textColor={i.color}
            />
          );
        }
      })
      .sort((a, b) => a.sort_order - b.sort_order);
  };
  const tagsRegular = disable => {
    return allTags
      .map(i => {
        if (selectedTags.find(el => i.id === el.id && i.primary === 'n')) {
          return (
            <Tag
              item={i}
              key={i.id}
              athlete={selectedAthlete}
              color={i.color}
              disable={disable}
            />
          );
        }
      })
      .sort((a, b) => a.sort_order - b.sort_order);
  };

  useEffect(() => {
    dispatch(getALLTags());
    const stackNavigator = navigation.getParent();
    if (stackNavigator) {
      stackNavigator.setOptions({
        title: `${selectedAthlete.last_name} ${selectedAthlete.first_name}`,
      });
    }
  }, []);
  useEffect(() => {}, [selectedTags]);

  return (
    <View style={styles.container}>
      <View style={styles.block}>{tagsPrimary()}</View>
      <View style={styles.block}>
        {tagsRegular(true)}
        <Text
          style={styles.assignText}
          onPress={() => {
            navigation.navigate('AssignTags');
          }}>
          + Assign Tags
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 28,
    marginHorizontal: 15,
    position: 'relative',
  },

  assignText: {
    color: '#2f39a6',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 8,
    left: 20,
  },
});

export default Eval;
