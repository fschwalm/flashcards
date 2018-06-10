import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { gray } from '../../utils/colors';
import { addCardToDeck } from '../../store/actions';

class NewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
    };
    this.handleAddCard = this.handleAddCard.bind(this);
  }

  handleAddCard() {
    const deckTitle = this.props.navigation.state.params.deckTitle;
    this.props.onAddCardToDeck({ ...this.state }, deckTitle);
    this.setState({ question: '', answer: '' });
    this.props.navigation.goBack();
  }

  render() {
    const { question, answer } = this.state;
    const isValid = question && answer;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TextInput
            value={question}
            style={styles.input}
            placeholder="Question"
            onChangeText={text => this.setState({ question: text })}
          />
          <TextInput
            value={answer}
            style={styles.input}
            placeholder="Answer"
            onChangeText={text => this.setState({ answer: text })}
          />
          <Button disabled={!isValid} title="Add Card" onPress={this.handleAddCard} />
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
  onAddCardToDeck: (card, deckTitle) => dispatch(addCardToDeck(card, deckTitle)),
});

export default connect(
  null,
  mapDispatchToProps,
)(NewCard);
