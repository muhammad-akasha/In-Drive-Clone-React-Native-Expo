import { setPaymentMethod } from "@/config/redux/reducers/locationSlice";
import { RootState } from "@/config/redux/store/store";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface modalType {
  payVisible: boolean;
  setPayVisible: Function;
}

const PaymentModal = ({ payVisible, setPayVisible }: modalType) => {
  const [index, setIndex] = useState(0);
  const { paymentMethod } = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={payVisible}
      onRequestClose={() => {
        setPayVisible(!payVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View className="justify-center flex-row">
          <Text style={styles.modalText}>Payment methods</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setPayVisible(!payVisible)}
          >
            <FontAwesome6 name="xmark" size={20} color="#fff" />
          </Pressable>
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            className="justify-between flex-row items-center"
            style={{
              paddingHorizontal: 10,
              backgroundColor: index === 0 ? "#0c4669" : "transparent",
            }}
          >
            <Pressable
              className="flex-row items-center w-[90%] p-3 gap-4"
              onPress={() => {
                dispatch(setPaymentMethod({ paymentMethod: "Cash" }));
                setPayVisible(!payVisible);
              }}
            >
              <FontAwesome name="money" size={24} color="#9dd90e" />
              <Text
                className="text-[16px]"
                style={{ letterSpacing: 1, color: "#fff" }}
              >
                Cash
              </Text>
            </Pressable>
            {index === 0 && (
              <Ionicons name="checkmark" size={24} color="#fff" />
            )}
          </View>
          <View
            className="justify-between flex-row items-center"
            style={{
              paddingHorizontal: 10,
              backgroundColor: index === 1 ? "#0c4669" : "transparent",
            }}
          >
            <Pressable
              className="flex-row items-center w-[90%] p-3 gap-4"
              onPress={() => {
                dispatch(setPaymentMethod({ paymentMethod: "JazzCash" }));
                setPayVisible(!payVisible);
              }}
            >
              <MaterialCommunityIcons
                name="account-cash-outline"
                size={24}
                color="#9dd90e"
              />
              <Text
                className="text-[16px]"
                style={{ letterSpacing: 1, color: "#fff" }}
              >
                JazzCash
              </Text>
            </Pressable>
            {index === 1 && (
              <Ionicons name="checkmark" size={24} color="#fff" />
            )}
          </View>
          <View
            className="justify-between flex-row items-center"
            style={{
              paddingHorizontal: 10,
              backgroundColor: index === 2 ? "#0c4669" : "transparent",
            }}
          >
            <Pressable
              className="flex-row items-center w-[90%] p-3 gap-4"
              onPress={() => {
                dispatch(setPaymentMethod({ paymentMethod: "EasyPaisa" }));
                setPayVisible(!payVisible);
              }}
            >
              <MaterialCommunityIcons
                name="account-cash-outline"
                size={24}
                color="#9dd90e"
              />
              <Text
                className="text-[16px]"
                style={{ letterSpacing: 1, color: "#fff" }}
              >
                EasyPaisa
              </Text>
            </Pressable>
            {index === 2 && (
              <Ionicons name="checkmark" size={24} color="#fff" />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "#000",
    height: 270,
    bottom: 0,
    position: "absolute",
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    width: "100%",
  },
  button: {
    width: 30,
    height: 30,
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
    color: "#7c8390",
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
    backgroundColor: "#313942",
    borderWidth: 2,
    borderColor: "#fff",
    height: 110,
    borderRadius: 7,
    padding: 15,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#fff",
  },
});

export default PaymentModal;
