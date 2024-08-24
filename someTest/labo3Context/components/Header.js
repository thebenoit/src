import { StyleSheet, View, Text } from 'react-native'
import React, { useContext } from 'react'
import { prefContext } from "../App";

const Header = ({ titre }) => {
  const [pref, setPref] = useContext(prefContext);

  return (
    <View style={styles.container}>
      <View style={styles.prefContainer}>
        <Text style={styles.prefText}>{pref.pays} {pref.langue}</Text>
      </View>
      <Text style={styles.headerText}>{titre}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative'
  },
  headerText: {
    fontSize: 30
  },
  prefContainer: {
    
  },
  prefText: {
    fontSize: 16,
    color: 'black'
  }
})

export default Header;
