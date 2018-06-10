import { AsyncStorage } from 'react-native';

const FLASHCARDS_STORAGE_KEY = 'FLASH_CARDS:DECKS';

const getDecks = () =>
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(decks => JSON.parse(decks));

const getDeck = deckTitle =>
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(decks => JSON.parse(decks)[deckTitle]);

const persistDeck = async deck =>
  AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify(deck),
  );
const addCardToDeck = (deckTitle, card) =>
  getDeck(deckTitle).then((deck) => {
    deck.questions.push(card);
    AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({
        [deckTitle]: deck,
      }),
    );
  });

export { getDecks, getDeck, persistDeck, addCardToDeck };
