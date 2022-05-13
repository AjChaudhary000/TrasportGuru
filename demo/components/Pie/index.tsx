// @flow
'use strict';

import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import AnimShape from '../../components/AnimateArtShape';
import Icon from '../../component/Icon';
import {sizeFont, sizeHeight, sizeWidth} from '../../util/Size';
import Theme from '../../../res/themes/Charts';
import {inject, observer} from 'mobx-react';
import NavigationActions from '../../router/NavigationActions';
import AnimateNumber from '@bankify/react-native-animate-number';
import {isIPhoneX} from '../../util/Device';
import styles from './styles';
import {Fonts} from '../../../res/themes';
import {SafeAreaView} from 'react-navigation';

import {Surface, Group} from '@react-native-community/art';
import UserStore from '../../mobx/UserStore';
import BankStore from '../../mobx/BankStore';
import {IAccounts, IPieBankData} from '../../mobx/UserStore_Types';
import {getTransactionsAfterTodayBalance} from '../TriStarEntityChart/helpers';
import {DefaultArcObject} from 'd3-shape';

const d3 = {
  scale,
  shape,
};

type Props = {
  userStore?: UserStore;
  bankStore?: BankStore;
  height: number;
  width: number;
  pieWidth: number;
  pieHeight: number;
  onItemSelected: (newIndex: number) => void;
  prevRoute: string;
  data?: IPieBankData[] | null;
  hasCalendarRendered?: boolean;
  colors: string[];
};

type State = {
  highlightedIndex: number;
  isExpanded: boolean;
  isMounted: boolean;
  expand?: boolean;
};

