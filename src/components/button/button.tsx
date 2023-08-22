
import { ColorValue, Pressable } from "react-native";

type DefaultButtonProps = {
    style?: DefaultButtonStyle
    children: string | JSX.Element | JSX.Element[] 
    onPressed?: () => void
}

type DefaultButtonStyle = {
    backgroundColor?: ColorValue | undefined
    padingVertical?: number | undefined
    paddingHorizontal?: number | undefined
    borderRadius?: number | undefined
    rippleColor?: ColorValue | undefined
    marginBottom?: number | undefined
    marginTop?: number | undefined
}

const DefaultButton = ({children, style} : DefaultButtonProps) =>(
    <Pressable style={{
        backgroundColor: style?.backgroundColor ?? "#0F0F0F",
        paddingVertical: style?.padingVertical ?? 12,
        paddingHorizontal: style?.paddingHorizontal ?? 24,
        borderRadius: style?.borderRadius ?? 4,
        marginTop: style?.marginTop ?? 0,
        marginBottom: style?.marginBottom ?? 0
    }}>
        {children}
    </Pressable>
)

export default DefaultButton;