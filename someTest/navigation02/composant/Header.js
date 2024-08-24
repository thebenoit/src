import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Header = ({
  text,
  couleurBackground,
  couleurText = "black",
  margin
}) => {
  return (
    <View style={[
      {backgroundColor: couleurBackground},
      {alignItems: 'center'},
      {margin: margin},
      {marginTop: 50}]}>
      <Text style={[{ color: couleurText }, { fontSize: 24 }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({


})
export default Header;
