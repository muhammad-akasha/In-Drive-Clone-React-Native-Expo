import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Switch } from "react-native-gesture-handler";

const CashAndSwitch = ({ price, setPayVisible, paymentMethod }: any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View>
      <View
        className="justify-between flex-row items-center"
        style={{
          paddingHorizontal: 10,
          backgroundColor: "transparent",
        }}
      >
        <Pressable
          onPress={() => setPayVisible(true)}
          className="flex-row items-center w-[90%] p-3 gap-4"
        >
          <FontAwesome name="money" size={24} color="#9dd90e" />

          <Text
            className="text-[16px]"
            style={{ letterSpacing: 1, color: "#fff" }}
          >
            {paymentMethod}
          </Text>
        </Pressable>

        <AntDesign name="right" size={18} color="#fff" />
      </View>
      <View
        className="justify-between flex-row items-center"
        style={{
          paddingHorizontal: 10,
          backgroundColor: "transparent",
        }}
      >
        <Pressable className="flex-row items-center w-[90%] p-3 gap-4">
          <MaterialIcons name="style" size={24} color="#fff" />
          <Text
            className="text-[16px]"
            style={{ letterSpacing: 1, color: "#fff" }}
          >
            Automatic accept the {"\n"}nearest driver for{" "}
            {price ? `PKR${price}` : "your fare"}
          </Text>
        </Pressable>

        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: "#636e7a", true: "#9dd90e" }}
            thumbColor={"#000"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 70, // Set width of the track
    height: 40, // Set height of the track
    justifyContent: "center", // Center the Switch within the container
    position: "relative",
    right: 35,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], // Scale to increase size
  },
});
export default CashAndSwitch;
