import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  StyleProp,
  TextStyle,
} from 'react-native';
import Colors from '../../constants/Colors';

interface IProps {
  onPress: () => void;
  title: string;
  color: string | null;
  styleText: StyleProp<TextStyle>;
  isLoading: boolean | null;
}

export default function Button({
  onPress,
  title,
  color,
  styleText,
  isLoading,
}: IProps) {
  const isColor = color && Colors[color];
  const backgroundStyle = {
    backgroundColor: isColor ? Colors[color] : Colors.secondary,
  };

  const textColor = {
    color: isColor && color !== 'secondary' ? '#fff' : Colors.text,
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, backgroundStyle]}>
        {isLoading ? (
          <ActivityIndicator style={styles.loading} color={'#fff'} />
        ) : (
          <Text style={[styles.buttonText, textColor, styleText]}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#efefef',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#525252',
    fontSize: 16,
    fontWeight: '500',
  },
  loading: {
    position: 'relative',
  },
});
