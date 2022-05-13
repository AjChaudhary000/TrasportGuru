import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Colors from '../../constants/Colors';

interface IProps {
  style: StyleProp<ViewStyle>;
  center: boolean;
  color: string;
  children: string;
  onPress: () => void;
}

export default function Link({
  style,
  center,
  color,
  children,
  onPress,
}: IProps) {
  const centerText: StyleProp<TextStyle> = center && {textAlign: 'center'};
  const colorText = {
    color: color && Colors[color] ? Colors[color] : Colors.primary,
  };

  return (
    <View style={[styles.wrapper, style]}>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.description, centerText, colorText]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
    color: '#5181b8',
  },
});
