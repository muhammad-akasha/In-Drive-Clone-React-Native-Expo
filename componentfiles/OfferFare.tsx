import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  StatusBar,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CashAndSwitch from "./CashAndSwitch";

interface modalType {
  offerFare: boolean;
  setOfferFare: Function;
}

const OfferFareModal = ({ offerFare, setOfferFare }: modalType) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const priceRef = useRef<TextInput | null>(null);
  const [price, setPrice] = useState("");
  const [payVisible, setPayVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handlePriceChange = (value: string) => {
    // Remove any non-numeric characters from the input (except for PKR prefix)
    const numericValue = value.replace(/[^\d]/g, "");
    // Limit the input to 5 digits
    if (numericValue.length <= 5) {
      setPrice(numericValue);
    }
  };

  function handleFocus() {
    setTimeout(() => {
      priceRef.current?.focus();
    }, 100);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onShow={() => {
        setTimeout(() => {
          handleFocus();
        }, 100); // Adjust delay if needed
      }}
      visible={offerFare}
      onRequestClose={() => {
        setOfferFare(!offerFare);
      }}
    >
      <View style={styles.centeredView}>
        <View className="justify-center flex-row">
          <Text style={styles.modalText}>Offer your fare</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setOfferFare(!offerFare)}
          >
            <FontAwesome6 name="xmark" size={20} color="#fff" />
          </Pressable>
        </View>
        <View style={{ marginTop: 25 }}>
          <Pressable onPress={handleFocus} style={[styles.txtInp]}>
            <View style={styles.flex}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 55,
                  marginRight: 10, // Space between "PKR" and input
                }}
              >
                PKR
              </Text>
              <TextInput
                ref={priceRef}
                value={price}
                onChangeText={handlePriceChange}
                style={{
                  color: "#fff",
                  fontSize: 50,
                  textAlign: "left", // Center text within the input
                  maxWidth: 200,
                }}
                keyboardType="numeric"
                maxLength={5}
                placeholderTextColor={"#9398a2"}
              />
            </View>
          </Pressable>
        </View>
        <View
          className="justify-between flex-row items-center"
          style={{
            paddingHorizontal: 10,
            backgroundColor: "transparent",
            marginTop: 30,
          }}
        >
          <Pressable className="flex-row items-center p-3 gap-4">
            <MaterialIcons name="discount" size={24} color="#fff" />
            <Text
              className="text-[16px]"
              style={{ letterSpacing: 1, color: "#fff" }}
            >
              Promo code
            </Text>
          </Pressable>

          <AntDesign name="right" size={18} color="#fff" />
        </View>
        <CashAndSwitch
          price={price}
          setPayVisible={setPayVisible}
          paymentMethod={paymentMethod}
        />
        <TouchableOpacity
          activeOpacity={0.4}
          style={{
            backgroundColor: "#9dd90e",
            borderRadius: 7,
            padding: 14,
            marginHorizontal: 20,
            marginTop: 15,
          }}
        >
          <Text
            className="text-center text-[#323d32] text-[20px]"
            style={{ letterSpacing: 1 }}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
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
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    backgroundColor: "#1c2023",
    height: 425,
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
    position: "absolute",
    right: 15,
    top: 15,
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginTop: 17,
    marginBottom: 15,
    textAlign: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 17,
    letterSpacing: 1,
  },
  txtInp: {
    borderBottomWidth: 2,
    borderColor: "#313942",
    color: "#fff",
    marginHorizontal: 52,
  },
});

export default OfferFareModal;
