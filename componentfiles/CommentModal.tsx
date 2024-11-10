import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

const CommentModal = ({ modalVisible, setModalVisible }) => {
  const textInputRef = useRef<TextInput | null>(null);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onShow={() => {
        setTimeout(() => {
          textInputRef.current?.focus();
        }, 100); // Adjust delay if needed
      }}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View className="justify-center flex-row">
          <Text style={styles.modalText}>Additional info</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <FontAwesome6 name="xmark" size={20} color="#fff" />
          </Pressable>
        </View>
        <View className="mx-5" style={{ marginTop: 20 }}>
          <TextInput
            style={styles.txtInp}
            ref={textInputRef}
            placeholder="Comments"
            placeholderTextColor={"#9398a2"}
          />
          <View className="gap-5 mt-5">
            <TouchableOpacity
              activeOpacity={0.4}
              className="bg-[#9dd90e] p-4 rounded-lg"
            >
              <Text
                className="text-center text-[#323d32] text-[20px]"
                style={{ letterSpacing: 1 }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "#1c2023",
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
    position: "absolute",
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

export default CommentModal;
