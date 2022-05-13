import React, {Component, ReactNode} from 'react';
import {TextInput, View} from 'react-native';
import Text from '../Text';

import styles from './styles';
import {IProps, textContentTypeValue} from './AnimateInput_Types';

export default class AnimateInput extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render(): ReactNode {
    const {
      value,
      onChangeText,
      keyboardType,
      mandatory,
      otherIcon,
      secureTextEntry,
      style,
      editable,
      ref,
      textContentType,
    } = this.props;
    let {placeholder, label} = this.props;
    placeholder = mandatory ? placeholder + ' (*)' : placeholder;
    label = mandatory ? label + ' (*)' : label;
    const inputStyle = value ? styles.input : styles.emptyInput;
    return (
      <View style={[styles.container, style]}>
        <View style={styles.inputWrap}>
          <View style={styles.body}>
            {!!value && <Text style={styles.label}>{label}</Text>}
            <TextInput
              value={value || ''}
              editable={editable}
              ref={ref}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="off"
              textContentType={textContentType as textContentTypeValue}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              onChangeText={onChangeText}
              placeholder={placeholder ? placeholder : label}
              underlineColorAndroid="transparent"
              placeholderTextColor="#9B9B9B"
              style={inputStyle}
            />
          </View>
          {otherIcon}
        </View>
        <View style={styles.line} />
      </View>
    );
  }
}
