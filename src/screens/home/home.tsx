import { container } from "tsyringe";

import { StatusBar } from "expo-status-bar";
import { Keyboard, Pressable, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Input } from "../../styles/styles";
import { MaskedTextInput } from 'react-native-mask-text';
import React from "react";
import { AddressService } from "../../contexts/address/address";
import { BaseException } from "../../core/exceptions/exceptions";
import Toast from 'react-native-root-toast';

export default function HomeScreen() {

    const addressService: AddressService = container.resolve("AddressService");

    const [formData, setFormData] = React.useState({
        cep: "",
        street: "",
        district: "",
        city: "",
        state: "",
      });
    
    const handleForm = (key: string, value: string) => {
      setFormData((currentForm) => ({
        ...currentForm,
        [key]: value,
      }));
        if (key == "cep") handleCep(value);
    };

    const handleCep = async (value: string) => {
        if (value.length == 10) {
            const addressOrError = await addressService.get(value);
            if ( addressOrError instanceof BaseException || addressOrError.city == null || addressOrError.state == null ) {
                Toast.show('Endereço não encontrado', {
                    duration: Toast.durations.LONG,
                    textColor: "#FF2EAB",
                });
                return;
            }
            Toast.show('Endereço encontrado', {
                duration: Toast.durations.SHORT,
                textColor: "#1cffa0"
            });
            setFormData((currentForm) => ({
                ...currentForm,
                street: addressOrError.street,
                city: addressOrError.city,
                state: addressOrError.state,
                country: "BR",
            }));
        }
    }

    return (
        <Pressable style={styles.scaffold} onPress={()=>Keyboard.dismiss()}>
            <SafeAreaView style={styles.scaffold}>
                <MaskedTextInput
                    onChangeText={(text) => handleForm("cep", text)}
                    mask="99.999-999"
                    value={formData.cep}
                    style={Input.style}
                    keyboardType="numeric"
                    placeholder="CEP"
                    placeholderTextColor={'#ECECEC'} />
                <TextInput
                    value={formData.state}
                    placeholder="Estado"
                    placeholderTextColor={'#ECECEC'}
                    onChangeText={(text) => handleForm("state", text)}
                    style={Input.style}/>
                <TextInput
                    value={formData.street}
                    placeholder="Rua"
                    placeholderTextColor={'#ECECEC'}
                    onChangeText={(text) => handleForm("street", text)}
                    style={Input.style} />
                <TextInput
                    value={formData.city}
                    placeholder="Cidade"
                    placeholderTextColor={'#ECECEC'}
                    onChangeText={(text) => handleForm("city", text)}
                    style={Input.style}/>
            </SafeAreaView>
            <StatusBar style="light"/>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    scaffold : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#161616',
    },
    
})