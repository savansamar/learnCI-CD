
// import {Dimensions, StyleSheet } from 'react-native';
// import React from 'react';
// import {Line , Text as SvgText, Svg } from 'react-native-svg';
// import Animated, {
//   useSharedValue,
//   useDerivedValue,
//   interpolate,
//   Extrapolate,
//   useAnimatedStyle,
//   useAnimatedProps,
// } from 'react-native-reanimated';
// const AnimatedLine = Animated.createAnimatedComponent(Line);


// const {width} = Dimensions.get('screen');
// const CIRCLE_RADIUS = width * 0.3;
// const SVG_HEIGHT = width * 0.8;
// const centerX = width / 2;
// const centerY = SVG_HEIGHT / 2;
// const outerRadius = CIRCLE_RADIUS - 40;


// interface OuterLineProps {
//     peakIndex: Animated.SharedValue<number>;
// }

// const OuterLine = (Props:OuterLineProps) => {

//   const peakIndex = useSharedValue(55).value;
//   const maxHeight = 33;
//   const defaultHeight = 20; 
//   const range = 15;
 
//    const rotate = useDerivedValue(() => {
//      return `${Props.peakIndex.value * 2}rad`;
//    });

   
//    const rotateStyles = useAnimatedStyle(() => ({
//      transform: [{rotate: rotate.value}],
//    }));


//   return (
//     <>
//       {[...Array(120)].map((_, i) => {

//         const angle = (i * 360) / 120;
//           const animatedProps = useAnimatedProps(() => {
//             return {
//               y2: centerY - outerRadius + peakIndex,
//               x1: centerX,
//               y1: centerY - (outerRadius ),
//               x2: centerX,
//             };
//           });

//         return (
//           <React.Fragment key={i}>
//             <Animated.View style={[styles.box, rotateStyles]} />
//             <AnimatedLine
//               stroke="red"
//               strokeWidth={2}
//               rotation={angle}
//               originX={centerX}
//               originY={centerY}
//               animatedProps={animatedProps}
//             />
//           </React.Fragment>
//         );
//       })}
//     </>
//   );
// };

// export default OuterLine;

// const styles = StyleSheet.create({
//   box: {
//     height: 100,
//     width: 100,
//     backgroundColor: '#b58df1',
//     borderRadius: 15,
//   },
// });


// import {Dimensions, StyleSheet} from 'react-native';
// import React from 'react';
// import {Line, Svg} from 'react-native-svg';
// import Animated, {
//   useDerivedValue,
//   interpolate,
//   Extrapolate,
//   useAnimatedProps,
//   useAnimatedStyle,
// } from 'react-native-reanimated';

// const AnimatedLine = Animated.createAnimatedComponent(Line);
// const {width} = Dimensions.get('screen');

// const CIRCLE_RADIUS = width * 0.3;
// const SVG_HEIGHT = width * 0.8;
// const centerX = width / 2;
// const centerY = SVG_HEIGHT / 2;
// const outerRadius = CIRCLE_RADIUS - 40;

// interface OuterLineProps {
//   peakIndexs: Animated.SharedValue<number>;
// }

// const OuterLine = ({peakIndexs}: OuterLineProps) => {
//   const maxHeight = 33;
//   const defaultHeight = 20;
//   const range = 15;
//   const peakIndex = 90

//   const interpolatedLengths = useDerivedValue(() =>
//     [...Array(120)].map((_, i) => {
//       if (i >= peakIndex - range && i <= peakIndex + range) {
//         return interpolate(
//           Math.abs(i - peakIndex),
//           [0, range],
//           [maxHeight, defaultHeight],
//           Extrapolate.CLAMP,
//         );
//       }
//       return defaultHeight;
//     }),
//   );

//   const rotate = useDerivedValue(() => `${peakIndexs.value * 2}rad`);

//   const rotateStyles = useAnimatedStyle(() => ({
//     transform: [{rotate: rotate.value}],
//   }));

//   return (
//     <Svg width={width} height={SVG_HEIGHT}>
//       {[...Array(120)].map((_, i) => {
//         const angle = (i * 360) / 120;
//         const lineLength = interpolatedLengths.value[i];
//         const animatedProps = useAnimatedProps(() => ({
//             x1:centerX,
//               y1:centerY - (outerRadius + lineLength),
//               x2:centerX,
//               y2:centerY - (outerRadius)
//         }));

//         return (
//           <React.Fragment key={i}>
//             <Animated.View style={[styles.box, rotateStyles]} />
//             <AnimatedLine
            
//               stroke="red"
//               strokeWidth={2}
//               rotation={angle}
//               originX={centerX}
//               originY={centerY}
//                 animatedProps={animatedProps}
//             />
//           </React.Fragment>
//         );
//       })}
//     </Svg>
//   );
// };

// export default OuterLine;

// const styles = StyleSheet.create({
//   box: {
//     height: 100,
//     width: 100,
//     backgroundColor: '#b58df1',
//     borderRadius: 15,
//     position: 'absolute',
//   },
// });


// import {Dimensions, StyleSheet} from 'react-native';
// import React from 'react';
// import {Line, Svg} from 'react-native-svg';
// import Animated, {
//   useDerivedValue,
//   interpolate,
//   Extrapolate,
//   useAnimatedProps,
//   useAnimatedStyle,
// } from 'react-native-reanimated';

// const AnimatedLine = Animated.createAnimatedComponent(Line);
// const {width} = Dimensions.get('screen');

