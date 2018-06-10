import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class Deck extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.deck.title
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      deck: {},
    };
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleStartQuiz = this.handleStartQuiz.bind(this);
  }

  componentDidMount() {
    const deck = this.props.navigation.state.params.deck;
    this.setState({ deck });
  }

  handleAddCard() {
    this.props.navigation.navigate('NewCard', {deck: this.state.deck})
  }

  handleStartQuiz() {
    this.props.navigation.navigate('Quiz', {deck: this.state.deck})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.deck.title}</Text>
        {this.state.deck.questions && (
          <Text>{this.state.deck.questions.length} cards</Text>
        )}
        <Button title="Add Card" onPress={this.handleAddCard} />
        <Button title="Start Quiz" onPress={this.handleStartQuiz} />
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

export default Deck;
