import { View, Text} from "react-native";
import { Scaffold } from "../../styles/styles";
import { useLocalSearchParams } from "expo-router";
import { AddressForm } from "../home/store";

export default function ReviewScreen() {
    const { address } = useLocalSearchParams();
    const addressParam : AddressForm = JSON.parse(address!.toString());

    return (
        <View style ={Scaffold.style}>
            <Text style={{color: "white", textAlign: "center"}}>
                <Text style={{fontWeight: "700", fontSize: 18}}>
                    Revisando dados {'\n'} 
                 </Text>
                {addressParam.cep+ " " + addressParam.street + '\n' + addressParam.city + "-" + addressParam.state}
            </Text>
        </View>
    )
}