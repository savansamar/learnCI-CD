import {LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import TargetText from './TargetText';

const static_text = `One of the most revolutionary advancements in technology is artificial intelligence. AI-driven applications, such as voice assistants, chatbots, and machine learning algorithms, have significantly improved automation and efficiency. Businesses leverage AI for data analysis, customer service, and predictive analytics, making operations smarter and more effective. One of the most revolutionary advancements in technology is artificial intelligence. AI-driven applications, such as voice assistants, chatbots, and machine learning algorithms, have significantly improved automation and efficiency. Businesses leverage AI for data analysis, customer service, and predictive analytics, making operations smarter and more effective.One of the most revolutionary advancements in technology is artificial intelligence. AI-driven applications, such as voice assistants, chatbots, and machine learning algorithms, have significantly improved automation and efficiency. Businesses leverage AI for data analysis, customer service, and predictive analytics, making operations smarter and more effective. One of the most revolutionary advancements in technology is artificial intelligence. AI-driven applications, such as voice assistants, chatbots, and machine learning algorithms, have significantly improved automation and efficiency. Businesses leverage AI for data analysis, customer service, and predictive analytics, making operations smarter and more effective.One of the most revolutionary advancements in technology is artificial intelligence. AI-driven applications, such as voice assistants, chatbots, and machine learning algorithms, have significantly improved automation and efficiency. Businesses leverage AI for data analysis, customer service, and predictive analytics, making operations smarter and more effective. One of the most revolutionary advancements in technology is artificial intelligence. AI-driven applications, such as voice assistants, chatbots, and machine learning algorithms, have significantly improved automation and efficiency. Businesses leverage AI for data analysis, customer service, and predictive analytics, making operations smarter and more effective.
`;

const Paragraph = () => {
  let mark: boolean = false;
  let text = '';


  return (
    <View style={styles.conatiner}>
      <View style={styles.spacer} />
      <View style={styles.horizonatlText}>
        {static_text.split(' ').map((e, index) => {
          mark = e.trim().toLowerCase().includes('ai');
          text = ' '+e;
          return (
            <View>
              <TargetText
                highlight={mark}
                highlightedText={mark ? text : ''}
                text={text}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Paragraph;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  defaultTextStyle: {
    textAlign: 'left',
    letterSpacing: 2,
    lineHeight: 30,
  },
  horizonatlText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  spacer: {
    height: 120,
  },
  heighlightText: {
    backgroundColor: 'red',
  },
  svg: {
    // position: 'absolute',
  },
  highlightSvg: {
    position: 'absolute',
    left: 0, // Adjust to position the circle around the text
    top: -8,
  },
});
