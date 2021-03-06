import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text } from 'react-native';
import DeckListItem from '../DeckListItem';
import { listDecks } from '../../store/actions/decks/list';

const keyExtractor = item => item.title;

class Decks extends React.Component {
  async componentDidMount() {
    this.props.onListDecks();
  }

  render() {
    let values = [];
    if (this.props.decks) {
      if (Object.keys(this.props.decks).length > 0) {
        values = Object.values(this.props.decks);
      }
    }

    return (
      <View style={{ flex: 1 }}>
        {values.length > 0 ? (
          <FlatList
            data={values}
            keyExtractor={keyExtractor}
            renderItem={({ item }) => (
              <DeckListItem deck={item} navigation={this.props.navigation} />
            )}
          />
        ) : (
          <Text>No Decks</Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  decks: state.decks,
});

const mapDispatchToProps = dispatch => ({
  onListDecks: () => dispatch(listDecks()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Decks);
