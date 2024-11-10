import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useRef, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import CashAndSwitch from "./CashAndSwitch";
import LocationDestinationBtn from "./LocationDestinationBtn";
import FindDriverBtn from "./FindDriverBtn";
import PaymentModal from "./PaymentMethod";
import CommentModal from "./CommentModal";
import RouteModal from "./Route";
import { useSelector } from "react-redux";
import { RootState } from "@/config/redux/store/store";

interface ShowHide {
  show: boolean;
  hide: (show: boolean) => void;
}

const AddOfferForRide = ({ show, hide }: ShowHide) => {
  const priceRef = useRef<TextInput | null>(null);
  const [price, setPrice] = useState("");
  const [routeModal, setRouteModal] = useState(false);
  const [focusStart, setFocusStarting] = useState(false);
  const [focusDestination, setFocusDestination] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [payVisible, setPayVisible] = useState(false);
  const { paymentMethod } = useSelector((state: RootState) => state.location);

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, "");
    if (numericValue.length <= 5) {
      setPrice(numericValue);
    }
  };

  const handleFocus = () => {
    setTimeout(() => {
      priceRef.current?.focus();
    }, 100);
  };

  return (
    <>
      <CommentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <RouteModal
        setRouteModal={setRouteModal}
        routeModal={routeModal}
        focusDestination={focusDestination}
        focusStart={focusStart}
        setFocusDestination={setFocusDestination}
        setFocusStarting={setFocusStarting}
      />
      <PaymentModal payVisible={payVisible} setPayVisible={setPayVisible} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => hide(!show)}
      >
        <View style={styles.centeredView}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.modalText}>Offer your fare</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => hide(!show)}
              >
                <FontAwesome6 name="xmark" size={20} color="#fff" />
              </Pressable>
            </View>
            <Pressable onPress={handleFocus} style={styles.txtInp}>
              <View style={styles.flex}>
                <Text style={styles.currencyText}>PKR</Text>
                <TextInput
                  ref={priceRef}
                  value={price}
                  onChangeText={handlePriceChange}
                  style={styles.priceInput}
                  keyboardType="numeric"
                  maxLength={5}
                  placeholderTextColor="#9398a2"
                />
              </View>
            </Pressable>
          </View>

          <View
            style={[
              styles.section,
              { borderTopRightRadius: 30, borderTopLeftRadius: 30 },
            ]}
          >
            <CashAndSwitch
              price={price}
              setPayVisible={setPayVisible}
              paymentMethod={paymentMethod}
            />
          </View>

          <View style={[styles.section, { flex: 1 }]}>
            <LocationDestinationBtn
              setRouteModal={setRouteModal}
              setFocusDestination={setFocusDestination}
              setFocusStarting={setFocusStarting}
            />
            <View style={styles.spacer} />
            <View style={styles.findDriverContainer}>
              <FindDriverBtn setModalVisible={setModalVisible} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "#313332",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  header: {
    paddingTop: 20,
    backgroundColor: "#222423",
    height: 165,
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
  },
  headerContent: {
    justifyContent: "center",
    flexDirection: "row",
    position: "relative",
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
    left: 15,
    top: 15,
  },
  modalText: {
    marginTop: 17,
    marginBottom: 15,
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 1,
  },
  txtInp: {
    padding: 2,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#fff",
    width: "92%",
    borderBottomWidth: 2,
    borderColor: "#fff",
    marginLeft: "auto",
    marginRight: "auto",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  currencyText: {
    color: "#d3d3d3",
    fontSize: 55,
    marginRight: 10,
  },
  priceInput: {
    color: "#fff",
    fontSize: 50,
    minWidth: 200,
  },
  section: {
    marginTop: 5,
    borderRadius: 30,

    backgroundColor: "#222423",
    paddingVertical: 15,
  },
  spacer: {
    flexGrow: 1,
  },
  findDriverContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default AddOfferForRide;
