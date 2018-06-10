import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class Deck extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckTitle,
    };
  };

  constructor(props) {
    super(props);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleStartQuiz = this.handleStartQuiz.bind(this);
  }

  handleAddCard() {
    this.props.navigation.navigate('NewCard', { deckTitle: this.props.selectedDeck.title });
  }

  handleStartQuiz() {
    this.props.navigation.navigate('Quiz', { deckTitle: this.props.selectedDeck.title });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.selectedDeck.title}</Text>
        <Text>{this.props.selectedDeck.questions.length} cards</Text>
        <Button title="Add Card" onPress={this.handleAddCard} />
        <Button disabled={this.props.selectedDeck.questions.length < 1} title="Start Quiz" onPress={this.handleStartQuiz} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
  },
});

const mapStateToProps = (state, ownProps) => ({
  selectedDeck: state.decks[ownProps.navigation.state.params.deckTitle],
});

export default connect(mapStateToProps)(Deck);
