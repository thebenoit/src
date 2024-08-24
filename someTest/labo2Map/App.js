import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import Boulangeries from "./component/BoulangerieListe";
import boulangeriesData from "./commerces.json";
import Map from "./component/Carte";

export default function App() {
  const [selectedMarkerId, setSelectedMarkerId] = useState(null)
  const [activerPressable, setActiverPressable] = useState(false);
    const rendreVrai = () => {
      
      setActiverPressable(true)
      
      
    }

  return (
    <View style={styles.container}>
      <Text style={styles.HeaderStyle}>Les Boulangeries</Text>
      <Boulangeries 
        data={boulangeriesData} 
        setActiver={rendreVrai}
        activer={activerPressable} 
        selectedMarker={selectedMarkerId}
        setSelectedMarker={setSelectedMarkerId}
      />
      <Map 
        boulangeries={boulangeriesData} 
        setActiver={rendreVrai}
        activer={activerPressable}
        selectedMarker={selectedMarkerId}
        setSelectedMarker={setSelectedMarkerId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  HeaderStyle: {
    fontSize: 25,
    padding: 10,
    margin: 15,
    marginTop: 45,
    fontWeight: "bold",
  },
});
