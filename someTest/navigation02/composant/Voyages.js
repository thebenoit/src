import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Voyages = ({ destination, depart, nbDeJours }) => {
  return (
    <View style={styles.voyageContainer}>
      <Text style={styles.TextVoyage}>Destination: {destination}</Text>
      <Text style={styles.TextVoyage}>Départ: {depart}</Text>
      <Text style={styles.TextVoyage}>Nombres de jours: {nbDeJours}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TextVoyage: {
    color: "blue",
   
  },
  voyageContainer: {
    alignItems: "center",
    margin: 10,
  },
});

export default Voyages;
