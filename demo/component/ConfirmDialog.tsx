import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DialogManager from 'react-native-dialog-component';
import WrapText from './WrapText';
import AppText from './Text';
import {IProps} from '../components/ConfirmDialog/ConfirmDialog_Types';
import styles from '../components/ConfirmDialog/styles';

export default class ConfirmDialog extends Component<IProps> {
  onConfirmClick = () => {
    const {onConfirmClick} = this.props;
    DialogManager.dismiss();
    if (onConfirmClick) {
      onConfirmClick();
    }
  };

  onRejectClick = () => {
    const {onRejectClick} = this.props;
    DialogManager.dismiss();
    if (onRejectClick) {
      onRejectClick();
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
    const {title, content} = this.props;
    return (
      <View style={styles.Container}>
        <View style={styles.ContentWrapper}>
          {this.renderTitle(title)}
          <WrapText style={styles.ContentText}>{content}</WrapText>
        </View>
        {this.renderConfirmContainer()}
      </View>
    );
  }

  renderConfirmContainer = () => {
    const {confirmText, rejectText} = this.props;
    return (
      <View>
        <View style={styles.VerticalSeparator} />
        <View style={styles.ActionContainer}>
          {confirmText && (
            <TouchableOpacity
              style={styles.ActionWrapper}
              onPress={this.onConfirmClick}>
              <AppText style={styles.ActionText}>{confirmText}</AppText>
            </TouchableOpacity>
          )}
          <View style={styles.HorizontalSeparator} />
          {rejectText && (
            <TouchableOpacity
              style={styles.ActionWrapper}
              onPress={this.onRejectClick}>
              <AppText style={styles.ActionText}>{rejectText}</AppText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
}
