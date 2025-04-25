import {
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Svg, {
  Ellipse,
  Line,
  Text as SvgText,
  Path,
  Rect,
} from 'react-native-svg';

import Animated, {
  useSharedValue,
  useAnimatedProps,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';

// Create animated component
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface TargetTextProps {
  text: string;
  highlight?: boolean;
  highlightedText?: string;
}

const TargetText = (Props: TargetTextProps) => {
  const progress = useSharedValue(0);
  const PATH_LENGTH = 280;

  React.useEffect(() => {
    // Start animation with delay
    progress.value = 0;
    progress.value = withDelay(
      100, // 500ms delay before animation starts
      withTiming(1, {
        duration: 2000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    );
  }, [Props.text]);

  // Create animated props for the path
  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [PATH_LENGTH],
    strokeDashoffset: PATH_LENGTH * (1 - progress.value),
  }));

  const textWidthRef = React.useRef(0);
  const [textWidth, setTextWidth] = React.useState(0);
  const [widthOfText, setWidthOfText] = React.useState<{[key: string]: number}>(
    {},
  );

  const handleLayout = (event: LayoutChangeEvent) => {
    if (!!Props.highlight) {
      setWidthOfText({
        ...widthOfText,
        [Props.text]: event.nativeEvent.layout.width,
      });
      return;
    }
  };

  return (
    <>
      <Text
        key={`${Props.text + String(Math.random)}`}
        onLayout={e => handleLayout(e)}
        style={[styles.defaultTextStyle]}>
        {Props.text}
      </Text>

      {Props.highlight && widthOfText[Props.text] && (
        <Svg
          style={[StyleSheet.absoluteFill]}
          width={Dimensions.get('screen').width}
          height={60}>
          <AnimatedPath
            d={`
                         M 0,0 
                         C 0,10 ${widthOfText[Props?.text] * 0.4},-7 ${widthOfText[Props?.text]},10
                         C ${widthOfText[Props?.text]},30 ${widthOfText[Props?.text] * 0.1},50 0,0 
                       `}
            fill="none"
            stroke="orange"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            animatedProps={animatedProps}
          />
        </Svg>
      )}
    </>
  );
};

export default TargetText;

const styles = StyleSheet.create({
  defaultTextStyle: {
    textAlign: 'left',
    letterSpacing: 2,
    lineHeight: 30,
  },
});
