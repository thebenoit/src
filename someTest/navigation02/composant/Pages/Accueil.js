import {
  StyleSheet,
  View,
  Text,
  Pressable,
  alert,
  Alert,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import BateauCroisiere from "../BateauCroisiere";
import Modal from "../ModalItineraire";
import dataVoyage from "../../trips.json";
import Header from "../Header";
const Accueil = () => {
  const [voyageJson, setVoyageJson] = useState();

  //const qui rend le modal visible ou invisible
  const [modalVisible, setModalVisible] = useState(false);
  const [nomModal, setNomModal] = useState();

  //methode pour rendre le modal visble
  const rendreVisible = ({ data, nom }) => {
    setModalVisible(true);

    setVoyageJson(data);

    setNomModal(nom);
  };

  //methode pour rendre le modal invisble
  const rendreInVisible = () => {
    setModalVisible(false);
    console.log(modalVisible);
  };

  const afficherVoyages = ({ data }) => {
    setVoyageJson(data);
  };
  return (
    <View style={styles.container}>
      <Header
        text={"Nos Croisières en Promotions⭐️"}
        couleurText={"blue"}
        marginTop={20}
      />
      <FlatList
        data={dataVoyage}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <BateauCroisiere
            uri={item.image}
            nom={item.cruiseLine}
            voyage={item.croisieres}
            afficher={() =>
              rendreVisible({ data: item.croisieres, nom: item.cruiseLine })
            }
          />
        )}
      />

      <Modal
        modalVisible={modalVisible}
        titre={nomModal}
        fermer={rendreInVisible}
        data={voyageJson}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  PressableStyle: {
    //zIndex: 1, // Assure que le Pressable est au-dessus des autres vues
    alignItems: "center",
    backgroundColor: "#007aff",
    width: 150,
    height: 30,
    borderRadius: 10,
    //marginTop: 150, //met le pressable  en bas
    padding: 20,
  },
});

export default Accueil;
