
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Paragraph from './src/components/SelectedText/Paragraph';
import Temprature from './src/components/SelectedText/Temprature';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BrightnessDial from './src/components/Home-Decore/BrightnessDial';

// const App = () => <Paragraph />;
const App = () => (
  <GestureHandlerRootView>
    {/* <Temprature /> */}
    <BrightnessDial />
  </GestureHandlerRootView>
);

export default App

const styles = StyleSheet.create({})