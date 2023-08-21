import { container } from "tsyringe";
import Toast from 'react-native-root-toast';
import React from "react";
import { MaskedTextInput } from 'react-native-mask-text';
import { StatusBar } from "expo-status-bar";
import { Keyboard, Pressable, SafeAreaView, StyleSheet, TextInput } from "react-native";

import { Input } from "../../styles/styles";
import { AddressService } from "../../contexts/address/address";
import { BaseException } from "../../core/exceptions/exceptions";
import { useAddressStore } from "./store";

export default function HomeScreen() {

    const addressService: AddressService = container.resolve("AddressService");
    const store = useAddressStore();
    
    
    const handleForm = (key: string, value: string) => {
        store.setAddress({...store.address, [key]: value});
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
            store.setAddress({
                ...addressOrError,
                country: "BR",
                cep: store.address.cep
            });
            
        }
    }

    return (
        <Pressable style={styles.scaffold} onPress={()=>Keyboard.dismiss()}>
            <SafeAreaView style={styles.scaffold}>
                <MaskedTextInput
                    onChangeText={(text) => handleForm("cep", text)}
                    mask="99.999-999"
                    value={store.address.cep}
                    style={Input.style}
                    keyboardType="numeric"
                    placeholder="CEP"
                    placeholderTextColor={'#ECECEC'} />
                <TextInput
                    value={store.address.state}
                    placeholder="Estado"
                    placeholderTextColor={'#ECECEC'}
                    onChangeText={(text) => handleForm("state", text)}
                    style={Input.style}/>
                <TextInput
                    value={store.address.street}
                    placeholder="Rua"
                    placeholderTextColor={'#ECECEC'}
                    onChangeText={(text) => handleForm("street", text)}
                    style={Input.style} />
                <TextInput
                    value={store.address.city}
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