import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";

import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

//import voyages from './trips.json'

import Accueil from "./composant/Pages/Accueil";
import Recherche from "./composant/Pages/Recherche";
import Croisiere from "./composant/Pages/Croisiere";
import CroisiereDetailScreen from "./composant/Pages/CroisiereDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const SIZE_ICON = 30;
  //const COLOR_ICON = focused ? "black" : "blue";

  return (
    <NavigationContainer>
      
      <Tab.Navigator initialRouteName="Accueil">
        <Tab.Screen
          name="Accueil"
          component={Accueil}
          options={{
            headerShown:false,//enlever le header
            tabBarIcon: ({ size, focused, color }) => (
              <Ionicons
                name="home"
                size={SIZE_ICON}
                color={focused ? "blue" : "#ADD8E6"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Recherche"
          component={Recherche}
          options={{
            headerShown:false,
            tabBarIcon: ({ size, focused, color }) => (
              <AntDesign
                name="search1"
                size={SIZE_ICON}
                color={focused ? "blue" : "#ADD8E6"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="croisiereScreen"
          component={CroisiereScreen}
          options={{
            headerShown:false,
            tabBarIcon: ({ size, focused, color }) => (
              <FontAwesome6
                name="sailboat"
                size={SIZE_ICON}
                color={focused ? "blue" : "#ADD8E6"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const CroisiereScreen = ({navigation, route}) => {

  return <Stack.Navigator>
  <Stack.Screen name="Croisiere" component={Croisiere} options={{headerShown: false,}} />
  <Stack.Screen
    name="CroisiereDetail"
    component={CroisiereDetailScreen}
    options={({ route }) => ({ title: route.params.croisiereNom })}

  />
</Stack.Navigator>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
