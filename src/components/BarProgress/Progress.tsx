import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { interpolate, interpolateColor, SharedValue, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const _height = 30;
const _width = Dimensions.get('window').width

export enum Level {
    not= -1,
    Free = 0,
    Silver = 1,
    Platinum = 2
}

interface Props {
    level:Level
}

interface LinearProps extends Pick<Props, 'level'> {
    animation:SharedValue<Level>
}

const MultiLinear = (Props:LinearProps)=>{
    const style = useAnimatedStyle(()=>{
        return {
          backgroundColor: interpolateColor(Props.animation.value,[Level.Free,Level.Silver,Level.Platinum],['red','yellow','green']),
        };
    })
    return (
        <View 
           style={[{
            flexGrow:1/3,
            borderWidth:1
           }]} 
        />
           
        
    )
}

const AnimatedMultiLinear = (Props: LinearProps) => {
  const style = useAnimatedStyle(() => {
    let width =
      Props.animation.value === -1
        ? 0
        : _width * 0.267 + _width * 0.267 * Props.animation.value;
    return {
      width: withTiming(
        width,
        {
            duration:1000
        }
      ),
    };
  });
  return (
    <Animated.View
      style={[
        {
          height: _height,
          backgroundColor: 'red',
          position: 'absolute',
        },style
      ]}
    />
  );
};

const Progress = (Props:Props) => {

    // const levels = useSharedValue<Level>(Props.level)
     const levels = useDerivedValue(() => {
       return withSpring(Props.level, {
         damping: 80,
         stiffness: 200,
       });
     });

  return (
    <View style={{alignSelf: 'center', width: '80%'}}>
      <View style={[styles.row]}>
        <AnimatedMultiLinear level={Props.level} animation={levels} />
        {[...Array(3).keys()].map(e => (
          <MultiLinear level={Props.level} animation={levels} />
        ))}
      </View>
    </View>
  );
}

export default Progress

const styles = StyleSheet.create({
  row:{
    flexDirection:"row",
    borderRadius:_height,
    borderWidth:1,
    flexGrow:1,
    height:_height,
    overflow:"hidden"
  }
});