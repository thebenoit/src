import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../Header";
import dataVoyage from "../../trips.json";
import CroisiereDetailScreen from "./CroisiereDetailScreen";

const Stack = createNativeStackNavigator();

const Croisiere = ({ navigation }) => {
  const [focused, setFocused] = useState(false);
  const dataCroisiere = dataVoyage.croisieres;

  const handleOnPress = ({ nom, data }) => {
    navigation.navigate("CroisiereDetail", {
      croisiereNom: nom,
      data: data,
    });
  };
  return (
    <View style={styles.container}>
      <Header
        text={"Nos lignes de croisières"}
        couleurText={"blue"}
        margin={15}
      />
      <FlatList
        data={dataVoyage}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.pressableStyle,
              { backgroundColor: focused ? "blue" : "#38F" },
            ]}
            onPress={() =>
              handleOnPress({
                nom: item.cruiseLine,
                data: item.croisieres,
              })
            }
          >
            <Text style={styles.pressableTextStyle}>{item.cruiseLine}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  pressableStyle: {
    margin: 7,
    width: 360,
    height: 60,
    backgroundColor: "#38F",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  pressableTextStyle: {
    color: "white",
    fontSize: 17,
  },
});

export default Croisiere;
