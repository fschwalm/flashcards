import React from 'react';
import { View, Text } from 'react-native';

const ProgressHeader = ({ questionsSize, currentQuestionIndex }) => (
  <View>
    <Text>
      {currentQuestionIndex}/{questionsSize}
    </Text>
  </View>
);

export default ProgressHeader;
