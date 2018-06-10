import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { createDeck } from '../../store/actions/decks/create';
import { gray } from '../../utils/colors';

class NewDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.handleAddDeck = this.handleAddDeck.bind(this);
  }

  async handleAddDeck() {
    if (this.state.title) {
      const deck = {
        ...this.state,
        questions: [],
      };
      await this.props.onCreateDeck({ [this.state.title]: deck });
      this.setState({ title: '' });
      this.props.navigation.navigate('Deck', { deckTitle: deck.title });
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
          <TextInput
            value={this.state.title}
            style={styles.input}
            placeholder="Deck Title"
            onChangeText={title => this.setState({ title })}
          />
          <Button title="Add Deck" onPress={this.handleAddDeck} />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: gray,
  },
});

const mapDispatchToProps = dispatch => ({
  onCreateDeck: deck => dispatch(createDeck(deck)),
});

export default connect(
  null,
  mapDispatchToProps,
)(NewDeck);
