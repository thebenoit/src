import { StyleSheet,View, Text,Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Button = ({text,buttonColor = "#38F",borderRadius = 15, action}) => {
  return (
    <View>
      <TouchableOpacity
      style={[
        styles.buttonContainer,
        {backgroundColor: buttonColor},
        {borderRadius:borderRadius}]}
        onPress={() => action()}>

        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({

  buttonContainer:{

    width: 90,
    alignItems:'center',
    justifyContent:'center',
    height: 30,
    padding: 5,
    margin:10
    
  },

  buttonText:{
    color: "white"
  }

})



export default Button