import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Map from "../componentfiles/Map";
import Entypo from "@expo/vector-icons/Entypo";
import ImageIconBox from "@/componentfiles/ImageIconBox";
import { RootState } from "@/config/redux/store/store";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import CommentModal from "@/componentfiles/CommentModal";
import PaymentModal from "@/componentfiles/PaymentMethod";
import RouteModal from "@/componentfiles/Route";
import OfferFareModal from "@/componentfiles/OfferFare";
import AddOfferForRide from "@/componentfiles/AddOfferForRide";

export default function Index() {
  const iconObj = [
    {
      id: "moto",
      title: "Moto",
      image: require("../assets/images/sport-bike.png"),
    },
    {
      id: "miniRide",
      title: "Mini ride",
      image: require("../assets/images/car.png"),
    },
    {
      id: "rideAC",
      title: "Ride A/C",
      image: require("../assets/images/air-conditioner.png"),
    },
    {
      id: "auto",
      title: "Auto",
      image: require("../assets/images/rikshaw.png"),
    },
    {
      id: "freight",
      title: "Freight",
      image: require("../assets/images/delivery-truck.png"),
    },
  ];
  const { currentAddress } = useSelector((state: RootState) => state.location);
  const formattedAddress = currentAddress?.formattedAddress;
  const [modalVisible, setModalVisible] = useState(false);
  const [payVisible, setPayVisible] = useState(false);
  const [routeModal, setRouteModal] = useState(false);
  const [focusStart, setFocusStarting] = useState(false);
  const [focusDestination, setFocusDestination] = useState(false);
  const [offerFare, setOfferFare] = useState(false);
  // const [mapHeight, setMapHeight] = useState(false);
  const [show, hide] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>("moto");
  const { paymentMethod } = useSelector((state: RootState) => state.location);

  const handleIconPress = (id: string) => {
    setSelectedIcon(id); // Update selected icon
  };
  // const handleMapHeight = () => {
  //   setMapHeight(true);
  //   console.log("true");
  //   setTimeout(() => {
  //     setMapHeight(false);
  //     console.log("false");
  //   }, 4000);
  // };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1c2023" />
      {modalVisible && <View style={styles.overlay} />}
      {payVisible && <View style={styles.overlay} />}
      {routeModal && <View style={styles.overlay} />}
      <CommentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <OfferFareModal offerFare={offerFare} setOfferFare={setOfferFare} />
      <PaymentModal payVisible={payVisible} setPayVisible={setPayVisible} />
      <AddOfferForRide show={show} hide={hide} />
      <RouteModal
        routeModal={routeModal}
        setRouteModal={setRouteModal}
        focusStart={focusStart}
        focusDestination={focusDestination}
        setFocusStarting={setFocusStarting}
        setFocusDestination={setFocusDestination}
      />
      {/* <Pressable
        className={`${mapHeight ? null : "flex-1"}`}
        onPress={handleMapHeight}
      > */}
      <SafeAreaView
        className={`flex-1`}
        // className={`${mapHeight ? "h-[105vh]" : "h-[55vh]"}`}
      >
        <Map />
      </SafeAreaView>
      {/* </Pressable> */}
      <View>
        <View className="relative bottom-5 w-full justify-center items-center">
          <View className="bg-[#fff9c2] absolute top-[-50px] w-[90%] rounded-lg p-3 flex-row justify-center items-center">
            <View>
              <FontAwesome name="truck" size={28} color="black" />
            </View>
            <View className="ml-6">
              <Text>
                Door-to-door freight delivery for a {"\n"} price you decide
              </Text>
            </View>
            <View>
              <Entypo name="chevron-small-right" size={24} color="black" />
            </View>
          </View>
        </View>
      </View>
      <View className="flex-[0.9] bg-[#1c2023] rounded-lg">
        <View className="w-full h-21">
          <ScrollView horizontal={true}>
            <View className="flex-row gap-2 p-3">
              {iconObj.map((icon) => (
                <ImageIconBox
                  key={icon.id}
                  image={icon.image}
                  title={icon.title}
                  iconId={icon.id}
                  selectedIcon={selectedIcon}
                  onPress={() => handleIconPress(icon.id)}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        <Pressable
          onPress={() => {
            setRouteModal(true);
            setFocusStarting(true);
          }}
          className="flex-row items-center p-3"
          style={{
            gap: 10,
            marginHorizontal: 26,
            overflow: "hidden",
          }}
        >
          <View style={styles.checkBox}>
            <View style={styles.dot}></View>
          </View>
          <Text className="text-white text-[16px] w-full">
            {formattedAddress && formattedAddress}
          </Text>
        </Pressable>
        <View className="flex-1 gap-2" style={{ marginHorizontal: 20 }}>
          <Pressable
            onPress={() => {
              setRouteModal(true);
              setFocusDestination(true);
            }}
            className="bg-[#313942] p-4 rounded-lg flex-row items-center gap-2"
          >
            <Ionicons name="search" size={20} color="white" />
            <Text
              className="text-[#8b939f] text-[18px]"
              style={{ letterSpacing: 1 }}
            >
              To
            </Text>
          </Pressable>
          <View className="bg-[#313942] p-4 rounded-lg flex-row items-center justify-between">
            <Pressable
              onPress={() => setOfferFare(true)}
              className="gap-2 flex-row"
            >
              <Text className="text-white text-[20px]">PKR</Text>
              <Text
                className="text-[#8b939f] text-[18px]"
                style={{ letterSpacing: 1 }}
              >
                Offer your fare
              </Text>
            </Pressable>
            <MaterialIcons name="edit" size={24} color="white" />
          </View>
        </View>
        <View className="flex-1 relative items-center justify-center gap-4 flex-row mt-10">
          <FontAwesome
            onPress={() => setPayVisible(true)}
            name="money"
            size={24}
            color="#9dd90e"
          />
          <TouchableOpacity
            activeOpacity={0.4}
            className="bg-[#9dd90e] justify-center rounded-lg w-[220px] h-[45px]"
          >
            <Text
              onPress={() => hide(!show)}
              className="text-center text-[#323d32] text-[20px]"
              style={{ letterSpacing: 1 }}
            >
              Find a driver
            </Text>
          </TouchableOpacity>
          <FontAwesome
            onPress={() => setModalVisible(true)}
            name="comments-o"
            size={24}
            color="#fff"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  checkBox: {
    width: 14,
    height: 14,
    borderRadius: 7, // Inner circle
    backgroundColor: "#9dd90e",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4, // Inner circle
    backgroundColor: "#000",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fills the entire container
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black to reduce brightness
    zIndex: 2,
  },
});
