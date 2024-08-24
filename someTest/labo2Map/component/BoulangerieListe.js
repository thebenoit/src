import { StyleSheet,View, Text,FlatList,Pressable,useWindowDimensions } from 'react-native'
import React from 'react'

const BoulangerieListe = ({data,setActiver,activer,selectedMarker,setSelectedMarker}) => {
  const { height, width } = useWindowDimensions();
  console.log("2: ",selectedMarker)
  return (
<View style={{ height: height * 0.3, width: width }}>
<FlatList
    
    data={data}
    keyExtractor={item => item.id.toString()} // Assurez-vous que id est toujours une string
    renderItem={({item}) => (
      <Pressable 
      style={[styles.buttonStyle,item.id === selectedMarker && styles.selectedButtonStyle]}
      onPress={() =>setSelectedMarker(item.id) }
      >
        <Text style={styles.textStyle}>{item.nom}</Text>
      </Pressable>
    )}
  />
  
</View>
   
  );
}

    
   

const styles = StyleSheet.create ({
    container: {
     

    },
    selectedButtonStyle: {
      backgroundColor: "hsl(48, 100%, 50%)", // Changez la couleur pour le bouton sélectionné
    },

    buttonStyle: {
        backgroundColor: "hsl(38, 100%, 50%)",
        padding : 8,
        margin : 5,
        borderRadius: 10,
       
      

    },

    textStyle: {
        color:  'white',
        fontSize: 15,
        fontWeight: 'bold'

    }

})

export default BoulangerieListe