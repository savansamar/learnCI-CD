import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Animated as OLdAnimated,
} from 'react-native';
import Svg, {
  Circle,
  Line,
  G,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedReaction,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const AnimatedCircle = OLdAnimated.createAnimatedComponent(Circle);

const AirConditioner = () => {
  const [temperature, setTemperature] = useState(29);
  const [isPaused, setIsPaused] = useState(true);

  const windowWidth = Dimensions.get('window').width;
  const size = windowWidth * 0.6;
  const center = size / 2;
  const radius = size / 2 - 50;
  const tickCount = 180;

  const calculateAngle = (temp: number) => ((temp - 16) / 16) * 360;
  const calculateTemperature = (angle: number) => {
    'worklet';
    return Math.min(32, Math.max(16, Math.round(16 + (angle / 360) * 16)));
  };

  const angle = useSharedValue(calculateAngle(temperature));

  useAnimatedReaction(
    () => angle.value,
    currentAngle => {
      const temp = calculateTemperature(currentAngle);
      runOnJS(setTemperature)(temp);
    },
  );

  const panGesture = Gesture.Pan()
    .onBegin(e => {
      'worklet';
      const x = e.x - center;
      const y = e.y - center;
      let newAngle = Math.atan2(y, x) * (180 / Math.PI) + 90;
      if (newAngle < 0) newAngle += 360;
      angle.value = newAngle;
    })
    .onUpdate(e => {
      'worklet';
      const x = e.x - center;
      const y = e.y - center;
      let newAngle = Math.atan2(y, x) * (180 / Math.PI) + 90;
      if (newAngle < 0) newAngle += 360;
      angle.value = newAngle;
    })
    .onEnd(() => {
      'worklet';
      angle.value = withSpring(angle.value, {
        damping: 10,
        stiffness: 100,
      });
    });
    

  const animatedIndicatorProps = useAnimatedProps(() => {
    const indicatorAngle = (angle.value - 90) * (Math.PI / 180);
    return {
      cx: center + radius * Math.cos(indicatorAngle),
      cy: center + radius * Math.sin(indicatorAngle),
    };
  });

  
  const generateTicks = () => {
    'worklet';
    const ticks = [];
    const activeAngle = angle.value;

    const maxTickHeight = 55;
    const minTickHeight = 10;
    const spread = 45; // Increased spread for better visibility of ripple

    for (let i = 0; i < tickCount; i++) {
      const tickAngle = (i * 360) / tickCount;
      const radians = (tickAngle - 90) * (Math.PI / 180);

      const delta = ((((tickAngle - activeAngle) % 360) + 540) % 360) - 180;

      let tickHeight = minTickHeight;
      let opacity = 0.3;

      // Adjust the tick height and opacity when it's near the active angle
      if (Math.abs(delta) <= spread) {
        const normalized = (delta + spread) / (2 * spread); // Normalize to 0-1
        const bump = Math.pow(Math.cos(normalized * Math.PI), 1.5); // Smooth bump effect
        const factor = (1 - bump) / 2;
        tickHeight = minTickHeight + factor * (maxTickHeight - minTickHeight);
        opacity = 1;
      }

      const x1 = center + radius * Math.cos(radians);
      const y1 = center + radius * Math.sin(radians);
      const x2 = center + (radius + tickHeight) * Math.cos(radians);
      const y2 = center + (radius + tickHeight) * Math.sin(radians);

      // Ensure no invalid points are added
      if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2)) {
        ticks.push(
          <Line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#grad)"
            strokeWidth={1.5}
            opacity={opacity}
          />,
        );
      }
    }

    return ticks;
  };
  
  const togglePause = () => setIsPaused(!isPaused);

  const ACIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <G
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none">
        <G>
          <Line x1={7} y1={8} x2={17} y2={8} />
          <Line x1={7} y1={12} x2={17} y2={12} />
          <Line x1={7} y1={16} x2={17} y2={16} />
        </G>
        <G>
          <Line x1={7} y1={8} x2={7} y2={16} />
          <Line x1={17} y1={8} x2={17} y2={16} />
        </G>
        <Line x1={10} y1={8} x2={10} y2={12} />
        <Line x1={14} y1={8} x2={14} y2={12} />
      </G>
    </Svg>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: 'https://via.placeholder.com/800x400'}}
        style={styles.header}
        imageStyle={styles.headerImage}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Family</Text>
          <Text style={styles.title}>Room</Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.deviceInfo}>
          <ACIcon />
          <Text style={styles.deviceName}>Air Conditioner</Text>
        </View>

        <View style={styles.thermostatContainer}>
          <GestureDetector gesture={panGesture}>
            <View>
              <Svg width={size} height={size}>
                <Defs>
                  <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="0%" stopColor="#6495ED" stopOpacity="1" />
                    <Stop offset="100%" stopColor="#FF7F7F" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <G>{generateTicks()}</G>
                <Circle
                  cx={center}
                  cy={center}
                  r={radius - 30}
                  fill="white"
                  stroke="#F8F8F8"
                  strokeWidth={2}
                />
                <AnimatedCircle
                  animatedProps={animatedIndicatorProps}
                  r={8}
                  fill="#6495ED"
                  stroke="white"
                  strokeWidth={1}
                />
              </Svg>
              <View
                style={[
                  styles.temperatureText,
                  {top: center - 15, left: center - 20},
                ]}>
                <Text style={styles.tempValue}>{temperature}°</Text>
              </View>
            </View>
          </GestureDetector>
        </View>

        <View style={styles.controlButtons}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              isPaused ? styles.activeButton : null,
            ]}
            onPress={togglePause}>
            <Text style={styles.buttonText}>II</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={[
              styles.controlButton,
              !isPaused ? styles.activeButton : null,
            ]}
            onPress={togglePause}>
            <Text style={styles.buttonText}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


export default AirConditioner;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {height: '35%'},
  headerImage: {opacity: 0.7},
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  deviceName: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  thermostatContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperatureText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  controlButtons: {
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
    borderRadius: 25,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  controlButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: '#6495ED',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: '#999',
  },
});
