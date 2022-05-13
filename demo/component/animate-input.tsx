import React, {Component, ReactNode} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {sizeFont, sizeWidth} from '../util/Size';
import Text from './Text';
import {Fonts} from '../../res/themes';
import {IProps} from '../components/AnimateInput/AnimateInput_Types';

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
      autoCompleteType,
      editable,
      onBlur,
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
              onBlur={onBlur}
              editable={editable}
              autoCapitalize="none"
              autoCompleteType={autoCompleteType}
              autoCorrect={false}
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

const styles = StyleSheet.create({
  container: {
    marginBottom: sizeWidth(0),
  },
  inputWrap: {
    flexDirection: 'row',
    height: sizeWidth(13.5),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sizeWidth(2.13),
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#EDEDED',
  },
  input: {
    fontSize: sizeWidth(3.7),
    textAlign: 'left',
    textAlignVertical: 'center',
    fontFamily: Fonts.type.OpenSansDisplayRegular,
    height: sizeWidth(6),
    marginBottom: sizeWidth(1),
    paddingHorizontal: 1,
  },
  emptyInput: {
    flex: 1,
    padding: 0,
    height: sizeWidth(13),
    textAlignVertical: 'center',
    fontFamily: Fonts.type.OpenSansDisplayRegular,
    fontSize: sizeWidth(4),
    textAlign: 'left',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: sizeWidth(2.13),
  },
  label: {
    color: '#7B7B7B',
    fontSize: sizeFont(3.7),
    fontFamily: Fonts.type.OpenSansDisplayRegular,
    marginBottom: sizeWidth(1),
  },
});
