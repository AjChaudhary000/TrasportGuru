import React from 'react';
import {Image, ImageSourcePropType, TextInput, View} from 'react-native';
import {
  APP_COLOR_YELLOW,
  APP_TEXT_COLOR,
  SEPARATOR_COLOR,
} from '../../../res/style/AppStyle';

import styles from './styles';
import {IProps, IState} from './InputView_Types';

export default class InputView extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      underlineColor: SEPARATOR_COLOR,
    };
  }

  renderIcon = (icon: ImageSourcePropType) => {
    if (icon) {
      return <Image source={icon} resizeMode="contain" style={styles.icon} />;
    }
  };

  onFocus = () => {
    this.setState({
      underlineColor: APP_COLOR_YELLOW,
    });
  };

  onBlur = () => {
    this.setState({
      underlineColor: SEPARATOR_COLOR,
    });
  };

  render() {
    const {
      icon,
      textRef,
      value,
      placeholder,
      onChangeText,
      secureTextEntry,
      keyboardType,
      returnKeyType,
      onSubmitEditing,
    } = this.props;
    return (
      <View style={styles.container}>
        {this.renderIcon(icon)}
        <TextInput
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          ref={textRef}
          placeholder={placeholder}
          placeholderTextColor={APP_TEXT_COLOR}
          autoCorrect={false}
          underlineColorAndroid={'transparent'}
          style={[
            styles.textInput,
            {borderBottomColor: this.state.underlineColor},
          ]}
          value={value}
          autoCapitalize={'none'}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    );
  }
}
