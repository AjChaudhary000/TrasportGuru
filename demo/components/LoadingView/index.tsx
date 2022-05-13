import React, {Component} from 'react';
import {ActivityIndicator, View, Platform} from 'react-native';
import {LOADING_COLOR} from '../../../res/style/AppStyle';
import {sizeWidth} from '../../util/Size';
import {observer, inject} from 'mobx-react';

import styles from './styles';
import {IProps} from './LoadingView_Types';

@inject('loadingStore')
@observer
export default class LoadingView extends Component<IProps> {
  render() {
    if (this.props.loadingStore?.loading) {
      const size = Platform.OS === 'ios' ? 'large' : sizeWidth(9);
      return (
        <View style={styles.Loading}>
          <ActivityIndicator
            animating={true}
            size={size}
            color={LOADING_COLOR}
          />
        </View>
      );
    }
    return <View />;
  }
}