// const CIRCLE_RADIUS = width * 0.3;
// const SVG_HEIGHT = width * 0.8;
// const centerX = width / 2;
// const centerY = SVG_HEIGHT / 2;
// const outerRadius = CIRCLE_RADIUS - 40;

// interface OuterLineProps {
//   peakIndexs: Animated.SharedValue<number>;
// }

// const OuterLine = ({peakIndexs}: OuterLineProps) => {
//   const maxHeight = 33;
//   const defaultHeight = 20;
//   const range = 15;

//   const peakIndex = useDerivedValue(() => {
//     return Math.min(120, Math.max(0, Math.abs(peakIndexs.value))); // Clamp value between 0 and 120
//   });
//   const interpolatedLengths = useDerivedValue(() =>
//     [...Array(120)].map((_, i) =>
//       i >= peakIndex.value - range && i <= peakIndex.value + range
//         ? interpolate(
//             Math.abs(i - peakIndex.value),
//             [0, range],
//             [maxHeight + 10, defaultHeight], // Extend peak line outward
//             Extrapolate.CLAMP,
//           )
//         : defaultHeight,
//     ),
//   );

//   // **Step 3: Rotate box based on `peakIndexs`**
//   const rotateStyles = useAnimatedStyle(() => ({
//     transform: [{rotate: `${peakIndexs.value * 2}rad`}],
//   }));

// //   const animatedProps = useAnimatedProps(() => {
// //     const lineLengths = [...Array(120)].map((_, i) =>
// //       i >= peakIndex.value - range && i <= peakIndex.value + range
// //         ? interpolate(
// //             Math.abs(i - peakIndex.value),
// //             [0, range],
// //             [maxHeight + 10, defaultHeight],
// //             Extrapolate.CLAMP,
// //           )
// //         : defaultHeight,
// //     );

// //     return {
// //       x1: centerX,
// //       y1: centerY - (outerRadius + lineLengths[peakIndex.value]),
// //       x2: centerX,
// //       y2: centerY - outerRadius,
// //     };
// //   });

//   const roundedPeakIndex = useDerivedValue(() => Math.round(peakIndex.value));

//   return (
//     <Svg width={width} height={SVG_HEIGHT}>
//       {[...Array(120)].map((_, i) => {
//         const angle = (i * 360) / 120;
//         const lineLength = interpolatedLengths.value[i];

//   const animatedProps = useAnimatedProps(() => ({
//     x1: centerX,
//     y1: centerY - (outerRadius + lineLength),
//     x2: centerX,
//     y2: centerY - outerRadius,
//   }));
//         return (
//           <React.Fragment key={i}>
//             {i === Math.round(peakIndex.value) && (
//               <Animated.View style={[styles.box, rotateStyles]} />
//             )}

//             <AnimatedLine
//               stroke={i === roundedPeakIndex.value ? 'blue' : 'red'}
//               strokeWidth={i === roundedPeakIndex.value ? 3 : 2}
//               rotation={angle}
//               originX={centerX}
//               originY={centerY}
//               animatedProps={animatedProps}
//             />
//           </React.Fragment>
//         );
//       })}
//     </Svg>
//   );
// };

// export default OuterLine;

// const styles = StyleSheet.create({
//   box: {
//     height: 100,
//     width: 100,
//     backgroundColor: '#b58df1',
//     borderRadius: 15,
//     position: 'absolute',
//   },
// });



import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {Line, Svg} from 'react-native-svg';
import Animated, {
  useDerivedValue,
  interpolate,
  Extrapolate,
  useAnimatedProps,
} from 'react-native-reanimated';

const AnimatedLine = Animated.createAnimatedComponent(Line);
const {width} = Dimensions.get('screen');

const reversedArray = [...Array(120)].map((_, i) => 120 - i - 1);
const CIRCLE_RADIUS = width * 0.3;
const SVG_HEIGHT = width * 0.8;
const centerX = width / 2;
const centerY = SVG_HEIGHT / 2;
const outerRadius = CIRCLE_RADIUS - 40;

interface OuterLineProps {
  peakIndexs: Animated.SharedValue<number>;
}

const OuterLine = ({peakIndexs}: OuterLineProps) => {
  const maxHeight = 33;
  const defaultHeight = 20;
  const range = 15;

  const peakIndex = useDerivedValue(() => {
    return peakIndexs.value; // Clamp value between 0 and 120
  });

  return (
    <Svg width={width} height={SVG_HEIGHT}>
      {reversedArray.map((_, i) => {
        const angle = (i * 360) / 120;

        // Derived value for each line
        const interpolatedLength = useDerivedValue(() =>
          i >= peakIndex.value - range && i <= peakIndex.value + range
            ? interpolate(
                Math.abs(i - peakIndex.value),
                [0, range],
                [maxHeight + 10, defaultHeight],
                Extrapolate.CLAMP,
              )
            : defaultHeight,
        );

        const animatedProps = useAnimatedProps(() => ({
          x1: centerX,
          y1: centerY - (outerRadius + interpolatedLength.value),
          x2: centerX,
          y2: centerY - outerRadius,
        }));

        return (
          <AnimatedLine
            key={i}
            stroke={i === Math.round(peakIndex.value) ? 'blue' : 'red'}
            strokeWidth={i === Math.round(peakIndex.value) ? 3 : 2}
            rotation={angle}
            originX={centerX}
            originY={centerY}
            animatedProps={animatedProps}
          />
        );
      })}
    </Svg>
  );
};

export default OuterLine;