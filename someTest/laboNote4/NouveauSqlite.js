//Labo4 

import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable, TextInput,Modal} from 'react-native';

const initialNewNote = {id:0, titre: "", contenu: ""};  //vide
const db = new Database("notes");

// 3 composants


// 4 requêtes
const createTable = async () => {const response= await db.execAsync("CREATE TABLE IF NOT EXISTS " +
    "notes (id INTEGER PRIMARY KEY AUTOINCREMENT, titre TEXT, contenu INTEGER);" )}

const ajouterEnregistrement = async ({note}) =>{
    const statement = await db.prepareAsync(
        'INSERT INTO etudiants (titre, contenu) VALUES ($titre1, $contenu1)' );
      try {
        let result = await statement.executeAsync({ $note1: note.titre, $contenu1: note.contenu });
        console.log("insertion " + note.titre+ note.contenu, result.lastInsertRowId, result.changes);
          console.log("Ajouté ", note); 
      } catch (error) {
          console.log(error);
      }
}    
    const ModalNewNote = ({ visible, setVisible, note, setNote, ajouter }) => {
        return (
          <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            style={styles.ModalContainer}
          >
            <View style={styles.ModalInterior}>
              <TextInput
                style={styles.inputStyle}
                placeholder="titre"
                placeholderTextColor="#aaaaaa"
                value={note.titre}
                onChangeText={(n) => setNote({ ...note, titre: n })}
              />
      
              <TextInput
                style={[styles.inputStyle, { height: 100 }]}
                placeholder="contenu"
                placeholderTextColor="#aaaaaa"
                value={note.contenu}
                onChangeText={(n) => setNote({ ...note, contenu: n })}
              />
      
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.ModalButton, { justifyContent: "flex-start" }]}
                  onPress={ajouter}
                >
                  <Text style={{ color: "#1A9BFF", fontSize: 15 }}>Confirmer</Text>
                </TouchableOpacity>
      
                <TouchableOpacity
                  style={[styles.ModalButton, { justifyContent: "flex-end" }]}
                  onPress={() => setVisible(false)}
                >
                  <Text style={{ color: "#1A9BFF", fontSize: 15 }}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        );
      };
      
    const NoteInterior = ({ setNoteVisible, noteVisible, titre, contenu,id,supprimer }) => {
        return (
          <Modal
            visible={noteVisible}
            transparent={false}
            animationType="slide"
            style={styles.ModalContainer}
          >
            <View style={styles.interiorContainer}>
              <TouchableOpacity
                style={{ justifyContent: "flex-start" }}
                onPress={() => setNoteVisible(false)}
              >
                <AntDesign
                  style={[{ margin: 15 }]}
                  name="close"
                  size={24}
                  color="yellow"
                />
              </TouchableOpacity>
              <Text style={styles.interiorTitle}>{id}:{titre}</Text>
              <Text style={styles.interiorContenu}> {contenu}</Text>
              <TouchableOpacity
                style={[
                  { margin: 15 },
                  { alignItems: "center" },
                  { alignSelf: "center" },
                ]}
                onPress={() => supprimer(id)}
              >
                <Text style={[{ color: "#1A9BFF" }, { fontSize: 15 }]}>
                  {" "}
                  Supprimer
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        );
      };
export default function App() {
  const [note, setNote] = useState(initialNewNote);

  const [modalNote, setModalNote] = useState(initialNewNote);

  const [listNotes, setListNotes] = useState([]);

  const [visible, setVisible] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);

  const NoNoteText = "Vous n'avez aucune note pour le moment!";

  const vide=<Text>"Vous n'avez aucune note pour le moment!"</Text>;


  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Todo Notes</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  titre:{
    fontSize: 20,
    fontWeight:'bold'
  },
  NoteButton: {
    backgroundColor: "lightsalmon",
    paddingBottom: 5,
    marginBottom: 5
  },
  openNoteButton: {
    backgroundColor: "lightgrey",
    paddingBottom: 5,
    marginBottom: 5,
    fontSize: 16
  },
  showNewNoteFormButton: {
    backgroundColor: "salmon"
  },
  hideNewNoteFormButton: {
    backgroundColor: "grey",
    color: "white"
  },
  saveNoteButton: {
    backgroundColor: "lightblue"
  }
});
