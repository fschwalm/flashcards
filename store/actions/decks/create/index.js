import { CREATE_DECK, CREATE_DECK_FAILURE, CREATE_DECK_SUCCESS } from './types';
import makeActionCreator from '../../_helpers';
import { persistDeck } from '../../../../utils/api';

const createDeckStart = makeActionCreator(CREATE_DECK);
const createDeckSuccess = makeActionCreator(CREATE_DECK_SUCCESS, 'payload');
const createDeckFailure = makeActionCreator(CREATE_DECK_FAILURE, 'error');

const createDeck = deck => async (dispatch) => {
  dispatch(createDeckStart());
  try {
    await persistDeck(deck);
    dispatch(createDeckSuccess(deck));
  } catch (error) {
    dispatch(createDeckFailure(error));
  }
};

export { createDeck };
