import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    Modal,
    Alert,
 
  } from "react-native";
  import React, { useState } from "react";
  import ModalItineraire from "./ModalItineraire";
  import  Voyages from "./Voyages";

  
  /**
   * Image de fond représentant le bateau de croisière
   * @param {string} imageUri - URI de l'image du bateau
   * @returns Image component
   */
  const BateauPic = ({
    imageUri = "https://i.pinimg.com/236x/f6/6a/a6/f66aa634f286df41da066fa16eaa5724.jpg",
  }) => {
    return <Image source={{ uri: imageUri }} style={styles.ImageFormat} />;
  };
  
  const BateauCroisiere = ({ uri, nom = "No Name", afficher ,voyage}) => {
        const [listeVoyage, setListeVoyage] = useState([])
        const [estVisible, setEstVisible] = useState()

      
    return (
      <View style={styles.bateauCroisiereContainer}>
        
        <BateauPic imageUri={uri} />
        <Text style={styles.textStyle}>{nom}</Text>

        <Pressable
        style={({ pressed }) => [
          styles.PressableStyle,
          { backgroundColor:"#007aff" },
        ]}
        onPress={() => afficher()}
      >
        <Text style={styles.textPressable}>Voir les itinéraires</Text>
      </Pressable>
        
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    bateauCroisiereContainer: {
      width: 300,
      height: 350,
      borderRadius: 20,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.17,
      shadowRadius: 20,
      margin: 20,
      alignItems: "center", // Centre le texte horizontalement
      justifyContent: "center", // Centre le texte verticalement\
  
    
    },
    ImageFormat: {
      width: "100%",
      height: "100%",
      borderRadius: 20,
      
      position: "absolute", // Assure que l'image couvre tout le conteneur
    },
    textStyle: {
      color: "white", // Couleur du texte pour contraste
      fontSize: 34, // Taille du texte
      fontWeight: "bold", // Gras pour le texte
      textShadowColor: "rgba(0, 0, 0, 0.75)", // Ombre pour améliorer la visibilité
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
  
    PressableStyle: {
      //zIndex: 1, // Assure que le Pressable est au-dessus des autres vues
      alignItems: "center",
      backgroundColor: "#007aff",
      width: 150,
      height: 30,
      borderRadius: 10,
      marginTop: 150, //met le pressable  en bas
      padding: 5,
    },
    textPressable: {
      fontWeight: "bold",
      fontSize: 15,
      color: "white",
    },
  });
  
  export default BateauCroisiere;
  