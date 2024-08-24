import React, { useState, useEffect } from "react";
import { Platform, View, Text, useWindowDimensions } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
  Callout,
  Circle,
  Polyline,
} from "react-native-maps";
//import boulangeries from "../commerces.json";
import * as geolib from "geolib";

const Carte = ({
  boulangeries,
  setActiver,
  activer,
  selectedMarker,
  setSelectedMarker,
}) => {
  const { height, width } = useWindowDimensions();
  const [positionDepart, setPositionDepart] = useState({
    latitude: 45.61758539673886,
    longitude: -73.8156015847305,
  });

  //const [selectedMarker, setSelectedMarker] = useState(null);

  const RegionMontreal = {
    latitude: 45.6435448,
    longitude: -73.8239533,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  };

  const handlePress = (coord, id) => {
    setPositionDepart(coord);
    //setActiver(true);
    setSelectedMarker(id); // Mettre à jour le marqueur sélectionné
    console.log("Marqueur appuyé, état activer :", activer);
  };

  const trouverLocationProche = ({ depart, destinations }) => {
    // Filtrer les destinations pour exclure 'depart'
    const filteredDestinations = destinations.filter(
      (destination) =>
        !(
          depart.latitude === destination.latitude &&
          depart.longitude === destination.longitude
        )
    );

    // Trouver la destination la plus proche parmi les destinations filtrées
    const nearestDestination = geolib.findNearest(depart, filteredDestinations);
    return nearestDestination;
  };

  const destinations = boulangeries.map((d) => d.coord);
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ height: height * 0.7, width: width }}
        provider={
          Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        initialRegion={RegionMontreal}
      >
        {boulangeries.map((d) => {
          // Utiliser la fonction pour trouver l'itinéraire le plus proche pour chaque boulangerie
          const locationProche = trouverLocationProche({
            depart: {
              latitude: d.coord.latitude,
              longitude: d.coord.longitude,
            },
            destinations,
          });
          const itineraire = [
            { latitude: d.coord.latitude, longitude: d.coord.longitude },
            locationProche,
          ];
          const isSelected = selectedMarker === d.id;

          return (
            <View key={d.id}>
              <Marker
                onPress={() =>
                  handlePress(
                    {
                      latitude: d.coord.latitude,
                      longitude: d.coord.longitude,
                    },
                    d.id
                  )
                }
                title={d.nom}
                coordinate={{
                  latitude: d.coord.latitude,
                  longitude: d.coord.longitude,
                }}
                pinColor={activer ? "green" : "red"}
              >
                <Callout>
                  <Text>{d.nom}</Text>
                </Callout>
              </Marker>

              {selectedMarker === d.id && locationProche && (
                <Polyline
                  coordinates={[
                    {
                      latitude: d.coord.latitude,
                      longitude: d.coord.longitude,
                    },
                    locationProche,
                  ]}
                  strokeColor="rgba(255, 0, 0, 1)"
                  strokeWidth={5}
                />
              )}

              <Circle
                center={{
                  latitude: d.coord.latitude,
                  longitude: d.coord.longitude,
                }}
                radius={500}
                fillColor="rgba(0, 255, 0, 0)"
                strokeColor="rgba(0, 255, 0, 1)"
                strokeWidth={1}
              />

              <Circle
                center={{
                  latitude: d.coord.latitude,
                  longitude: d.coord.longitude,
                }}
                radius={1500}
                fillColor="rgba(255, 165, 0, 0.0)" // Orange avec 50% d'opacité
                strokeColor="rgba(255, 165, 0, 1)" // Orange plein
                strokeWidth={1}
              />

              <Circle
                center={{
                  latitude: d.coord.latitude,
                  longitude: d.coord.longitude,
                }}
                radius={3000}
                fillColor="rgba(255, 0, 0, 0)" // Rouge avec 50% d'opacité
                strokeColor="rgba(255, 0, 0, 1)" // Rouge plein
                strokeWidth={1}
              />
            </View>
          );
        })}
      </MapView>
    </View>
  );
};

export default Carte;
