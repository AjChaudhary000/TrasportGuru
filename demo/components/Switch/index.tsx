import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback, View, Animated} from 'react-native';

import styles from './styles';
import {IProps, IState} from './Switch_Types';

export default class Switch extends Component<IProps, IState> {
  static defaultProps = {
    value: false,
    onChangeValue: () => null,
    activeText: '',
    inactiveText: '',
    fontSize: 16,
    activeTextColor: 'rgba(255, 255, 255, 1)',
    inactiveTextColor: 'rgba(255, 255, 255, 1)',
    activeBackgroundColor: 'rgba(50, 163, 50, 1)',
    inactiveBackgroundColor: 'rgba(137, 137, 137, 1)',
    activeButtonBackgroundColor: 'rgba(255, 255, 255, 1)',
    inactiveButtonBackgroundColor: 'rgba(255, 255, 255, 1)',
    switchWidth: 70,
    switchHeight: 30,
    switchBorderRadius: 15,
    switchBorderColor: 'rgba(0, 0, 0, 1)',
    switchBorderWidth: 0,
    buttonWidth: 25,
    buttonHeight: 25,
    buttonBorderRadius: 15,
    buttonBorderColor: 'rgba(0, 0, 0, 1)',
    buttonBorderWidth: 0,
    animationTime: 150,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 0,
    shadowOpacity: 1,
  };
  private padding: number;
  private transformValue: number;

  constructor(props: IProps) {
    super(props);
    this.padding = props.padding === true ? 5 : props.padding || 0;
    this.transformValue = props.switchWidth - props.buttonWidth - this.padding;
    this.state = {
      transformValue: new Animated.Value(
        props.value ? this.transformValue : this.padding,
      ),
      backgroundColor: new Animated.Value(props.value ? 90 : -90),
      buttonBackgroundColor: new Animated.Value(props.value ? 90 : -90),
    };
  }

  componentDidUpdate(prevProps: IProps) {
    const {value} = this.props;
    if (value !== prevProps.value) {
      this.startGroupAnimations();
    }
  }

  startGroupAnimations = () => {
    const {animationTime, value} = this.props;
    Animated.parallel([
      Animated.spring(this.state.transformValue, {
        toValue: value ? this.transformValue : this.padding,
        useNativeDriver: false,
        // duration: animationTime,
      }),
      Animated.timing(this.state.backgroundColor, {
        toValue: value ? 75 : -75,
        duration: animationTime,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.buttonBackgroundColor, {
        toValue: value ? 75 : -75,
        duration: animationTime,
        useNativeDriver: false,
      }),
    ]).start();
  };

  render() {
    const {transformValue, backgroundColor, buttonBackgroundColor} = this.state;

    const {
      value,
      onChangeValue,
      activeText,
      inactiveText,
      fontSize,
      activeTextColor,
      inactiveTextColor,
      activeBackgroundColor,
      inactiveBackgroundColor,
      activeButtonBackgroundColor,
      inactiveButtonBackgroundColor,
      switchWidth,
      switchHeight,
      switchBorderRadius = 0,
      switchBorderColor,
      switchBorderWidth,
      buttonWidth,
      buttonHeight,
      buttonBorderRadius = 0,
      buttonBorderColor,
      buttonBorderWidth,
      shadowColor,
      shadowOffset,
      shadowRadius,
      shadowOpacity,
    } = this.props;

    const backgroundColorValue = backgroundColor.interpolate({
      inputRange: [-90, 90],
      outputRange: [inactiveBackgroundColor, activeBackgroundColor],
    });

    const buttonBackgroundColorValue = buttonBackgroundColor.interpolate({
      inputRange: [-90, 90],
      outputRange: [inactiveButtonBackgroundColor, activeButtonBackgroundColor],
    });

    const containerHeight =
      switchHeight > buttonHeight ? switchHeight : buttonHeight;
    const containerWidth =
      switchWidth > buttonWidth ? switchWidth : buttonWidth;

    return (
      <TouchableWithoutFeedback onPress={onChangeValue}>
        <View
          style={[
            styles.container,
            {
              height: containerHeight,
              width: containerWidth,
            },
          ]}>
          <Animated.View
            style={{
              backgroundColor: backgroundColorValue,
              height: switchHeight,
              width: switchWidth,
              borderRadius: switchBorderRadius,
              borderWidth: switchBorderWidth,
              borderColor: switchBorderColor,
              zIndex: 1,
              position: 'absolute',
              top: (containerHeight - switchHeight) / 2,
              left: (containerWidth - switchWidth) / 2,
            }}>
            <View style={styles.animatedContainer}>
              <View style={styles.textContainer}>
                <Text style={{color: activeTextColor, fontSize}}>
                  {value ? activeText : ''}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text
                  style={{color: inactiveTextColor, fontSize, paddingRight: 3}}>
                  {value ? '' : inactiveText}
                </Text>
              </View>
            </View>
          </Animated.View>
          <Animated.View
            style={{
              backgroundColor: buttonBackgroundColorValue,
              borderRadius: buttonBorderRadius,
              borderWidth: buttonBorderWidth,
              borderColor: buttonBorderColor,
              width: buttonWidth,
              height: buttonHeight,
              zIndex: 3,
              position: 'absolute',
              top: (containerHeight - buttonHeight) / 2,
              left: transformValue,
              shadowColor: shadowColor,
              shadowOpacity: shadowOpacity,
              shadowOffset: shadowOffset,
              shadowRadius: shadowRadius,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
