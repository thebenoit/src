import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Database } from "./database";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FileSystem } from "expo-file-system";

import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("notes"); //créer la BD notes

// db.execute("CREATE TABLE IF NOT EXISTS " +
// "notes (id INTEGER PRIMARY KEY AUTOINCREMENT, titre TEXT, contenu TEXT);" )

const createTable = () => {
  
  try {db.transaction(
    (tx) =>
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
          "notes (id INTEGER PRIMARY KEY AUTOINCREMENT, titre TEXT, contenu TEXT);"
      ),
    console.log("table crée")
  );} catch(error) {
      console.log('erreur lors de la creation de table: ',error)
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
  const noteInit = {titre: "", contenu: "" };
  const [note, setNote] = useState(noteInit);
  const [modalNote, setModalNote] = useState(noteInit);

  const [listNotes, setListNotes] = useState([]);

  const [visible, setVisible] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);

  const NoNoteText = "Vous n'avez aucune note pour le moment!";

  useEffect(createTable, []);

  useEffect(() => {
    selectAll();
    console.log('useEffect')  
  },[listNotes]);
  //permet d'ouvrir le modal pour voir le contenu de la note
  let handleNoteOnPress = ({id ,titre, contenu }) => {
    setModalNote({ id: id,titre: titre, contenu: contenu });
    setNoteVisible(true);

    console.log("note est visible?? ", noteVisible);
  };
  
  const deleteRecord = async (noteId) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM notes WHERE id = ?',
          [noteId],
          (_, result) => {
            console.log('Deleted record with id:', noteId);
          },
          (_, error) => {
            console.log('Error deleting record:', error);
          }
        );
      });
      setNoteVisible(false)  
    } catch (error) {
      console.log('Error during delete:', error);
      setNoteVisible(false)  
    }
  };
  
  
 
  
  /**
   * ajoute une note à la table
   */
  const ajouterEnregistrement = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql("INSERT INTO notes (titre,contenu) VALUES (?,?)", [
          
          note.titre,
          note.contenu,
        ]);
      });
      
      console.log("Ajouté ", note);
    } catch (error) {
      console.log(error);
    }
  };
  const selectAll = () => {
    console.log('Starting selectAll function')
    //SELECT
    try {
      db.transaction((tx) => {
        console.log('Inside transaction callback');
        tx.executeSql("SELECT * from notes", [], (_, { rows: { _array } }) => {
          console.log("select ", JSON.stringify(_array));
          console.log('length: ', _array.length)
          setListNotes(_array);
        }); //SELECT
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ajouter = () => {
    ajouterEnregistrement();
    setVisible(false);
    setNote(noteInit);
  };
  if(listNotes.length === 0){
    return(
      <View style={styles.container}>
        
        <Text style={{ color: "#FFF", fontSize: 20 }}>{NoNoteText}</Text>
        <Text style={{color:'yellow'}}>appuyer sur le button pour ajouter une note</Text>
        <TouchableOpacity
        style={styles.ajouterButtonStyle}
        onPress={() => setVisible(true)}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>

      <NoteInterior
        noteVisible={noteVisible}
        titre={modalNote.titre}
        contenu={modalNote.contenu}
        id={modalNote.id}
        setNoteVisible={setNoteVisible}
        supprimer={deleteRecord}
      />

      <ModalNewNote
        visible={visible}
        setVisible={setVisible}
        note={note}
        setNote={setNote}
        ajouter={ajouter}
      />
      </View>
    )
  }else{
  return (
    <View style={styles.container}>
      <Text style={styles.HeaderStyle}>To Dos Note</Text>
      <Text>{listNotes.length}</Text>
       

      <NoteInterior
        noteVisible={noteVisible}
        titre={modalNote.titre}
        contenu={modalNote.contenu}
        id={modalNote.id}
        setNoteVisible={setNoteVisible}
        supprimer={deleteRecord}
      />

      <ModalNewNote
        visible={visible}
        setVisible={setVisible}
        note={note}
        setNote={setNote}
        ajouter={ajouter}
      />

      <FlatList
        data={listNotes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteOpacityStyle}
            onPress={() =>
              handleNoteOnPress({ id: item.id,titre: item.titre, contenu: item.contenu })
            }
          >
            <Text style={styles.noteText}>{item.titre}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.ajouterButtonStyle}
        onPress={() => setVisible(true)}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>

      <NoteInterior
        noteVisible={noteVisible}
        titre={modalNote.titre}
        contenu={modalNote.contenu}
        id={modalNote.id}
        setNoteVisible={setNoteVisible}
        supprimer={deleteRecord}
      />

      <ModalNewNote
        visible={visible}
        setVisible={setVisible}
        note={note}
        setNote={setNote}
        ajouter={ajouter}
      />

      <StatusBar style="auto" />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3f3f3f",
  },
  HeaderStyle: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 40,
    color: "white",
  },
  noteOpacityStyle: {
    backgroundColor: "#3f3f3f",
    width: 350,
    height: 40,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "yellow",
    margin: 5,
    borderBottomColor: "#b6c6d5",
    alignItems: "center",
  },
  noteText: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
  },
  ajouterButtonStyle: {
    margin: 15,
    backgroundColor: "#1A9BFF",
    borderRadius: 100,
    padding: 15,
  },
  ModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ModalInterior: {
    backgroundColor:'#3d3c3c',
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    height: 250,
    width: "90%",
    marginTop: 250,
    borderRadius: 25,

  },
  ModalButton: {
    padding: 5,
    margin: 10,
    borderRadius: 100,
    
  },
  ButtonText: {
    fontSize: 15,
    color: "white",
  },
  inputStyle: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#aaaaaa",

    margin: 5,
    alignItems: "center",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  modalInputs: {},

  interiorContainer: {
    backgroundColor: "#3f3f3f",
    height: "100%",
  },
  interiorContenu: {
    alignSelf: "center",
    margin: 15,
    color: "white",
  },
  interiorTitle: {
    fontSize: 30,
    alignSelf: "center",
    margin: 15,
    color: "white",
  },
});
