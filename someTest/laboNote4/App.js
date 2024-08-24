import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Modal, TouchableOpacity,FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { AntDesign } from '@expo/vector-icons';

const initialNewNote = { titre: "", contenu: "" };
const db = SQLite.openDatabaseAsync("notes");

console.log('db: ',db);

// 4 requêtes
const createTable = async () => {const response = await db.execAsync("CREATE TABLE IF NOT EXISTS " +
  "notes (id INTEGER PRIMARY KEY AUTOINCREMENT, titre TEXT, contenu INTEGER);" )}

const ajouterEnregistrement = async (note) => {
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

const selectAll = async (setListNotes) => {
  const statement = await db.prepareAsync('SELECT * FROM notes');
    try {
      let result = await statement.executeAsync();
      setListNotes(result)
        console.log("SelectAll ", result); 
    } catch (error) {
        console.log(error);
    }
};

const deleteNote = async (id) => {

  try{
    let result = (await db).runAsync('DELETE FROM notes WHERE id = $value',{$value: id})
    if( result.rowsAffected >0) {
      console.log("Supprimé ",studentId);
    } else
     console.log("Record non supprimé ",studentId);
  }
  catch(error){
    console.log(error);


  }
  
};

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

const NoteInterior = ({ setNoteVisible, noteVisible, titre, contenu, id, supprimer }) => {
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

  useEffect(()=>{
    createTable();
  })
  useEffect(() => {
    afficherListe()
  }, [listNotes]);

  const ajouter = () => {
    ajouterEnregistrement()
      .then(() => setVisible(false))
      .then(() =>setNote(initialNewNote))  
      .catch((error) => console.error("erreur lors de l'ajout: ",error))
  };

  const afficherListe = () =>{
    selectAll(setListNotes);
  }
  const supprimer = (id) => {
    deleteNote(id)
      
  };

  return (
    <View style={styles.container}>
      <Text style={styles.HeaderStyle}>To Dos Note</Text>
      <Text style={{ color: "#FFF", fontSize: 20 }}>{NoNoteText}</Text>
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
        supprimer={supprimer}
      />

      <ModalNewNote
        visible={visible}
        setVisible={setVisible}
        note={note}
        setNote={setNote}
        ajouter={ajouter}
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
