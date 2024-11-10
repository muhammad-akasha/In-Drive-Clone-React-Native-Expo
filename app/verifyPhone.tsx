import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import CountryPicker, { Country } from "react-native-country-picker-modal";
import AntDesign from "@expo/vector-icons/AntDesign";

const VerifyPhone = () => {
  const [number, setNumber] = useState("");
  const [country, setCountry] = useState<Country | null>(null);
  const [countryCode, setCountryCode] = useState("+92"); // Default country code for Pakistan

  const onSelectCountry = (selectedCountry: Country) => {
    setCountry(selectedCountry);
    setCountryCode(`+${selectedCountry.callingCode[0]}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1c2023]">
      <View className="mx-2 flex-1">
        <Text className="text-[28px] text-white">Join us via phone number</Text>
        <Text className="text-[#f8f8f9] text-[18px]">
          We'll text a code to verify your phone
        </Text>
        <View className="mt-4 p-3 flex-row items-center justify-center border-2 border-[#f8fafb] rounded-lg bg-[#313942]">
          <CountryPicker
            theme={{
              backgroundColor: "#1c2023", // Modal background color
              onBackgroundTextColor: "#ffffff", // Text color on the modal background
              fontSize: 16,
              fontFamily: "System",
              flagSizeButton: 20,
              filterPlaceholderTextColor: "rgb(118 124 135)",
            }}
            withFilter
            region="Asia"
            withFlag
            withCountryNameButton={false}
            withCallingCode
            countryCode={country?.cca2 || "PK"}
            preferredCountries={["PK", "IN"]}
            onSelect={onSelectCountry}
            containerButtonStyle={{ marginRight: -20 }}
          />
          <AntDesign
            name="caretdown"
            size={10}
            color="white"
            className="mx-3"
          />
          <Text className="text-[#f8fafb] text-lg">{countryCode}</Text>
          <TextInput
            className="rounded-lg text-white text-[18px] flex-1 ml-1"
            onChangeText={setNumber}
            keyboardType="numeric"
            value={number} // Only use the number input here
          />
        </View>
      </View>
      <View className="m-5">
        <TouchableOpacity
          activeOpacity={0.4}
          className="bg-[#9dd90e] p-4 rounded-lg w-full"
        >
          <Link className="text-center" href={"./codeVerify"}>
            <Text
              className="text-[#323a42] text-[20px]"
              style={{ letterSpacing: 1 }}
            >
              Next
            </Text>
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyPhone;
