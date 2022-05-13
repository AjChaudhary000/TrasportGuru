import React from 'react';
import {APP_TEXT_PLACEHOLDER} from '../../../res/style/AppStyle';
import {TextInput, View} from 'react-native';
import Icon from '../Icon';

import styles from './styles';
import {IProps} from './Input_Types';

export default class Input extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {
      icon,
      style,
      multiline,
      numberOfLines,
      textRef,
      maxLength,
      editable,
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
        <Icon source={icon} />
        <TextInput
          ref={textRef}
          placeholder={placeholder}
          placeholderTextColor={APP_TEXT_PLACEHOLDER}
          autoCorrect={false}
          underlineColorAndroid={'transparent'}
          style={[styles.textInput, style]}
          value={value}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          autoCapitalize={'none'}
          maxLength={maxLength}
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
