import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import AppText from '../Text';
import {inject, observer} from 'mobx-react';

import styles from './styles';
import {IProps} from './TabBarWebView_Types';

@inject('loadingStore')
@observer
export default class TabBarWebView extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {textLeft, textRight} = this.props;
    return (
      <View style={styles.container}>
        {this.renderTabBar(textLeft, 1)}
        {this.renderTabBar(textRight, 2)}
      </View>
    );
  }

  renderTabBar = (text: string, tab: number) => {
    const tabSelect = this.props.loadingStore?.tab_new;
    return (
      <TouchableOpacity
        onPress={() => this.onPressTab()}
        style={[
          styles.tab,
          tab === tabSelect ? styles.tabSelect : styles.tabUnSelect,
          tabSelect !== 1 && styles.tabUnSelect,
        ]}>
        <AppText
          style={[
            styles.textTab,
            tab === tabSelect ? styles.textTabSelect : styles.textTabUnSelect,
          ]}>
          {text}
        </AppText>
      </TouchableOpacity>
    );
  };

  onPressTab = () => {};
}
