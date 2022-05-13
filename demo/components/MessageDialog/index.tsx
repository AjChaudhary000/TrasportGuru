import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';

import AppText from '../Text';
import DialogManager from 'react-native-dialog-component';
import WrapText from '../WrapText';
import styles from './styles';
import {IProps} from './MessageDialog_Types';

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
