import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const FindDriverBtn = ({ setModalVisible }: any) => {
  return (
    <View>
      <View className="items-center justify-center gap-3 flex-row mt-10">
        <TouchableOpacity
          activeOpacity={0.4}
          style={{
            backgroundColor: "#9dd90e",
            width: 280,
            borderRadius: 5,
            padding: 10,
          }}
        >
          <Text
            className="text-center text-[#323d32] text-[20px]"
            style={{ letterSpacing: 1, color: "white" }}
          >
            Find a driver
          </Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#9dd90e",
            borderRadius: 5,
            padding: 10,
          }}
        >
          <FontAwesome
            onPress={() => setModalVisible(true)}
            name="comments-o"
            size={24}
            color="#000"
          />
        </View>
      </View>
    </View>
  );
};

export default FindDriverBtn;
