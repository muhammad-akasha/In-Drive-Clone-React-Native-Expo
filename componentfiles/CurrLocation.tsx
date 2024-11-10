import { useEffect } from "react";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import {
  setTheAddress,
  setTheLocation,
} from "@/config/redux/reducers/locationSlice";

interface CurrLocationProps {
  setErrorMsg: (msg: string | null) => void;
}

export default function CurrLocation({ setErrorMsg }: CurrLocationProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");

        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location.coords.latitude, location.coords.longitude);
      dispatch(
        setTheLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
      try {
        const addressDetails = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        if (addressDetails.length > 0 && addressDetails[0].formattedAddress) {
          // Use the first result if available
          const formattedAddress = addressDetails[0].formattedAddress;
          const cleanedAddress = formattedAddress.replace(/^[^,]+,/, "").trim(); // Removes the first part before the first comma
          console.log(cleanedAddress);
          dispatch(
            setTheAddress({
              address: cleanedAddress,
            })
          );
        }
      } catch (error) {
        console.error("Error retrieving address:", error);
        setErrorMsg("Error retrieving address");
      }
    })();
  }, []);

  // Reverse geocode to get the address when the location is updated

  return null;
}
