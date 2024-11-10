import {
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

interface ImagePo {
  image: ImageSourcePropType;
  title: string;
  iconId: string;
  selectedIcon: string | null;
  onPress: () => void;
}

const ImageIconBox = ({
  image,
  title,
  iconId,
  selectedIcon,
  onPress,
}: ImagePo) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={onPress}
      style={[
        styles.iconBox,
        {
          backgroundColor: selectedIcon === iconId ? "#0c4669" : "transparent", // Conditional background color
          width: selectedIcon === iconId ? 80 : 70,
        },
      ]}
    >
      {selectedIcon === iconId && (
        <AntDesign
          style={{ position: "absolute", right: 8, top: 8 }}
          name="exclamationcircleo"
          size={19}
          color="#7ab8f8"
        />
      )}
      <Image style={styles.iconImage} source={image} />
      <Text style={styles.iconText}>{title}</Text>
    </TouchableOpacity>
  );
};
export default ImageIconBox;

const styles = StyleSheet.create({
  iconBox: {
    height: 60,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 10,
    padding: 12,
    paddingVertical: 20,
  },
  iconImage: {
    width: 35,
    height: 35,
  },
  iconText: {
    color: "#fff",
    fontSize: 11,
  },
});
