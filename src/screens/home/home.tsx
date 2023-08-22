import { container } from "tsyringe";
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
import { useAddressStore } from "./store";
import { DefaultButton, DefaultInput } from "../../components/components";
import { AddressController } from "./presenter";

export default function HomeScreen() {
  const controller = new AddressController(container.resolve("AddressService"), useAddressStore());
  const [image, setImage] = useState<string | undefined>();

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
          onChangeText={(text: string, raw?: string) => controller.handleForm("cep", raw!)}
          mask="99.999-999"
          value={controller.store.address.cep}
          style={Input.style}
          keyboardType="numeric"
          placeholder="CEP"
          placeholderTextColor={"#ECECEC"}
        />
        <DefaultInput
          value={controller.store.address.state}
          placeholder="Estado"
          placeholderTextColor={"#ECECEC"}
          onChangeText={(text: string) => controller.handleForm("state", text)}
          style={Input.style}
        />
        <DefaultInput
          value={controller.store.address.street}
          placeholder="Rua"
          placeholderTextColor={"#ECECEC"}
          onChangeText={(text: string) => controller.handleForm("street", text)}
          style={Input.style}
        />
        <DefaultInput
          value={controller.store.address.city}
          placeholder="Cidade"
          placeholderTextColor={"#ECECEC"}
          onChangeText={(text: string) => controller.handleForm("city", text)}
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
