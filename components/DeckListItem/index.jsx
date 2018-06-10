import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { orange, white, gray } from '../../utils/colors';

class DeckListItem extends React.Component {
  onPressItem(deck) {
    this.props.navigation.navigate('Deck', { deck: this.props.deck });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.onPressItem(this.props.deck)}>
        {this.props.deck.questions && (
          <View style={styles.deck}>
            <Text style={{ color: orange, fontSize: 20 }}>{this.props.deck.title}</Text>
            <Text style={{ color: gray, fontSize: 15 }}>
              {this.props.deck.questions.length} cards
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

export default DeckListItem;
