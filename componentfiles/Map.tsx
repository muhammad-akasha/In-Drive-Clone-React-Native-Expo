import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import CurrLocation from "./CurrLocation";
import { LocationGeocodedAddress, LocationObject } from "expo-location";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { RootState } from "@/config/redux/store/store";

const mapStyle = [
  // General background color of the map
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#463b2b", // Dark brown background for the map
      },
    ],
  },

  // Icon visibility on labels (e.g., place icons)
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on", // Ensures icons are visible
      },
    ],
  },

  // Text color for labels
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#808489", // Gray color for label text
      },
    ],
  },

  // Stroke color for label text
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#000000", // Black outline for label text
      },
    ],
  },

  // Administrative boundaries (e.g., state or region borders)
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff", // White color for administrative borders
      },
    ],
  },

  // Country borders
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      { color: "#000" }, // Black stroke for country borders
      { weight: 1.5 }, // Thickness of country borders
    ],
  },

  // Localities (e.g., city names) text color
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#d4d4d4" }, // Light gray for locality names
    ],
  },

  // Water bodies (e.g., rivers, lakes, seas)
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      { color: "#2e5975" }, // Dark blue-gray color for water areas
    ],
  },

  // Text color for water labels
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#769b9b" }, // Muted blue for water labels
    ],
  },

  // General road color
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { color: "#3c4a57" }, // Dark blue-gray for roads
    ],
  },

  // Highways (main roads) color
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      { color: "#3b3b3b" }, // Darker shade for highways
    ],
  },

  // Stroke color for highways
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      { color: "#282828" }, // Black stroke for highways
      { weight: 1 }, // Thickness of highway stroke
    ],
  },

  // Points of Interest (e.g., landmarks, museums)
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      { color: "#2b2b2b" }, // Dark gray for POI areas
    ],
  },

  // Park areas
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      { color: "#274632" }, // Dark greenish teal for park areas
    ],
  },

  // Text color for park labels
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#6b9a76" }, // Green for park labels
    ],
  },

  // Man-made landscapes (e.g., buildings, structures)
  {
    featureType: "landscape.man_made",
    elementType: "geometry",
    stylers: [
      { color: "#1d1e20" }, // Dark gray for man-made areas
    ],
  },

  // Natural landscapes (e.g., forests, mountains)
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      { color: "#2c2c2e" }, // Dark gray for natural areas
    ],
  },
];

export default function Map() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  null;
  const { latitude, longitude, destinationLat, destinationLon, route } =
    useSelector((state: RootState) => state.location);

  return (
    <View style={styles.container}>
      <CurrLocation setErrorMsg={setErrorMsg} />
      {longitude && latitude ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          />
          {destinationLat && destinationLon && (
            <Marker
              coordinate={{
                latitude: destinationLat,
                longitude: destinationLon,
              }}
            />
          )}
          {route && (
            <Polyline
              coordinates={route}
              strokeColor="#2cdce6" // Red color for the route line
              strokeWidth={4}
            />
          )}
        </MapView>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            {errorMsg || "Fetching location..."}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  messageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  messageText: {
    fontSize: 18,
    textAlign: "center",
  },
});
