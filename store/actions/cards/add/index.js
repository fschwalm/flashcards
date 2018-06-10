import { ADD_CARD_TO_DECK, ADD_CARD_TO_DECK_FAILURE, ADD_CARD_TO_DECK_SUCCESS } from './types';
import makeActionCreator from '../../_helpers';
import { saveCardToDeck } from '../../../../utils/api';

const addCardToDeckStart = makeActionCreator(ADD_CARD_TO_DECK);
const addCardToDeckSuccess = makeActionCreator(ADD_CARD_TO_DECK_SUCCESS, 'payload');
const addCardToDeckFailure = makeActionCreator(ADD_CARD_TO_DECK_FAILURE, 'error');

const addCardToDeck = (card, deckTitle) => async (dispatch) => {
  dispatch(addCardToDeckStart());
  try {
    await saveCardToDeck(card, deckTitle);
    dispatch(addCardToDeckSuccess({ card, deckTitle }));
  } catch (error) {
    dispatch(addCardToDeckFailure(error));
  }
};

export { addCardToDeck };
