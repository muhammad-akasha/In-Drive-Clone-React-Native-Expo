import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "@/config/redux/store/store";
import { useSelector } from "react-redux";

interface LocationDestinationBtnProps {
  setRouteModal: (value: boolean) => void;
  setFocusDestination: (value: boolean) => void;
  setFocusStarting: (value: boolean) => void;
}

const LocationDestinationBtn: React.FC<LocationDestinationBtnProps> = ({
  setRouteModal,
  setFocusDestination,
  setFocusStarting,
}) => {
  const { currentAddress } = useSelector((state: RootState) => state.location);
  const formattedAddress = currentAddress?.formattedAddress;

  return (
    <View>
      <Pressable
        onPress={() => {
          setRouteModal(true);
          setFocusStarting(true);
        }}
        className="flex-row items-center p-2"
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
      <View className="gap-3" style={{ marginHorizontal: 10, marginTop: 7 }}>
        <Pressable
          onPress={() => {
            setRouteModal(true);
            setFocusDestination(true);
          }}
          className="p-4 rounded-lg flex-row items-center gap-2"
        >
          <Ionicons name="search" size={20} color="white" />
          <Text
            className="text-[18px]"
            style={{ letterSpacing: 1, color: "#8b939f" }}
          >
            To
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 10,
  },
  checkBox: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#9dd90e",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#000",
  },
  formattedAddress: {
    color: "white",
    fontSize: 16,
    flex: 1,
  },
  destinationContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  destinationButton: {
    backgroundColor: "#313942",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  toText: {
    color: "#8b939f",
    fontSize: 18,
    letterSpacing: 1,
  },
});

export default LocationDestinationBtn;
