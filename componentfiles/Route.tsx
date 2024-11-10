import { setTheDestination } from "@/config/redux/reducers/locationSlice";
import { RootState } from "@/config/redux/store/store";
import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  StatusBar,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface modalType {
  routeModal: boolean;
  setRouteModal: Function;
  focusStart: boolean;
  focusDestination: boolean;
  setFocusStarting: Function;
  setFocusDestination: Function;
}

interface PlacePrediction {
  description: string;
  place_id: string;
  // Add any additional fields you need from the API response.
}

const RouteModal = ({
  routeModal,
  setRouteModal,
  focusStart,
  focusDestination,
  setFocusStarting,
  setFocusDestination,
}: modalType) => {
  const dispatch = useDispatch();
  const { currentAddress, latitude, longitude } = useSelector(
    (state: RootState) => state.location
  );
  const address = currentAddress?.formattedAddress.split(",");
  const refToLocation = useRef<TextInput | null>(null);
  const refFromLocation = useRef<TextInput | null>(null);
  const [currLocation, setCurrLocation] = useState<string>();
  const [destinationText, setDestinationText] = useState<string>();
  const [places, setPlaces] = useState<null | PlacePrediction[]>();
  const [placesWithDistance, setPlacesWithDistance] = useState<any>();

  const decodePolyline = (encoded: any) => {
    let points = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;

  const getLocation = async (text: string) => {
    if (!text) return;
    setTimeout(async () => {
      try {
        const response = await fetch(
          `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${text}&key=${apiKey}`
        );
        const res = await response.json();

        if (res && res.predictions && res.predictions.length > 0) {
          console.log("Predictions:", res.predictions);
          setPlaces(res.predictions as PlacePrediction[]);

          // Array to store distance results for each prediction
          const distanceResults = await Promise.all(
            res.predictions.map(async (prediction: PlacePrediction) => {
              const mainText = prediction.structured_formatting.main_text;

              // Fetch distance matrix for each prediction
              const distanceResponse = await fetch(
                `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${
                  address && address[0]
                }&origins=${mainText}&key=${apiKey}`
              );
              const distanceData = await distanceResponse.json();
              return {
                prediction,
                distanceData,
              };
            })
          );
          // set state with the full distance results for each prediction
          setPlacesWithDistance(distanceResults);
        } else {
          Alert.alert("No Place Found!");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }, 1000);
  };

  // Handle text input change
  const handleChangeText = (text: string) => {
    setDestinationText(text);
    if (text.length > 2) {
      // Fetch only when the user has typed more than 2 characters
      getLocation(text);
    } else {
      setPlaces(null);
    }
  };
  const getDirection = async (text: string) => {
    setDestinationText(text);
    if (currLocation && text) {
      fetch(
        `https://maps.gomaps.pro/maps/api/directions/json?destination=${text}&origin=${latitude},${longitude}&key=${apiKey}`
      )
        .then((response) => response.json()) // Parse JSON response
        .then((data) => {
          console.log(data); // Log full data for debugging

          // Check if the response was successful
          if (data.status === "OK") {
            const route = data.routes[0];

            // Extract the polyline points for the route
            const polyline = route.overview_polyline.points;
            const decodedPoints = decodePolyline(polyline);

            // Extract destination latitude and longitude
            const destinationLat = route.legs[0].end_location.lat;
            const destinationLng = route.legs[0].end_location.lng;

            // Dispatch the route and destination coordinates
            dispatch(
              setTheDestination({
                latitude: destinationLat,
                longitude: destinationLng,
                route: decodedPoints,
              })
            );
            setRouteModal(false);
          } else {
            console.error("Error getting directions:", data.status);
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      Alert.alert("Please enter Locations");
    }
  };

  useEffect(() => {
    setCurrLocation(address && address[0]);
  }, [routeModal]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onShow={() => {
        setTimeout(() => {
          if (focusStart) {
            refToLocation.current?.focus();
            console.log("one");
          } else {
            refFromLocation.current?.focus();
            console.log("two");
          }
        }, 100); // Adjust delay if needed
      }}
      visible={routeModal}
      onRequestClose={() => {
        setRouteModal(!routeModal);
        setFocusDestination(false);
        setFocusStarting(false);
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1c2023" />
      <View style={styles.centeredView}>
        <View className="justify-center flex-row">
          <Text style={styles.modalText}>Enter your route</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setRouteModal(!routeModal)}
          >
            <FontAwesome6 name="xmark" size={20} color="#fff" />
          </Pressable>
        </View>
        <View className="mx-5 gap-4" style={{ marginTop: 25 }}>
          <Pressable
            style={[
              styles.txtInp,
              focusStart
                ? { borderWidth: 2, borderColor: "#fff" }
                : { borderWidth: 0, borderColor: "transparent" },
            ]}
            className="flex-row gap-3 items-center"
          >
            <Entypo name="magnifying-glass" size={22} color="white" />
            <TextInput
              value={currLocation}
              onChangeText={setCurrLocation}
              ref={refToLocation}
              style={{ color: "#fff", fontSize: 18, width: "100%" }}
              placeholder="From"
              placeholderTextColor={"#9398a2"}
              returnKeyType="done"
              onPress={() => {
                setFocusStarting(true);
                setFocusDestination(false);
              }}
            />
          </Pressable>

          <Pressable
            style={[
              styles.txtInp,
              focusDestination
                ? { borderWidth: 2, borderColor: "#fff" }
                : { borderWidth: 0, borderColor: "transparent" },
            ]}
            className="flex-row gap-3 items-center"
          >
            <Entypo name="magnifying-glass" size={24} color="white" />
            <TextInput
              value={destinationText}
              onChangeText={handleChangeText}
              ref={refFromLocation}
              style={{ color: "#fff", fontSize: 18, width: "100%" }}
              placeholder="To"
              placeholderTextColor={"#9398a2"}
              onPress={() => {
                setFocusDestination(true);
                setFocusStarting(false);
              }}
            />
          </Pressable>
          <View className="flex-row gap-5 mt-5 items-center">
            <Entypo name="location" size={24} color="rgb(118 170 224)" />
            <Text style={{ color: "rgb(118 170 224)", fontSize: 15 }}>
              search on Map
            </Text>
          </View>
          {placesWithDistance && (
            <FlatList
              style={{ marginBottom: 20 }}
              data={placesWithDistance}
              renderItem={({ item }) => {
                const { prediction, distanceData } = item;
                const mainText = prediction.structured_formatting.main_text;
                const secondaryText =
                  prediction.structured_formatting.secondary_text;
                const distance =
                  distanceData?.rows[0]?.elements[0]?.distance?.text || "N/A";

                return (
                  <ScrollView style={{ paddingVertical: 10 }}>
                    <View className="flex-row justify-between items-start">
                      <View className="flex-row gap-3">
                        <View style={{ marginTop: 3 }}>
                          <Ionicons
                            name="location-outline"
                            size={24}
                            color="#9c978c"
                          />
                        </View>
                        <Pressable
                          onPress={() => getDirection(mainText)}
                          className="gap-1"
                        >
                          <Text className="text-white text-[16px]">
                            {mainText}
                          </Text>
                          <Text
                            className="text-[12px]"
                            style={{ color: "#9c978c", width: 230 }}
                          >
                            {secondaryText}
                          </Text>
                        </Pressable>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: "#9c978c",
                          }}
                        >
                          {distance}
                        </Text>
                      </View>
                    </View>
                  </ScrollView>
                );
              }}
              keyExtractor={(item) => item.prediction.place_id}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "#1c2023",
    height: "100%",
    width: "100%",
  },
  button: {
    width: 30,
    height: "auto",
    borderRadius: 15,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#323842",
    right: 15,
    top: 15,
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 17,
    letterSpacing: 1,
  },
  txtInp: {
    backgroundColor: "#313942",
    height: "auto",
    borderRadius: 7,
    paddingHorizontal: 15,
    fontSize: 10,
    color: "#fff",
  },
});

export default RouteModal;
