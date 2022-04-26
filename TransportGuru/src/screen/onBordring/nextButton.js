import React, { useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, Animated, Image } from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'
import icons from '../../contents/icons';
function NextButton({ percentage, scrollTo }) {
    const size = 128;
    const strokewidth = 5;
    const center = size / 2;
    const radius = size / 2 - strokewidth / 2;
    const circumference = 2 * Math.PI * radius;
    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progresRef = useRef(20);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
            <Svg width={size} height={size} >
                <G rotation="-90" origin={center}>
                    <Circle stroke="#E6E7E8" cx={center} cy={center} r={radius} strokeWidth={strokewidth} />
                    <Circle stroke="#119CB9"
                        cx={center}
                        cy={center}
                        r={radius}
                        ref={progresRef}
                        strokeWidth={strokewidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (circumference * percentage) / 100}
                        progressAnimation={progressAnimation}
                    />

                </G>
            </Svg>
            <TouchableOpacity activeOpacity={0.60} onPress={scrollTo} style={{
                width: size - 20, height: size - 20,
                backgroundColor: '#119CB9', borderRadius: ((size - 20) / 2),
                justifyContent: 'center', alignItems: 'center', position: 'absolute'
            }}>
                <Image source={icons.right_arrow} style={{ width: 30, height: 30 ,tintColor:'white' }} />
            </TouchableOpacity>
        </View>
    );
}
export default NextButton;  