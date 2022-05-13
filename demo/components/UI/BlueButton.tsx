import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface IProps {
  title: string;
  onPress: () => void;
  active: boolean;
  highlight: boolean;
  borderRadius: number;
  style: StyleProp<ViewStyle>;
}

export default class BlueButton extends React.Component<IProps> {
  static defaultProps = {
    highlight: true,
    borderRadius: 50,
  };

  render() {
    const {
      title,
      onPress,
      active,
      highlight,
      borderRadius = 0,
      style,
    } = this.props;
    const activeButtonStyle = active && styles.buttonActive;
    const activeTextStyle = active && styles.buttonTextActive;
    const TouchableComponent = highlight
      ? TouchableHighlight
      : TouchableWithoutFeedback;
    const wrapperStyle = [
      styles.button,
      activeButtonStyle,
      {borderRadius},
      style,
    ];

    return (
      <TouchableComponent
        style={highlight && wrapperStyle}
        onPress={onPress}
        // underlayColor={'#5980a9f5'}
      >
        <View style={!highlight && wrapperStyle}>
          <Text style={[styles.button_text, activeTextStyle]}>{title}</Text>
        </View>
      </TouchableComponent>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#5980A9',
    borderWidth: 1,
    borderColor: '#5980A9',
  },
  buttonActive: {
    backgroundColor: '#fff',
  },
  button_text: {
    textAlign: 'center',
    color: '#fff',
    zIndex: 100,
  },
  buttonTextActive: {
    color: '#5980A9',
  },
});
