import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from './Text';
import {sizeWidth} from '../util/Size';
import {inject, observer} from 'mobx-react';
import {IProps} from '../components/TabBarWebView/TabBarWebView_Types';

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
        onPress={() => this.onPressTab(tab)}
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

  onPressTab = (tab: number) => {
    console.log('tab', tab);
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: sizeWidth(5.9),
    marginHorizontal: sizeWidth(4.3),
    borderRadius: sizeWidth(1),
    borderColor: '#8190A5',
    borderWidth: sizeWidth(0.2),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: sizeWidth(8),
  },
  textTab: {},
  textTabSelect: {
    color: 'white',
  },
  textTabUnSelect: {
    color: '#8190A5',
  },
  tabSelect: {
    borderBottomLeftRadius: sizeWidth(1),
    borderTopLeftRadius: sizeWidth(1),
    borderBottomRightRadius: sizeWidth(0),
    borderTopRightRadius: sizeWidth(0),
    backgroundColor: '#8190A5',
  },
  tabUnSelect: {
    borderBottomRightRadius: sizeWidth(1),
    borderTopRightRadius: sizeWidth(1),
    borderBottomLeftRadius: sizeWidth(0),
    borderTopLeftRadius: sizeWidth(0),
  },
});
