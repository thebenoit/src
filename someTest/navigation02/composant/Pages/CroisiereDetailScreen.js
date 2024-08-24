import React from "react";
import { View, Text, FlatList } from "react-native";
import Voyages from "../Voyages";
import Header from "../Header";
const CroisiereDetailScreen = ({ navigation, route }) => {
  const { croisiereNom, data } = route.params;

  return (
    <View>
      <Header text={croisiereNom}/>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Voyages
            depart={item.depart}
            destination={item.destination}
            nbDeJours={item.nbreJours}
          />
        )}
      />
    </View>
  );
};

export default CroisiereDetailScreen;