@inject('userStore')
@inject('bankStore')
@observer
export default class Pie extends Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {highlightedIndex: -1, isExpanded: false, isMounted: false};
    this._createPieChart = this._createPieChart.bind(this);
    this._value = this._value.bind(this);
    this._label = this._label.bind(this);
    this._color = this._color.bind(this);
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
  }
  componentDidMount() {
    this.setState({isMounted: true});
  }
  // methods used to tranform data into piechart:
  // TODO: Expose them as part of the interface
  _value(item: IPieBankData) {
    return item.number;
  }

  _label(item: IPieBankData) {
    return item.name;
  }

  _color(index: number) {
    return Theme.colors[index];
  }

  _createPieChart(index: number) {
    const arcs = d3.shape.pie().value(this._value as any)(
      this.props.data as any,
    );

    const hightlightedArc = d3.shape
      .arc()
      .outerRadius(this.props.pieWidth / 2 + 10)
      .padAngle(0.0)
      .innerRadius(30);

    const arc = d3.shape
      .arc()
      .outerRadius(this.props.pieWidth / 2)
      .padAngle(0.0)
      .innerRadius(30);

    const arcData = arcs[index] as unknown as DefaultArcObject;
    const path =
      this.state.highlightedIndex === index
        ? hightlightedArc(arcData)
        : arc(arcData);

    return {
      path,
      color: this._color(index),
    };
  }

  _onPieItemSelected(index: number) {
    if (index !== this.state.highlightedIndex) {
      this.setState({...this.state, highlightedIndex: index, isExpanded: true});
      this.props.onItemSelected(index);
    } else {
      // to collapse item
      this.setState({...this.state, highlightedIndex: -1, isExpanded: false});
      this.props.onItemSelected(-1);
    }
  }

  render() {
    const {userStore, bankStore, prevRoute} = this.props;

    const margin = styles.container.margin;
    const x = margin && this.props.pieWidth / 2 + margin;
    const y = margin && this.props.pieHeight / 2 + margin;
    const eqtn =
      userStore?.transactionsTotalBalance &&
      Math.exp(
        Math.log(Math.sqrt(userStore?.transactionsTotalBalance) ** 1.48),
      );
    let transactionsTotalBalanceStr = this.transformSingleNumericToCurrency(
      userStore?.transactionsTotalBalance,
    );

    return (
      <View style={styles.outer_container}>
        {/* generates the Pie Chart */}
        <View style={styles.chartDesign}>
          <Surface
            width={this.props.width}
            height={isIPhoneX() ? sizeHeight(40) : sizeHeight(54)}>
            <Group x={x} y={y}>
              {
                // pieChart has all the svg paths calculated
                this.props.data?.map((item: IPieBankData, index: number) => (
                  <AnimShape
                    key={'pie_shape_' + index}
                    color={this._color(index)}
                    d={() => this._createPieChart(index)}
                  />
                ))
              }
            </Group>
          </Surface>
        </View>

        {/* Total Balance */}
        <View style={styles.total_container}>
          <SafeAreaView
            style={[
              styles.chart_total_container,
              (prevRoute && prevRoute === 'TriStarClientsScreen') ||
              this.props.hasCalendarRendered
                ? styles.chart_total_container_alt
                : {},
            ]}>
            <Text style={styles.chart_total}>Total</Text>
            {userStore?.isCashScreenFocused && this.state.isMounted ? (
              <AnimateNumber
                value={userStore?.transactionsTotalBalance}
                countBy={eqtn}
                renderContent={(displayValue: number) => {
                  return (
                    <Text style={styles.chart_total_balance}>
                      {this.transformSingleNumericToCurrency(displayValue)}
                    </Text>
                  );
                }}
              />
            ) : (
              <Text style={styles.chart_total_balance}>
                {transactionsTotalBalanceStr}
              </Text>
            )}
            <Text
              style={{
                textAlign: 'center',
                fontSize: sizeFont(3.4),
                color:
                  userStore?.displayTotalTax ||
                  (typeof bankStore?.selected_client_id === 'number' &&
                    bankStore?.shouldDisplayTotalTax) ||
                  userStore?.hasAccessToTriStarClients
                    ? '#000'
                    : '#FFF',
                marginTop: sizeHeight(0.2),
              }}>
              Total Tax:{' '}
              {this.transformSingleNumericToCurrency(bankStore?.totalTax)}
            </Text>
          </SafeAreaView>

          {/* Design of the Labels
                <View style={{position: 'absolute', bottom:margin, left: 2*margin + this.props.pieWidth}}>
            */}
          <SafeAreaView
            style={[
              styles.labelContainer,
              (prevRoute && prevRoute === 'TriStarClientsScreen') ||
              this.props.hasCalendarRendered
                ? styles.labelContainerAlt
                : {},
            ]}>
            <View
              style={[
                styles.labelBackground,
                (prevRoute && prevRoute === 'TriStarClientsScreen') ||
                this.props.hasCalendarRendered
                  ? styles.labelBackgroundAlt
                  : {},
              ]}>
              {this.props.data?.map((item: IPieBankData, index: number) => {
                return this.renderChevron2(
                  index,
                  this._color(index),
                  this._label(item),
                  this._value(item),
                  item.accounts,
                  // 1,
                );
              })}
            </View>
          </SafeAreaView>
        </View>
      </View>
    );
  }

  renderChevron2 = (
    index: number,
    color: string,
    labelName: string | number,
    labelValue: number,
    labelAccounts: IAccounts[],
  ) => {
    const {userStore} = this.props;
    const fontFamily =
      this.state.highlightedIndex === index
        ? Fonts.type.OpenSansDisplayBold
        : Fonts.type.OpenSansDisplayRegular;
    const expanded = this.state.highlightedIndex === index;
    const width = expanded
      ? sizeWidth(1)
      : isIPhoneX()
      ? sizeHeight(9.3) / 2
      : sizeHeight(3.1) / 2;
    const height = expanded
      ? '100%'
      : isIPhoneX()
      ? sizeHeight(9.6)
      : sizeHeight(11.1);
    const latestDate = userStore?.bankData?.end_date
      ? new Date(userStore?.bankData?.end_date)
      : new Date();
    let transactionsTotalLabelValue = 0;
    for (const account of labelAccounts) {
      const transactionsAfterTodayBalance =
        account.transactions &&
        getTransactionsAfterTodayBalance(account.transactions, latestDate);

      if (
        transactionsAfterTodayBalance &&
        transactionsAfterTodayBalance !== 0 &&
        account.account_ending_balance
      ) {
        transactionsTotalLabelValue +=
          account.account_ending_balance + -transactionsAfterTodayBalance;
      } else if (account.account_ending_balance) {
        transactionsTotalLabelValue += account.account_ending_balance;
      }
    }

    return (
      <TouchableOpacity
        style={styles.view_item_chevron}
        key={index}
        onPress={() => this._onPieItemSelected(index)}>
        <View
          style={[
            styles.view_content_chevron,
            {
              flexDirection: 'column',
              justifyContent: 'center',
              maxHeight: height,
              marginBottom: 20,
            },
          ]}>
          <View
            style={[
              styles.view_chevron_item_left,
              {
                borderWidth: expanded
                  ? 1
                  : isIPhoneX()
                  ? sizeHeight(9.3) / 3.825
                  : sizeHeight(11.9) / 3.825,
                backgroundColor: color,
                width,
                height,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          />
          <View style={styles.label_container}>
            {/* Display Entity name and total balance */}
            <Text style={[styles.label, {fontFamily: fontFamily}]}>
              {labelName}
            </Text>
            <Text style={[styles.label_balance]}>
              {this.transformSingleNumericToCurrency(
                transactionsTotalLabelValue,
              )}
            </Text>
            {/* Map over user data to show sub totals and account numbers */}
            {/* {this.renderAccountInfo(labelAccounts)} */}
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignContent: 'center',
              zIndex: 3,
              marginBottom: expanded ? 31 : 0,
            }}>
            {expanded ? this.renderAccountInfo(labelAccounts) : null}
          </View>
          <View
            style={[
              styles.view_chevron_item_right,
              {
                borderWidth: expanded
                  ? 1
                  : isIPhoneX()
                  ? sizeHeight(9.3) / 3.825
                  : sizeHeight(11.9) / 3.825,
                backgroundColor: color,
                width,
                height,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderAccountInfo = (accounts: IAccounts[]) => {
    const {userStore} = this.props;
    const latestDate = userStore?.bankData?.end_date
      ? new Date(userStore?.bankData?.end_date)
      : new Date();

    return accounts
      ? accounts.map((account: IAccounts, idx: number) => {
          const {account_name} = account;
          const transactionsAfterTodayBalance =
            account.transactions &&
            getTransactionsAfterTodayBalance(account.transactions, latestDate);

          let accountBalance = 0;
          if (
            transactionsAfterTodayBalance &&
            transactionsAfterTodayBalance !== 0 &&
            account.account_ending_balance
          ) {
            accountBalance =
              account.account_ending_balance + -transactionsAfterTodayBalance;
          } else if (account.account_ending_balance) {
            accountBalance = account.account_ending_balance;
          }

          return (
            <View style={styles.account_info_outer_container} key={idx}>
              <View style={styles.view_label_account_info_container}>
                <TouchableOpacity
                  onPress={() => {
                    NavigationActions.navigate('BankFeedScreen', {account});
                  }}>
                  <View style={styles.view_label_account_info_main}>
                    <View
                      style={{
                        maxWidth: isIPhoneX() ? sizeWidth(45) : sizeWidth(40),
                      }}>
                      <Text
                        style={styles.text_label_account_info_left}
                        ellipsizeMode={'tail'}
                        numberOfLines={2}>
                        {account_name}
                      </Text>
                    </View>
                    <View
                      style={styles.view_label_account_info_right_container}>
                      <Text style={styles.text_label_account_info_right}>
                        {this.transformSingleNumericToCurrency(accountBalance)}
                      </Text>
                      <Icon
                        inheritParentStyle={true}
                        style={[
                          styles.icon_row,
                          styles.icon_label_account_info_right,
                        ]}
                        source={require('../../../res/images/ic_arrow_right.png')}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      : null;
  };

  transformSingleNumericToCurrency = (num?: number) => {
    if (num && num !== 0) {
      let number = '' + Math.abs(Number(num.toFixed(2))),
        indexOfDecimal = number.indexOf('.'),
        len = number.length - 1,
        isNegative = num < 0,
        cents;
      if (indexOfDecimal !== -1) {
        cents = number.substr(indexOfDecimal, number.length - 1);
        number = number.substr(0, indexOfDecimal);
        if (cents.length === 2) {
          cents += 0;
        }
        len = number.length - 1;
      }
      if (Number(number) < 1000 && Number(number) > -1000) {
        return isNegative
          ? '-$' + number + (cents ? cents : '.00')
          : '$' + number + (cents ? cents : '.00');
      }
      let numOfCommas = Math.floor(number.length / 3),
        iter = 1,
        str = [],
        s1;
      while (numOfCommas !== 0) {
        s1 = len - iter * 3 + 1;
        str.push(number.substr(s1, 3));
        iter++;
        numOfCommas--;
      }
      if (Number(s1) > 0) {
        str.push(number.substr(0, s1));
      }
      var converted =
        '$' + str.reverse().join(',') + (cents ? cents.substr(0, 3) : '.00');
      if (converted.substr(converted.indexOf('.'), 3).length === 2) {
        converted += '0';
      }
      return isNegative
        ? '- $' + converted.substr(1, converted.length - 1)
        : converted;
    }
    return '$0.00';
  };
}
