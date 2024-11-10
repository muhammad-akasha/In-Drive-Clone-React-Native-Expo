import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

const CodeVerify = () => {
  const [code, setCode] = useState("");

  // Limit input to 4 characters
  const totalDots = 4;

  // Handle the input change and limit it to numbers only
  const handleInputChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, ""); // Only allow numeric input
    if (numericValue.length <= totalDots) {
      setCode(numericValue);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1c2023] pt-[100px]">
      <View>
        <Text className="text-[#f7f7ff] text-center text-3xl font-semibold">
          Enter the code
        </Text>
        <Text className="text-[#888b91] text-center mt-3">
          We have sent you a verification code to {"\n"} +923332223111
        </Text>
      </View>

      <TextInput
        style={styles.input}
        value={code}
        selectionColor="transparent"
        contextMenuHidden={true}
        selectTextOnFocus={false}
        onChangeText={handleInputChange} // Use custom handler
        keyboardType="numeric"
        className="p-3 rounded-lg" // Hide input visually
        placeholderTextColor="transparent" // Remove placeholder visibility
        maxLength={4} // Limit input to 4 characters
      />
      <View className="flex-row justify-center my-[28px] gap-[15px] mt-20">
        {Array.from({ length: totalDots }).map((_, index) => (
          <Text
            key={index}
            style={{
              fontSize: 45,
              color: code[index] ? "#fff" : "#666",
              fontWeight: 900,
              opacity: code[index] ? 1 : 0.5, // Control visibility
            }}
          >
            {code[index] || "•"} {/* Show the number or a dot */}
          </Text>
        ))}
      </View>

      <View className="mx-5 mt-2">
        <TouchableOpacity
          activeOpacity={0.4}
          className="bg-[#9dd90e] p-4 rounded-lg w-full"
          onPress={() => console.log("Requesting new code...")} // Add your logic here
        >
          <Text
            className="text-[#323a42] text-center text-[20px]"
            style={{ letterSpacing: 1 }}
          >
            Get New Code
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    position: "absolute",
    top: 180,
    left: "22%",
    width: 200,
    height: 50, // Adjust height as needed
    backgroundColor: "transparent", // Make background transparent
  },
});

export default CodeVerify;
