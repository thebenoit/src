import { StatusBar } from "expo-status-bar";
import React, { createContext, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import Accueil from "./components/pages/Accueil";
import Produits from "./components/pages/NosProduits";
import Preferences from "./components/pages/Preferences";

Tab = createBottomTabNavigator();
export const prefContext = createContext();
export default function App() {
  const [pref, setPref] = useState({
    backgroundColor: "yellow",
    color: "black",
    pays: "Canada",
    langue: "fr",
  });

  /*const pref = {
    backgroundColor: "blue",
    color: "white",
    pays: "Canada",
    langue: "fr",
  };*/
  return (
    <prefContext.Provider value={[pref, setPref]}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Accueil"
            component={Accueil}
            options={{
              tabBarIcon: ({ size, focused, color }) => (
                <AntDesign
                  name="home"
                  size={24}
                  color={focused ? "blue" : "#ADD8E6"}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Nos produits"
            component={Produits}
            options={{
              tabBarIcon: ({ size, focused, color }) => (
                <AntDesign
                  name="iconfontdesktop"
                  size={24}
                  color={focused ? "blue" : "#ADD8E6"}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Preferences"
            component={Preferences}
            options={{
              tabBarIcon: ({ size, focused, color }) => (
                <AntDesign
                  name="key"
                  size={24}
                  color={focused ? "blue" : "#ADD8E6"}
                />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </prefContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
