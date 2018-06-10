import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { gray } from '../../utils/colors';
import ProgressHeader from './ProgressHeader';

const getCorrectAnswers = score => score.filter(s => s === true);

const getPercentage = score => ((getCorrectAnswers(score).length / score.length) * 100).toFixed(2);

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: {},
      questionIndex: 1,
      score: [],
      showAnswer: false,
      isFinished: false,
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getNextQuestion = this.getNextQuestion.bind(this);
    this.hasNextQuestion = this.hasNextQuestion.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.hideAnswer = this.hideAnswer.bind(this);
    this.finishQuiz = this.finishQuiz.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);
  }

  componentDidMount() {
    console.log('ahah');
    const deck = this.props.navigation.state.params.deck;
    this.setState({ deck });
  }

  getNextQuestion() {
    return this.state.deck.questions[this.state.questionIndex - 1];
  }

  hasNextQuestion() {
    return this.state.questionIndex <= this.state.deck.questions.length;
  }

  nextQuestion() {
    if (this.hasNextQuestion()) {
      this.setState(prevState => ({ questionIndex: prevState.questionIndex + 1 }));
      this.hideAnswer();
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    this.setState({ isFinished: true });
  }

  showAnswer() {
    this.setState({ showAnswer: true });
  }

  hideAnswer() {
    this.setState({ showAnswer: false });
  }

  handleAnswer(isCorrect) {
    this.setState({ score: [...this.state.score, isCorrect] });
    this.nextQuestion();
  }

  restartQuiz() {
    this.setState({
      questionIndex: 1,
      score: [],
      showAnswer: false,
      isFinished: false,
    });
  }

  render() {
    let currentQuestion;

    if (!this.state.deck.questions) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }

    if (!this.state.isFinished && this.hasNextQuestion()) {
      currentQuestion = this.getNextQuestion();
    }

    if (this.state.isFinished || !this.hasNextQuestion()) {
      return (
        <View>
          <Text>Congratulations!</Text>
          <Text>{getPercentage(this.state.score)}%</Text>
          <Button title="Back to Deck" onPress={() => this.props.navigation.goBack()} />
          <Button title="Restart Quiz" onPress={this.restartQuiz} />
        </View>
      );
    }

    if (this.state.showAnswer) {
      return (
        <View>
          <ProgressHeader
            questionsSize={this.state.deck.questions.length}
            currentQuestionIndex={this.state.questionIndex}
          />
          <Text>{currentQuestion.answer}</Text>
          {/* TODO:
          - Usar icon like and deslike
          - Só aparecer na tela da Respostas

        */}
          <Button title="Correct" onPress={() => this.handleAnswer(true)} />
          <Button title="Incorrect" onPress={() => this.handleAnswer(false)} />
        </View>
      );
    }
    return (
      <View>
        <ProgressHeader
          questionsSize={this.state.deck.questions.length}
          currentQuestionIndex={this.state.questionIndex}
        />
        <Text>{currentQuestion.question}</Text>
        <Button title="Answer" onPress={() => this.showAnswer()} />
      </View>
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

export default Quiz;
