import { container } from "tsyringe";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  Pressable,
  SafeAreaView,

  Text,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";

import { Input, Scaffold } from "../../styles/styles";
import { useAddressStore } from "./store";
import { DefaultButton, DefaultInput } from "../../components/components";
import { AddressController } from "./presenter";
import { ImagePickerController } from "../../core/controllers/imagePickerController";
import { router } from 'expo-router';

export default function HomeScreen() {
  const controller = new AddressController(container.resolve("AddressService"), useAddressStore());
  const imagePickerController : ImagePickerController = container.resolve("ImagePickerController");
  const [image, setImage] = useState<string | undefined>();
  const validated = image!=null && controller.store.address.cep?.length == 8 && controller.store.address.city != null && controller.store.address.state != null;
  const pickImage = async () => {
    const result = await imagePickerController.pickImage();
    setImage(result?.uri);
  };

  return (
    <Pressable style={Scaffold.style} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={Scaffold.style}>
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
          onPressed={() => {
            if (validated) {
              router.push("review/review?address="+JSON.stringify(controller.store.address));
            }
          }}
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


