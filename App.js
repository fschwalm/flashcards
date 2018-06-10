import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { purple, blue, white } from './utils/colors';
import FlashCardsStatusBar from './components/FlashCardsStatusBar';
import Tabs from './components/Tabs';
import Deck from './components/Deck';
import configureStore from './store';
import NewCard from './Views/NewCard';
import Quiz from './Views/Quiz';

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTitle: 'FlashCards',
      headerTintColor: blue,
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
    },
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTitle: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTitle: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
    },
  },
});

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <FlashCardsStatusBar backgroundColor={purple} barStyle="light-content" />
      <MainNavigator />
    </View>
  </Provider>
);

export default App;
