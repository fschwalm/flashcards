import * as actionTypes from '../../actions/types';

const initialState = {
  isFetchingDecks: false,
  hasErrorOnFetchDecks: false,
  fetchDecksErrorMessage: '',
  decks: {},
};

const decksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LIST_DECKS:
      return {
        ...state,
        isFetchingDecks: true,
      };

    case actionTypes.LIST_DECKS_SUCCESS:
      return {
        ...state,
        decks: action.payload,
        isFetchingDecks: false,
      };

    case actionTypes.LIST_DECKS_FAILURE:
      return {
        ...state,
        isFetchingDecks: false,
        hasErrorOnFetchDecks: true,
        fetchDecksErrorMessage: action.error.message,
      };

    case actionTypes.CREATE_DECK_SUCCESS:
      return {
        ...state,
        decks: {
          ...state.decks,
          ...action.payload,
        },
      };

    case actionTypes.ADD_CARD_TO_DECK_SUCCESS:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.payload.deckTitle]: {
            ...state.decks[action.payload.deckTitle],
            questions: [...state.decks[action.payload.deckTitle].questions, action.payload.card],
          },
        },
      };

    default:
      return state;
  }
};

export default decksReducer;
