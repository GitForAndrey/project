import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Flag, Done } from '../assets/icon/icons.js';
import { updateFlagData } from '../redux/actions/selectFlagActions.js';

export const SelectedFlag = ({ teamId, flagState }) => {
  const dispatch = useDispatch();

  const handleOnPress = () => {
    dispatch(updateFlagData(flagState, teamId));
  };

  return (
    <TouchableOpacity
      style={{ marginRight: 20 }}
      onPress={() => handleOnPress()}>
      {flagState == 0 ? (
        <Flag />
      ) : flagState == 1 ? (
        <Flag color={'#4a9d05'} />
      ) : flagState == 2 ? (
        <Done />
      ) : (
        <Flag />
      )}
    </TouchableOpacity>
  );
};
