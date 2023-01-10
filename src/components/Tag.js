import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateTagsData } from '../redux/actions/athleteTagsActions';

const TagItem = ({
  item,
  disable = false,
  color = '#ececec',
  textColor = '#fff',
  athlete,
}) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: color }}
      onPress={() => {
        dispatch(updateTagsData(athlete, item));
      }}
      disabled={disable}>
      {console.log('333')}
      <Text style={{ ...styles.text, color: textColor }}>{item.title}</Text>
    </TouchableOpacity>
  );
};
export default Tag = React.memo(TagItem);
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    text: 18,
    marginRight: 20,
    minWidth: 40,
    marginBottom: 7,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
