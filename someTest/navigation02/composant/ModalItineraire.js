import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Voyages from "./Voyages";
import Button from "./Button";
import { AntDesign } from "@expo/vector-icons"; //Logo X

const ModalHeader = ({ titre }) => {
  return (
    <View style={styles.HeaderStyle}>
      <Text style={styles.HeaderTextStyle}>{titre}</Text>
    </View>
  );
};

const ModalItineraire = ({ modalVisible, titre, fermer, data }) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.ModalOutsideBackground}>
        <View style={styles.ModalContainer}>
          <ModalHeader titre={titre} />
          {/*Flatlist contenat les voyages des croisières */}
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              //si surPageDaccueil === 1
              if (item.surPageAccueil === 1) {
                return (
                  <Voyages
                    depart={item.depart}
                    destination={item.destination}
                    nbDeJours={item.nbreJours}
                  />
                );
              } else {
                return null;
              }
            }}
          />
          <Button text={"fermer"} action={fermer} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalOutsideBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(0, 0, 0, 0.7)", // semi-transparent black background
  },
  ModalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    height: "45%",
    backgroundColor: "#e6e6e4",
    borderRadius: 15,
    borderWidth: 0.5,
  },
  HeaderStyle: {
    alignItems: "center",
    width: "90%",
    margin: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },

  HeaderTextStyle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
  },
});

export default ModalItineraire;
