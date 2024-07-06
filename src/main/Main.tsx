import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Main = () => {
  return (
    <View style={styles.flex}>
      <Text>Main</Text>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
    flex:{
        flex:1,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center"
    }
})