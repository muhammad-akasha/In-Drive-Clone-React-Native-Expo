import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import Octicons from "@expo/vector-icons/Octicons";
import { Link, useNavigation } from "expo-router";

const Login = () => {
  const [currentPage, setCurrentPage] = useState(0); // State to track the current page
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("verifyPhone"); // Replace with your target screen
  };
  const handlePageChange = (e: { nativeEvent: { position: number } }) => {
    setCurrentPage(e.nativeEvent.position); // Update current page on change
  };
  return (
    <SafeAreaView className="flex-1 bg-[#181717f1]">
      {/* Header */}
      <SafeAreaView className="mx-auto flex-row items-center gap-2 mt-3">
        <Image
          className="w-7 h-7 rounded-lg"
          source={require("../assets/images/logo.webp")}
        />
        <Text className="text-[#fdfeff] font-semibold text-xl">inDrive</Text>
      </SafeAreaView>

      {/* PagerView */}
      <PagerView
        style={{ height: 390 }}
        initialPage={0}
        onPageSelected={handlePageChange} // Track page changes
      >
        {/* First Page */}
        <View key="1" className="flex-1 justify-center items-center">
          <View className="w-[220px] h-[220px] bg-[#181717f1] rounded-lg overflow-hidden mx-auto mt-[30px]">
            <Image
              source={require("../assets/images/intercity.webp")}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white text-center text-[27px] mt-5 mx-[14px] font-[700]">
            App where you set the price
          </Text>
          <Text className="text-white text-center text-xl mt-2">
            Find the best offers from drivers,{"\n"} passengers and more
          </Text>
        </View>

        {/* Second Page */}
        <View key="2" className="flex-1 justify-center items-center">
          <View className="w-[220px] h-[220px] bg-[#181717f1] rounded-lg overflow-hidden mx-auto mt-[30px]">
            <Image
              source={require("../assets/images/freight.webp")}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white text-center text-[27px] mt-5 mx-[14px] font-semibold">
            Your safety is our priority
          </Text>
          <Text className="text-[#f2f4f4] text-center text-xl mt-2">
            Only verified service providers{"\n"} Choose yours by rating and
            other info
          </Text>
        </View>
      </PagerView>

      {/* Dot Indicators */}
      <View className="flex-row justify-center my-[28px] gap-[7px]">
        <Octicons
          name="dot-fill"
          size={15}
          color={currentPage === 0 ? "white" : "#666"}
        />
        <Octicons
          name="dot-fill"
          size={15}
          color={currentPage === 1 ? "white" : "#666"}
        />
      </View>

      {/* Action Buttons */}
      <View className="mx-5 gap-5">
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.4}
          className="bg-[#9dd90e] p-4 rounded-lg"
        >
          <Text
            className="text-center text-[#323d32] text-[20px]"
            style={{ letterSpacing: 1 }}
          >
            Continue with phone
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.4}
          className="bg-[#313942] p-4 rounded-lg"
        >
          <View className="flex flex-row items-center justify-center gap-3">
            <Image
              className="w-6 h-6"
              source={require("../assets/images/google.png")}
            />
            <Text
              className="text-center text-[20px] text-[#f2f2f5]"
              style={{ letterSpacing: 1 }}
            >
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Terms of Use */}
      <View className="mx-[20px] mt-3">
        <Text className="text-[#8a8f99] text-center text-[12.5px]">
          Joining our app means you agree with our{" "}
          <Text className="underline">Terms of Use</Text> and{" "}
          <Text className="underline">Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
