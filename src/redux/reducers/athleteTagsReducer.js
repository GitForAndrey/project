import {
  SET_ALL_TAGS,
  SET_ATHLETE_TAGS_ERROR,
  SET_SELECTED_ATHLETE,
  TOGGLE_TAGS,
} from '../actions/athleteTagsActions';

const initialState = {
  error: false,
  errorMessage: '',
  selectedAthlete: {},
  selectedTags: [],
  allTags: [],
};

const athleteTagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ATHLETE_TAGS_ERROR: {
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    }
    case SET_SELECTED_ATHLETE: {
      return {
        ...state,
        selectedAthlete: action.payload.athlete,
        selectedTags: action.payload.tags,
      };
    }
    case SET_ALL_TAGS: {
      return {
        ...state,
        allTags: action.payload,
      };
    }
    case TOGGLE_TAGS: {
      const { athleteId, item } = action.payload;
      let result = state.selectedTags.find(
        i => i.athlete_id === athleteId && i.id === item.id,
      );
      console.log(result);
      if (result) {
        return {
          ...state,
          selectedTags: state.selectedTags.filter(
            i => !(i.athlete_id == result.athlete_id && i.id == result.id),
          ),
        };
      } else {
        return {
          ...state,
          selectedTags: [
            ...state.selectedTags,
            { ...item, athlete_id: athleteId },
          ],
        };
      }
    }

    default:
      return state;
  }
};

export default athleteTagsReducer;
