import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Main = () => {
  return (
    <View style={styles.flex}>
      <TouchableOpacity>
        <Image source={require('../../assets/back.png')} style={styles.imageStyle} />
      </TouchableOpacity>
      <Text style={styles.titleStyle}>SET UP YOUR PROFILE</Text>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  titleStyle:{
    fontSize:16,
    letterSpacing:0.4,
    color:"black"
  }
});