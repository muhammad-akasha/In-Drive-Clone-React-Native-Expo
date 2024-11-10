import { Stack } from "expo-router";
import "../global.css";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, View } from "react-native";
import { Provider } from "react-redux";
import store from "../config/redux/store/store";

export default function RootLayout() {
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change this based on your authentication logic

  useEffect(() => {
    async function sys() {
      await SystemUI.setBackgroundColorAsync("#1c2023");
    }
    sys();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {isLoggedIn ? (
          // Render Drawer for logged-in users
          <Drawer
            screenOptions={({ navigation }) => ({
              headerTransparent: true,
              headerLeft: () => (
                <Pressable onPress={navigation.toggleDrawer}>
                  <View className="w-[35px] h-[35px] justify-center items-center rounded-full bg-[#3b3c3d] ml-3">
                    <Entypo name="menu" size={24} color="white" />
                  </View>
                </Pressable>
              ),
              headerRight: () => (
                <Pressable onPress={navigation.toggleDrawer}>
                  <View className="w-[35px] h-[35px] justify-center items-center rounded-full bg-[#3b3c3d] mr-5">
                    <MaterialCommunityIcons
                      name="share-outline"
                      size={30}
                      color="white"
                    />
                  </View>
                </Pressable>
              ),
            })}
          >
            <Drawer.Screen
              name="index" // Adjust this to your home screen path
              options={{
                drawerLabel: "Home",
                title: "",
                headerStyle: {
                  backgroundColor: "transparent",
                },
              }}
            />
          </Drawer>
        ) : (
          // Render Stack for authentication screens only when not logged in
          <Stack>
            <Stack.Screen
              name="login" // Ensure this path is correct
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="verifyPhone"
              options={{
                headerTitle: "",
                headerTintColor: "#fffeff",
                headerStyle: { backgroundColor: "#1c2023" },
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="codeVerify"
              options={{
                headerTitle: "",
                headerTintColor: "#fffeff",
                headerStyle: { backgroundColor: "#1c2023" },
                headerShown: false,
              }}
            />
          </Stack>
        )}
      </GestureHandlerRootView>
    </Provider>
  );
}
