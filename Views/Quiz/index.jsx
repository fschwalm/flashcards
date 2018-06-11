import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import ProgressHeader from './ProgressHeader';
import { clearLocalNotification, setLocalNotification } from '../../utils/notifications';

const getCorrectAnswers = score => score.filter(s => s === true);

const getPercentage = score => ((getCorrectAnswers(score).length / score.length) * 100).toFixed(2);

const initialState = {
  questionIndex: 1,
  score: [],
  showAnswer: false,
  isFinished: false,
};

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
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

  getNextQuestion() {
    return this.props.deck.questions[this.state.questionIndex - 1];
  }

  hasNextQuestion() {
    return this.state.questionIndex <= this.props.deck.questions.length;
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
    clearLocalNotification().then(setLocalNotification());
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
      ...initialState,
    });
  }

  render() {
    let currentQuestion;

    if (!this.props.deck.questions) {
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
            questionsSize={this.props.deck.questions.length}
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
          questionsSize={this.props.deck.questions.length}
          currentQuestionIndex={this.state.questionIndex}
        />
        <Text>{currentQuestion.question}</Text>
        <Button title="Answer" onPress={() => this.showAnswer()} />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  deck: state.decks[ownProps.navigation.state.params.deckTitle],
});

export default connect(mapStateToProps)(Quiz);
