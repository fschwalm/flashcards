import { LIST_DECKS, LIST_DECKS_FAILURE, LIST_DECKS_SUCCESS } from './types';
import makeActionCreator from '../../_helpers';
import { getDecks } from '../../../../utils/api';

const listDecksStart = makeActionCreator(LIST_DECKS);
const listDecksSuccess = makeActionCreator(LIST_DECKS_SUCCESS, 'payload');
const listDecksFailure = makeActionCreator(LIST_DECKS_FAILURE, 'error');

const listDecks = () => async (dispatch) => {
  dispatch(listDecksStart());
  try {
    const result = await getDecks();
    dispatch(listDecksSuccess(result));
  } catch (error) {
    dispatch(listDecksFailure(error));
  }
};

export { listDecks };
