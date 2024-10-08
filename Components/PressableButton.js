import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";


export default function PressableButton({children, componentStyle, pressHandler, pressedStyle}) {
    return (
        <Pressable 
            onPress={pressHandler} 
            style={({pressed}) => {
                return [
                    styles.defaultStyle,
                    componentStyle,
                    pressed && styles.defaultPressedStyle,
                    pressed && pressedStyle,
                ];
                }}>
                <View>{children}</View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    defaultStyle : {
        padding: 5,
        margin: 10,
        backgroundColor: 'beige',
        borderRadius: 5,
    },
    pressedStyle: {
        opacity: 0.5,
    },
    defaultPressedStyle: {
        backgroundColor: 'blue',
        opacity: 0.2,
    },
});
