import { container } from "tsyringe";
import Toast from "react-native-root-toast";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

import { Input } from "../../styles/styles";
import { AddressService } from "../../contexts/address/address";
import { BaseException } from "../../core/exceptions/exceptions";
import { useAddressStore } from "./store";
import { DefaultButton, DefaultInput } from "../../components/components";

export default function HomeScreen() {
  const addressService: AddressService = container.resolve("AddressService");
  const store = useAddressStore();
  const [image, setImage] = useState<string | undefined>();

  const handleForm = (key: string, value: string) => {
    store.setAddress({ ...store.address, [key]: value });
    if (key == "cep") handleCep(value);
  };

  const handleCep = async (value: string) => {
    if (value.length == 8) {
      const addressOrError = await addressService.get(value);
      if (
        addressOrError instanceof BaseException ||
        addressOrError.city == null ||
        addressOrError.state == null
      ) {
        Toast.show("Endereço não encontrado", {
          duration: Toast.durations.LONG,
          textColor: "#FF2EAB",
        });
        return;
      }
      Toast.show("Endereço encontrado", {
        duration: Toast.durations.SHORT,
        textColor: "#1cffa0",
      });
      store.setAddress({
        ...addressOrError,
        country: "BR",
        cep: store.address.cep,
      });
    }
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Pressable style={styles.scaffold} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.scaffold}>
        <DefaultInput
          onChangeText={(text: string, raw?: string) => handleForm("cep", raw!)}
          mask="99.999-999"
          value={store.address.cep}
          style={Input.style}
          keyboardType="numeric"
          placeholder="CEP"
          placeholderTextColor={"#ECECEC"}
        />
        <DefaultInput
          value={store.address.state}
          placeholder="Estado"
          placeholderTextColor={"#ECECEC"}
          onChangeText={(text: string) => handleForm("state", text)}
          style={Input.style}
        />
        <DefaultInput
          value={store.address.street}
          placeholder="Rua"
          placeholderTextColor={"#ECECEC"}
          onChangeText={(text: string) => handleForm("street", text)}
          style={Input.style}
        />
        <DefaultInput
          value={store.address.city}
          placeholder="Cidade"
          placeholderTextColor={"#ECECEC"}
          onChangeText={(text: string) => handleForm("city", text)}
          style={Input.style}
        />
        <Pressable onPress={pickImage}>
          {() =>
            image == null ? (
              <View
                style={{
                  padding: 20,
                  borderRadius: 8,
                  backgroundColor: "#0F0F0F",
                  height: 80,
                  width: 80,
                  marginTop: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="md-camera" size={32} color="white" />
              </View>
            ) : (
              <Image
                source={image}
                style={{
                  height: 160,
                  width: 160,
                  borderRadius: 16,
                  margin: 16,
                }}
              />
            )
          }
        </Pressable>

        <DefaultButton
          onPressed={() => {}}
          style={{
            backgroundColor: "#0F0F0F",
            marginTop: 20,
          }}>
          <Text style={{ color: image != null ? "#E8642B" : "grey" }}>Continuar</Text>
        </DefaultButton>
      </SafeAreaView>
      <StatusBar style="light" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scaffold: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#161616",
  },
});
