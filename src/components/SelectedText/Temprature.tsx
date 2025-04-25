// import React from 'react';
// import {View, Dimensions, StyleSheet} from 'react-native';
// import Svg from 'react-native-svg';
// import Animated, {
//   useSharedValue,
//   interpolate,
//   Extrapolate,
//   withSpring,
// } from 'react-native-reanimated';
// import {Gesture, GestureDetector} from 'react-native-gesture-handler';
// import OuterLine from './OuterLine'; // Your existing OuterLine component

// const {width} = Dimensions.get('screen');
// const SVG_HEIGHT = width * 0.8;

// const GestureControlledOuterLine = () => {
//   // Initialize rotation shared value
//   const rotation = useSharedValue(0);

//   // Create pan gesture
//   const gesture = Gesture.Pan()
//     .onStart(() => {
//       // Optional: Add any start gesture logic
//       console.log('Gesture started');
//     })
//     .onUpdate(event => {
//         console.log(event.translationX)
//       rotation.value = event.translationX;
//     })
//     .onEnd(() => {
//       // Reset rotation with spring animation
//       rotation.value = withSpring(0);
//     });

//   return (
//     <View style={styles.container}>
//       {/* SVG with OuterLine component */}
//       <Svg width={width} height={SVG_HEIGHT}>
//         <OuterLine peakIndex={rotation.value} sc={rotation} />
//       </Svg>

//     <GestureDetector gesture={gesture}>
//         <View style={styles.gestureView} />
//       </GestureDetector>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   peakIndexText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   gestureView: {
//     height: SVG_HEIGHT * 0.48,
//     width: width * 0.38,
//     backgroundColor: 'grey',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     borderRadius: width * 0.2,
//   },
// });

// export default GestureControlledOuterLine;
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  useDerivedValue,
} from 'react-native-reanimated';
import OuterLine from './OuterLine';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Svg from 'react-native-svg';
const {width} = Dimensions.get('screen');
const SVG_HEIGHT = width * 0.8;
function Temperature() {

  const scale = useSharedValue<number>(90);
const prevAngle = useSharedValue(0); 

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

//   React.useEffect(() => {
//     scale.value = withRepeat(
//       withTiming(scale.value * 2, {duration: 1000}),
//       -1,
//       true,
//     );
//   }, []);

    const gesture = Gesture.Pan()
      .onStart(() => {
        // Optional: Add any start gesture logic
        console.log('Gesture started');
      })
      .onUpdate(event => {
       const centerX = width / 2;
       const centerY = SVG_HEIGHT / 2;

       // Get touch position relative to center
       const touchX = event.absoluteX - centerX;
       const touchY = event.absoluteY - centerY;

       // Calculate current angle in degrees
       let currentAngle = Math.atan2(touchY, touchX) * (180 / Math.PI);

       // Normalize angle to be between 0 - 360
       if (currentAngle < 0) currentAngle += 360;

       // Calculate angle difference (detects clockwise vs counterclockwise motion)
       let deltaAngle = currentAngle - prevAngle.value;
       if (deltaAngle > 180) deltaAngle -= 360;
       if (deltaAngle < -180) deltaAngle += 360;

       // Convert angle to a 12-hour format (0-360° → 1-12)
       let newValue = Math.round((currentAngle / 360) * 12);
       if (newValue === 0) newValue = 12; // Make sure 0 becomes 12 (like a clock)

       // Smoothly animate the value
       scale.value = withTiming(newValue, {duration: 100});

       // Update previous angle
       prevAngle.value = currentAngle;

       console.log('Clock Timer Value:', prevAngle.value);
      })
      .onEnd(() => {
       
      });

  return (
    <View style={styles.container}>
      <Svg width={width} height={SVG_HEIGHT}>
        <OuterLine peakIndexs={scale} />
      </Svg>
      <GestureDetector gesture={gesture}>
          <View style={styles.gestureView} />
      </GestureDetector>
    </View>
  );
}
export default  Temperature

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent:"center",
    alignItems:"center"
  },
  ball: {
    height: 0,
    width: 0,
    backgroundColor: '#b58df1',
    borderRadius: 50,
    marginRight: 80,
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: '#b58df1',
    borderRadius: 15,
  },
    gestureView: {
      height: SVG_HEIGHT * 0.48,
      width: width * 0.38,
      backgroundColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      borderRadius: width * 0.2,
    },
});
