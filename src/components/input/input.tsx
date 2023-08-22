import { ColorValue, KeyboardTypeOptions, StyleProp, TextInput, TextStyle } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

type MaskedChange = (text: string, rawText?: string) => void;
type UnmaskedChange =  (text: string) => void;

type DefaultInputProps = {
    onChangeText: UnmaskedChange | MaskedChange,
    mask?: string,
    value?: string,
    style?: StyleProp<TextStyle>,
    keyboardType?: KeyboardTypeOptions | undefined,
    placeholder?: string | undefined,
    placeholderTextColor?: ColorValue | undefined
}

export default function DefaultInput(props: DefaultInputProps) {
    if (props.mask == null) {
        return (
            <TextInput
                onChangeText={ (value:string) => props.onChangeText(value) }
                value={props.value}
                style={props.style}
                keyboardType={props.keyboardType}
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderTextColor} />
        );
    }
    return (
        <MaskedTextInput
            onChangeText={(text,rawText) => props.onChangeText(text, rawText)}
            mask={props.mask}
            value={props.value}
            style={props.style}
            keyboardType={props.keyboardType}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor} />
    );
}