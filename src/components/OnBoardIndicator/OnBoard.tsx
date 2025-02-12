import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { AnimatedProps, FadeInDown, FadeInLeft, FadeInUp, FadeOutLeft, FadeOutUp, interpolateColor, LinearTransition, SharedValue, useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated'

const _spacing = 8;
const _buttonHeight =  42;
const _layoutTransition = LinearTransition.springify().damping(80).stiffness(200);
const _dotContaner = 24;
const _dotSize= _dotContaner/3;
const _activeDot = "#fff";
const _inactiveDot = '#aaa';



interface Props {
    total:number,
    selectedIndex:number,
    onIndexChanged:(index:number)=>void
}

interface PaginationProps extends Pick<Props, 'total' | 'selectedIndex'> {

}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

function Dot({index,animation}:{index:number,animation:SharedValue<number>}){

    const style = useAnimatedStyle(()=>{
        return{
            backgroundColor:interpolateColor(
                animation.value,
                [index-1,index,index+1],
                [_inactiveDot,_activeDot,_activeDot]
            )
        }
    })
return (
  <View style={{
    width:_dotContaner,height:_dotContaner,
    justifyContent:"center",
    alignItems:"center",
  }}>
    <Animated.View
      style={[style,{
        width: _dotSize,
        height: _dotSize,
        borderRadius: _dotSize,
      }]}
    />
  </View>
);
}
function PaginationIndicator({animation}: {animation: SharedValue<number>}) {

    const style = useAnimatedStyle(()=>{
        return{
            width:_dotContaner + _dotContaner * animation.value
        }
    })
    return(
        <Animated.View 
        style={[{
            backgroundColor:"#29BE56",
            height:_dotContaner,
            width:_dotContaner,
            borderRadius:_dotContaner,
            position:"absolute",
            left:0,
            right:0
        },style]}
        />
    )
}

const Pagination = (Props:PaginationProps)=>{
    const animation = useDerivedValue(()=>{
        return withSpring(Props.selectedIndex,{
            damping:80,
            stiffness:200
        })
    })
    return (
      <View style={{justifyContent:"center",alignItems:"center"}}>
        <View style={{flexDirection:"row"}}>
            <PaginationIndicator animation={animation} />
          {[...Array(Props.total).keys()].map(i => (
            <Dot index={i} animation={animation}/>
          ))}
        </View>
      </View>
    );
}


function Button ({children,style,...rest}:AnimatedProps<PressableProps>){
    return (
      <AnimatedPressable
        style={[
          {
            height: _buttonHeight,
            borderRadius: _buttonHeight / 2,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: _spacing * 2,
          },
          style,
        ]}
        entering={FadeInLeft.springify().damping(80).stiffness(200)}
        exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
        layout={_layoutTransition}
        {...rest}>
        {children}
      </AnimatedPressable>
    );
}

const OnBoard = (Props:Props) => {
  return (
    <View>
      <View style={{padding: _spacing, gap:_spacing*2}}>
        <Pagination total={Props.total} selectedIndex={Props.selectedIndex} />
        <Text>Onboarding {Props.selectedIndex}</Text>
        <View style={{flexDirection: 'row', gap: _spacing}}>
          {Props.selectedIndex > 0 && (
            <Button
              style={{
                backgroundColor: '#ddd',
              }}
              onPress={() => Props.onIndexChanged(Props.selectedIndex - 1)}>
              <Text>Back</Text>
            </Button>
          )}

          <Button
            style={{
              backgroundColor: '#036BFB',
              flex: 1,
            }}
            onPress={() => {
              if (Props.selectedIndex === Props.total - 1) return;
              Props.onIndexChanged(Props.selectedIndex + 1);
            }}>
            {Props.selectedIndex === Props.total ? (
              <Animated.Text
                key={'finish'}
                layout={_layoutTransition}
                entering={FadeInDown.springify().damping(80).stiffness(200)}
                exiting={FadeOutUp.springify().damping(80).stiffness(200)}
                style={{color: '#fff'}}>
                Finish
              </Animated.Text>
            ) : (
              <Animated.Text
                key={'continue'}
                entering={FadeInDown.springify().damping(80).stiffness(200)}
                exiting={FadeOutUp.springify().damping(80).stiffness(200)}
                layout={_layoutTransition}
                style={{color: '#fff'}}>
                Continue
              </Animated.Text>
            )}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default OnBoard

const styles = StyleSheet.create({})