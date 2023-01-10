import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Tag from '../../components/Tag';

const AssignTags = () => {
  const { selectedAthlete, allTags, selectedTags } = useSelector(
    state => state.athleteTags,
  );
  const tagsActive = type => {
    return allTags
      .map(i => {
        if (selectedTags.find(el => i.id === el.id && i.primary === type)) {
          return (
            <Tag
              item={i}
              key={i.id}
              athlete={selectedAthlete}
              color={i.color}
            />
          );
        }
      })
      .sort((a, b) => a.sort_order - b.sort_order);
  };
  const tagsInactive = type => {
    return allTags
      .map(i => {
        if (
          selectedTags.length > 0 &&
          selectedTags.every(item => item.id !== i.id && i.primary === type)
        ) {
          return (
            <Tag
              item={i}
              key={i.id}
              athlete={selectedAthlete}
              textColor={i.color}
            />
          );
        } else if (selectedTags.length === 0 && i.primary === type) {
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
  // const activePrimary = selectedTags.filter(i => i.primary == 'y');
  // const activeRegular = selectedTags.filter(i => i.primary == 'n');
  // const inactivePrimary = allTags.filter(i => {
  //   if (selectedTags.length > 0) {
  //     return selectedTags.every(item => item.id != i.id && i.primary == 'y');
  //   } else {
  //     return i.primary == 'y';
  //   }
  // });
  // const inactiveRegular = allTags.filter(i => {
  //   if (selectedTags.length > 0) {
  //     return selectedTags.every(item => item.id != i.id && i.primary == 'n');
  //   } else {
  //     return i.primary == 'n';
  //   }
  // });

  // const renderTags = array => {
  //   return array.map(i => (
  //     <Tag item={i} key={i.id} athlete={selectedAthlete} color={i.color} />
  //   ));
  // };
  // const renderInactiveTags = array => {
  //   return array.map(i => (
  //     <Tag item={i} key={i.id} athlete={selectedAthlete} textColor={i.color} />
  //   ));
  // };
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Assigned</Text>
        <View style={styles.tagsWrapper}>{tagsActive('y')}</View>
        <View style={styles.divider} />
        <View style={styles.tagsWrapper}>{tagsActive('n')}</View>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Available</Text>
        <View style={styles.tagsWrapper}>{tagsInactive('y')}</View>
        <View style={styles.divider} />
        <View style={styles.tagsWrapper}>{tagsInactive('n')}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 28,
    marginHorizontal: 15,
  },
  blockTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 15,
  },
});

export default AssignTags;
