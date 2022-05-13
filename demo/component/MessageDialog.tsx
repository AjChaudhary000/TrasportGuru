import {COLOR_APP_BLUE} from '../../res/style/AppStyle';
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {sizeFont, sizeWidth} from '../util/Size';

import AppText from './Text';
import DialogManager from 'react-native-dialog-component';
import WrapText from './WrapText';
import {IProps} from '../components/MessageDialog/MessageDialog_Types';

export default class MessageDialog extends Component<IProps> {
  onConfirmClick = () => {
    const {onConfirmClick} = this.props;
    DialogManager.dismiss();
    if (onConfirmClick) {
      onConfirmClick();
    }
  };

  renderTitle = (title: string) => {
    const {confirmText} = this.props;
    const colorTitle = !confirmText && {color: 'black'};
    if (title) {
      return (
        <WrapText style={[styles.TitleText, colorTitle]}>{title}</WrapText>
      );
    }
  };

  render() {
    const {confirmText, title, content} = this.props;
    return (
      <View style={styles.Container}>
        <View style={styles.ContentWrapper}>
          {this.renderTitle(title)}
          <WrapText style={styles.ContentText}>{content}</WrapText>
        </View>
        {confirmText && this.renderConfirmContainer(confirmText)}
      </View>
    );
  }

  renderConfirmContainer = (confirmText: string) => (
    <View>
      <View style={styles.VerticalSeparator} />
      <View style={styles.ActionContainer}>
        <TouchableOpacity
          style={styles.ActionWrapper}
          onPress={this.onConfirmClick}>
          <AppText style={styles.ActionText}>{confirmText}</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  ContentWrapper: {
    paddingHorizontal: sizeWidth(3.2),
    paddingVertical: sizeWidth(4),
    alignItems: 'center',
  },
  TitleText: {
    fontSize: sizeFont(4.8),
    marginBottom: sizeWidth(2),
    fontWeight: 'bold',
    color: '#000',
  },
  ContentText: {
    fontSize: sizeFont(3.8),
    marginBottom: sizeWidth(1),
    color: 'black',
    textAlign: 'center',
  },
  ActionContainer: {
    flexDirection: 'row',
  },
  VerticalSeparator: {
    height: 1,
    width: sizeWidth(70),
    backgroundColor: '#DDDDDD',
  },
  HorizontalSeparator: {
    width: 1,
    backgroundColor: '#DDDDDD',
  },
  ActionWrapper: {
    flex: 1,
    padding: sizeWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ActionText: {
    color: COLOR_APP_BLUE,
    fontSize: sizeFont(4.5),
    fontWeight: 'bold',
  },
});
