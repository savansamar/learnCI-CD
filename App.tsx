// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */


// /* 
//  * Use useSharedValue for standalone animated values that update directly.
//  * Example: Tracking a draggable element's position or maintaining a scroll offset.
//  */
// // const dragX = useSharedValue(0); 
// // dragX.value = 50; // Update the value directly

// /* 
//  * Use useDerivedValue for computed or dependent animated values.
//  * Example: Calculating scale or opacity based on another shared value.
//  */
// // const scale = useDerivedValue(() => dragX.value / 100); 

// import React from 'react';
// // import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';
// import Progress, { Level } from './src/components/BarProgress/Progress';
// import OnBoard from './src/components/OnBoardIndicator/OnBoard';
// import ArticleProgressExample from './src/components/BarProgress/ArticleProgress';


// function App(): React.JSX.Element {
//   const [selectedIndex ,setSelectedIndex] = React.useState<number>(0);

//   return (
//     <View style={{
//       flex:1,justifyContent:"center",
//     }}>
//     {/* <OnBoard total={4} selectedIndex={selectedIndex} onIndexChanged={(e)=>setSelectedIndex(e)} />
//       <Progress level={Level.Silver} /> */}
//       <ArticleProgressExample />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Paragraph from './src/components/SelectedText/Paragraph';

const App = () => <Paragraph />;

export default App

const styles = StyleSheet.create({})