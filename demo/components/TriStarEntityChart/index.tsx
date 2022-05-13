import * as realmActions from '../../realm/controllers/userActions';
import * as realmBankActions from '../../realm/controllers/bankActions';

import {
  Animated,
  Modal,
  RefreshControl,
  RefreshControlProps,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLOR_APP_BLUE} from '../../../res/style/AppStyle';
import {
  MarkReportAsDownloaded,
  getCashReportByClientId,
  getEntitiesByClientId,
} from '../../api/storeProcedures';
import React, {Component} from 'react';
import {
  _checkAppSyncDateForUpdate,
  _convertDate,
  _generateCashReportForRealm,
  getDaysDifferenceInDays,
  getTransactionsAfterTodayBalance,
  parseDate,
} from './helpers';
import {convertRealmArray, encryptedRealm} from '../../realm/database';
import {inject, observer} from 'mobx-react';
import {sizeHeight, sizeWidth} from '../../util/Size';

import AppText from '../../component/Text';
import Button from '../../component/Button';
import CalendarPicker from 'react-native-calendar-picker';
import EmptyList from '../../screen/profile/TriStarClientsScreen/EmptyList';
import Fontello from '../../component/Fontello';
import Icons from '../../component/Icon';
import Pie from '../Pie';
import Theme from '../../../res/themes/Charts';
import ToolBar from '../../component/ToolBar';
import {appSettings} from '../../api/config';
import axios, {CancelTokenSource} from 'axios';
import calendarStyles from '../../screen/finance/CashFlowScreen/styles';
import data from '../../../res/data/data';
import moment from 'moment-timezone';
import styleApp from '../../../res/style/style';
// styles
import styles from './styles';

import {
  IAccounts,
  IPieBankData,
  ITransactions,
} from '../../mobx/UserStore_Types';
import {Moment} from 'moment';
import {
  IMapUniqueEntities,
  IObj,
  IEntityObj,
  IAccountObj,
  State,
  IProps,
} from './TriStarEntityChart_Types';

const {isProduction} = appSettings;

@inject('loadingStore')
@inject('userStore')
@inject('bankStore')
@inject('awsStore')
@inject('clientsStore')
@inject('realmStore')
@inject('netInfoStore')
@inject('teamStore')
@observer
export default class TriStarEntityChart extends Component<IProps, State> {
  private cancelTokenSource: CancelTokenSource;
  private calendarRef: React.RefObject<CalendarPicker> | null =
    React.createRef();
  private timeout: ReturnType<typeof setTimeout> | null = null;

  constructor(props: IProps) {
    super(props);
    this.state = {
      activeIndex: 0,
      selectCount: 0,
      spendingsPerYear: data.spendingsPerYear,
      // pieBankData: null,
      isMounted: false,
      isLoading: false,
      isFetching: false,
      hasFetchedFromS3: false,
      isRealmBankDataEmpty: false,
      prevRoute: this.props.prevRoute,
      days: this.props.bankStore?.daysRange,
      errCode: null,
      errMessage: null,
      color: null,
      //dates,
      selectedStartDate: null,
      selectedEndDate: undefined,
      defaultStartDate: null,
      defaultEndDate: undefined,
      datesApplied: false,
      hasCalendarRendered: false,
      hasReset: false,
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this._shuffle = this._shuffle.bind(this);
    this.cancelTokenSource = axios.CancelToken.source();
    this.calendarRef = null;

    Date.prototype.addDays = function (days) {
      let date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    Date.prototype.toISOStringTZ = function () {
      return moment(this).tz('America/Los_Angeles').format();
    };
  }

  async componentDidUpdate(prevProps: Readonly<IProps>) {
    if (
      this.props.isWillFocus !== prevProps.isWillFocus &&
      this.props.isWillFocus
    ) {
      const {userStore} = this.props;
      this._handleRefresh();
      userStore?.setClearCache();
      this.props.disableWillFocus();
    }
  }

  componentDidMount() {
    const {userStore, bankStore} = this.props;
    this.setState({isMounted: true}, async () => {
      if (userStore?.client_id === 9999 || !isProduction) {
        await this._loadForAppleTestUser();
        return;
      } else if (
        userStore?.client_id === undefined &&
        bankStore?.selected_client_id === undefined
      ) {
        this.setErrorCode(
          'UndefinedID',
          'Unexpected error: Please log back into the app.',
        );
        return;
      }
      await this._realmCashReportCheck();
    });
  }

  componentWillUnmount() {
    const {loadingStore} = this.props;
    loadingStore?.hideLoading();
    clearTimeout(this.timeout!);
    encryptedRealm().then(realm => {
      if (realm !== null && !realm.isClosed) {
        realm.close();
      }
    });
    if (this.state.isFetching) {
      this.setState({isFetching: false, isLoading: false});
    }
    if (this.state.errCode) {
      this.setState({errCode: null});
    }
    this.cancelTokenSource.cancel();
    if (this.state.prevRoute) {
      this.props.userStore?.updatePieBankData([]);
    }
    this.setState({prevRoute: null, isMounted: false});
  }

  render() {
    const {userStore, loadingStore} = this.props;
    const {errCode} = this.state;
    const height = 700;
    const width = 380;
    const pieBankDataLength = userStore?.pieBankData?.length || 0;
    return (
      <View style={styles.main}>
        {!loadingStore?.loading && errCode && this.renderMessagePopup()}
        {Array.isArray(userStore?.pieBankData) && pieBankDataLength > 0
          ? this.renderView(height, width)
          : !loadingStore?.loading
          ? this.renderErrorMessage()
          : null}
      </View>
    );
  }

  renderView = (height: number, width: number) => {
    const {userStore, prevRoute, clientsStore, tab} = this.props;
    let display_date = userStore?.lastAppSyncDate
      ? parseDate(userStore?.lastAppSyncDate)
      : '';
    display_date =
      display_date +
      ' : ' +
      moment(userStore?.lastAppSyncDate).format('hh:mm A');

    return tab === 1 ? (
      <ScrollView
        style={styles.outer_container}
        refreshControl={
          (tab === 1 ? (
            <RefreshControl
              refreshing={this.state.isFetching!}
              onRefresh={this._handleRefresh}
            />
          ) : null) as React.ReactElement<RefreshControlProps>
        }>
        <View style={styles.container}>
          <Text style={styles.chart_client_name}>
            {prevRoute === null || prevRoute === undefined
              ? userStore?.userData && this.defineNameToDisplay()
              : clientsStore?.observedClient &&
                typeof clientsStore?.observedClient === 'object' &&
                Object.keys(clientsStore.observedClient)?.length > 0
              ? `${clientsStore.observedClient.first_name || ''} ${
                  clientsStore.observedClient.last_name || ''
                }`
              : ''}
          </Text>
          <Text style={styles.chart_title}>Cash in The Bank</Text>
          <View
            style={styles.chart_date_container}
            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
            <AppText style={styles.chart_date}>
              As Of{' '}
              {typeof userStore?.bankData === 'object' &&
              Object.keys(userStore?.bankData!).length > 0
                ? display_date
                : 'Date Not Found'}
            </AppText>
          </View>
          <Pie
            pieWidth={250}
            pieHeight={250}
            onItemSelected={this._onPieItemSelected}
            colors={Theme.colors}
            width={width}
            height={height}
            data={userStore?.pieBankData}
            prevRoute={prevRoute!}
            hasCalendarRendered={this.state.hasCalendarRendered}
          />
        </View>
      </ScrollView>
    ) : (
      this.renderCalendar()
    );
  };

  renderCalendarToolBar = () => {
    return (
      <ToolBar
        left={<View />}
        center={
          <AppText
            style={[
              styleApp.ToolBarText,
              styleApp.toolbarAppText,
              styleApp.toolBarTextMargin,
            ]}>
            {'Select a Date'}
          </AppText>
        }
        right={
          <Icons
            source={require('../../../res/images/close_signin_15.png')}
            onPress={() => {
              this.setState(
                state => {
                  if (state.hasCalendarRendered) {
                    return null;
                  }
                  return {
                    hasCalendarRendered: true,
                  };
                },
                () =>
                  this.setState(
                    {selectedEndDate: undefined, selectedStartDate: null},
                    () => this.props.toggleTab(),
                  ),
              );
            }}
          />
        }
      />
    );
  };

  renderCalendar = () => {
    const {
      minDate,
      defaultEndDate,
      selectedStartDate,
      selectedEndDate,
      hasReset,
      errCode,
    } = this.state;
    const {tab} = this.props;
    return (
      <Modal animationType={'slide'} transparent={false} visible={tab === 2}>
        <View style={[calendarStyles.view_main, calendarStyles.calendar_modal]}>
          {errCode && tab === 2 && this.renderMessagePopup()}
          {this.renderCalendarToolBar()}
          <View style={{}}>
            {this.renderDates()}
            <CalendarPicker
              ref={ref =>
                (this.calendarRef =
                  ref as React.RefObject<CalendarPicker> | null)
              }
              onDateChange={this.onDateChange}
              minDate={minDate}
              maxDate={defaultEndDate as Date}
              initialDate={
                selectedEndDate ? (selectedEndDate as Date) : defaultEndDate
              }
              selectedStartDate={
                hasReset
                  ? undefined
                  : selectedStartDate === null
                  ? (defaultEndDate as Date)
                  : (selectedEndDate as Date)
              }
              selectedEndDate={
                hasReset
                  ? undefined
                  : selectedStartDate === null
                  ? (defaultEndDate as Date)
                  : (selectedEndDate as Date)
              }
              todayBackgroundColor={'rgba(0,0,0,0.1)'}
              todayTextStyle={calendarStyles.today_text}
              selectedDayColor={COLOR_APP_BLUE}
              selectedDayTextColor="#FFFFFF"
              allowRangeSelection={false}
              restrictMonthNavigation={false}
              dayShape={'circle'}
              previousTitle={'<'}
              previousTitleStyle={calendarStyles.calendar_title}
              nextTitle={'>'}
              nextTitleStyle={[
                calendarStyles.calendar_title,
                calendarStyles.next_title,
              ]}
              // enableSwipe={true}
              scaleFactor={375}
              textStyle={calendarStyles.calendar_text}
              dayLabelsWrapper={{
                borderBottomWidth: 0,
                borderTopWidth: 0,
              }}
              disabledDatesTextStyle={calendarStyles.disable_text}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.calendarRef?.current?.resetSelections();
              this.setState(() => {
                return {
                  selectedStartDate: null,
                  selectedEndDate: null,
                  hasReset: true,
                  selectCount: 0,
                };
              });
            }}
            style={calendarStyles.clear_selection_container}>
            <AppText style={calendarStyles.clear_selection_text}>
              Clear selection
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={calendarStyles.apply_container}
            activeOpacity={0.47}
            onPress={this.handleOnPressApply}>
            <AppText style={calendarStyles.apply_text}>{'APPLY'}</AppText>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  renderDates = () => {
    const {selectedEndDate, selectCount} = this.state;
    const start = selectedEndDate
      ? parseDate(new Date(selectedEndDate.toString()).addDays(-6))
      : 'Select Date';
    const end = selectedEndDate
      ? parseDate(new Date(selectedEndDate.toString()))
      : 'Select End Date';
    const date = selectedEndDate ? `${start}  -  ${end}` : 'Select End Date';
    return (
      <View style={[calendarStyles.date_wrapper, calendarStyles.wrapper]}>
        <View
          style={[
            calendarStyles.date_header,
            selectedEndDate !== null && selectCount && selectCount > 0
              ? calendarStyles.date_highlighted
              : {},
            calendarStyles.date_container,
          ]}>
          {this.renderToolTip()}
          <AppText
            style={[
              calendarStyles.date_text_selection,
              calendarStyles.date_selection,
            ]}>
            {date}
          </AppText>
        </View>
      </View>
    );
  };

  onDateChange = (date: Date | string | Moment) => {
    const stateSelectCount = this.state.selectCount || 0;
    this.setState({
      selectedStartDate: date,
      selectedEndDate: date,
      selectCount: stateSelectCount + 1,
    });
  };

  handleOnPressApply = async () => {
    const {selectedStartDate, selectedEndDate} = this.state;
    const {userStore} = this.props;
    if (selectedStartDate === null && selectedEndDate === null) {
      this.setErrorCode('UnselectedDates', 'Please select a valid date.');
      return;
    } else if (selectedEndDate === null) {
      this.setErrorCode('UnselectedDate', 'Please select a date.');
      return;
    }
    const days = getDaysDifferenceInDays(
      new Date(selectedEndDate?.toString()!).addDays(-7),
      selectedEndDate! as Date,
    );
    await this.setState(
      {
        days,
        datesApplied: true,
        hasCalendarRendered: true,
      },
      async () => {
        this.props.toggleTab();
        await userStore?.updatePieBankData([]);
        await this._loadCashReport();
      },
    );
    this.setErrorCode(
      'SuccessfulUpdate',
      'Your cash report has been updated.',
      true,
      3000,
    );
  };

  renderErrorMessage = () => {
    const {isLoading, isFetching} = this.state;
    const {userStore, bankStore, netInfoStore} = this.props;
    let Footer;
    if (userStore?.client_id || bankStore?.selected_client_id) {
      Footer = this.renderRetryButton;
    }
    return !isLoading && !isFetching ? (
      <EmptyList isVisible={true} FooterComponent={Footer}>
        {netInfoStore?.isConnected
          ? userStore?.client_id || bankStore?.selected_client_id
            ? 'We are sorry, there was a problem\ndownloading your cash report.\n\nPlease contact TriStar Support Team.'
            : 'No cash report to display.'
          : 'No internet connection.'}
      </EmptyList>
    ) : (
      <View />
    );
  };

  renderRetryButton = () => {
    const {bankStore, userStore, loadingStore} = this.props;
    const clientID = bankStore?.selected_client_id || userStore?.client_id;
    const retryButtonStyle = {
      width: '50%',
      marginTop: sizeHeight(3),
      opacity: clientID === null || clientID === undefined ? 0.7 : 1,
    };

    return (
      <Button
        style={retryButtonStyle}
        text={'Retry'}
        disabled={clientID === null || clientID === undefined}
        onPress={async () => {
          try {
            if (loadingStore?.loading === false) {
              loadingStore.showLoading('', true);
            } // ok
            this.setState({hasFetchedFromS3: false}, async () => {
              await this._fetchCashReports(clientID)
                .then(() => {
                  this._loadCashReport();
                })
                .catch(() => {
                  loadingStore?.hideLoading();
                });
              this.setState({isFetching: false, isLoading: false}, () => {});
            });
          } catch (err) {
            console.log('retry error:', err);
          }
        }}
      />
    );
  };

  setErrorCode = (
    code: string,
    message: string,
    color?: boolean,
    duration?: number,
  ) => {
    this.setState({errCode: code, errMessage: message, color, duration}, () => {
      this.setState({isProcessing: false, isLoading: false, isFetching: false});
    });
  };

  renderMessagePopup = () => {
    const {errCode, errMessage, color, duration} = this.state;
    clearTimeout(this.timeout!);
    if (errCode) {
      this.timeout = setTimeout(() => {
        this.setState({errCode: null, errMessage: null, color: null});
      }, duration || 7000);
    }

    return (
      <View
        style={[
          styles.view_error_container,
          color ? styles.view_error_container_blue : {},
        ]}>
        <View style={styles.view_error}>
          <AppText
            style={[styles.text_error, color ? styles.text_error_blue : {}]}>
            {errMessage}
          </AppText>
        </View>
        <View style={calendarStyles.close_icon_container}>
          <Fontello
            size={sizeWidth(3.4)}
            name={'ic_close'}
            onPress={() => this.setState({errCode: null})}
            style={calendarStyles.close_icon}
          />
        </View>
      </View>
    );
  };

  _handleRefresh = () => {
    if (!this.state.isFetching) {
      this.props.loadingStore?.showLoading('', true);
      this.setState(
        {isFetching: true, isLoading: true, hasFetchedFromS3: false},
        async () => {
          const {userStore, bankStore} = this.props;
          const clientID =
            bankStore?.selected_client_id || userStore?.client_id;
          // const clientID = 1;
          if (
            !bankStore?.selected_client_id &&
            userStore?.requireIncrementalSync
          ) {
            await this._fetchCashDataOnRefresh(clientID);
            this.setState({isFetching: false}, () => {
              this.props.loadingStore?.reset();
            });
            return;
          } else if (bankStore?.selected_client_id) {
            setTimeout(async () => {
              await this._fetchCashDataOnRefresh(clientID);
              this.props.loadingStore?.reset();
              this.setState({isFetching: false});
            }, 7000);
            return;
          } else {
            await this._fetchCashDataOnRefresh(clientID);
          }
          this.setErrorCode(
            'Up to date',
            'Your cash reports are already up to date.',
            true,
          );
        },
      );
    }
  };

  _fetchCashDataOnRefresh = async (clientID?: number) => {
    await this._fetchCashReports(clientID).then(async () => {
      await this._loadCashReport();
    });
  };

  _fetchCashReports = async (clientId?: number) => {
    try {
      this.setState({isProcessing: true});
      const {
        userStore,
        awsStore,
        clientsStore,
        loadingStore,
        realmStore,
        netInfoStore,
      } = this.props;
      // const {requireIncrementalSync, lastIncrAppSyncDate} = userStore;
      // const {dbOptions} = realmStore;
      await netInfoStore?.getStatus();
      if (!netInfoStore?.isConnected) {
        this.setState({isFetching: false, isLoading: false}, () => {
          loadingStore?.reset();
        });
        return;
      }

      let stateDays = this.state.days || 0;
      // let invHash = {},
      let date = new Date()
        .addDays(
          !userStore?.requireIncrementalSync
            ? stateDays * -1
            : Number(
                _checkAppSyncDateForUpdate(
                  userStore?.lastIncrAppSyncDate!,
                  -1,
                  true,
                ),
              ) * -1,
        )
        .toISOStringTZ();
      let startDate = date.substr(0, date.indexOf('T'));
      // Notes: this is the EndingDate to fetch the CashReport API Endpoint
      date = new Date().addDays(60).toISOStringTZ();
      let endDate = date.substr(0, date.indexOf('T'));

      await getEntitiesByClientId(clientId)
        .then(async res => {
          if (
            Object.keys(res.data.data[0]).length === 0 &&
            typeof res.data.data[0] === 'object'
          ) {
            const errorString =
              '[getEntitiesByClientId] API call was successful but returned an empty dataset.';
            throw new Error(errorString);
          }
          // Notes: iAccountsCount = TestTriStar Account used for Apple Testing and will get sample JSON
          let hash: {[index: string]: number} = {};
          // iAccountsCount = 99999;
          if (loadingStore?.loading === false) {
            loadingStore?.showLoading('', true);
          }
          await getCashReportByClientId(clientId, startDate, endDate)
            .then(async cashReportRes => {
              const data = cashReportRes.data.data[0];
              realmStore?.dbOptions &&
                (await this.props.userStore?.clearBankData(
                  realmStore?.dbOptions,
                ));
              if (Object.keys(data).length === 0) {
                const cashReportErrorString =
                  '[getCashreportByClientId] API call was successful but returned an empty dataset.';
                throw new Error(cashReportErrorString);
              }
              for (const key of Object.keys(data)) {
                let report = data[key];
                const entity_id = +report.entity_id;
                report.entity_name = report.entity_name.trim();
                report.entity_parent_client_id = report.client_id;
                report.client_name = report.client_name || '';
                report.entity_type = report.entity_type || '';
                report.entity_id = entity_id;
                report.account_parent_entity_id = entity_id;
                report.transaction_parent_account_id = report.account_id;
                report.transaction_parent_account_name = report.account_name;
                report.bank_balance = +report.bank_balance;
                report.transaction_memo = report.transaction_memo || '';
                report.transaction_payee = report.transaction_payee || '';
                report.account_beginning_balance =
                  !report.account_beginning_balance.startsWith(' ')
                    ? +report.account_beginning_balance
                    : +report.bank_balance;
                //report.account_ending_balance = !report.account_ending_balance.startsWith(' ') ? +report.account_ending_balance : +report.bank_balance;
                // Release 1.2 - ending balance needs to be the bank balance
                report.account_ending_balance = +report.bank_balance;

                report.transaction_payment = +report.transaction_payment;
                report.transaction_deposit = +report.transaction_deposit;
                report.transaction_date = !report.transaction_date.startsWith(
                  ' ',
                )
                  ? new Date(
                      report.transaction_date.substr(
                        0,
                        report.transaction_date.indexOf(' '),
                      ),
                    ).addDays(1)
                  : new Date(startDate).addDays(1); // offset one day for realm retrieval
                report.lastSyncStatus = 'Complete';
                report.lastAppSyncDate = new Date().toISOStringTZ();
                report.startDate = new Date(startDate).addDays(1);
                report.endDate = new Date().addDays(1);
                report.is_sub_account = report.is_sub_account === 1;
                report.qbo_parent_account_id = report.parent_account_id;
                // Notes: Save the returned JSON data into Realm DB
                realmStore?.dbOptions &&
                  (await realmBankActions
                    .createCashReport(report, realmStore?.dbOptions)
                    .catch(err => {
                      console.log('error writing report:', err);
                    }));
                if (!hash[report.entity_id] && +report.entity_id < 99999) {
                  hash[report.entity_id] = report.client_id;
                }
              }
            })
            .then(async () => {
              await realmActions
                .getUserByQuery(
                  `user_id = ${this.props.userStore?.id}`,
                  realmStore?.dbOptions,
                )
                .then(async user => {
                  const newDate = new Date();
                  realmStore?.dbOptions &&
                    (await realmActions.updateUser(
                      user[0].id!,
                      !userStore?.requireIncrementalSync
                        ? {
                            lastSyncStatus: 'Complete',
                            lastIncrAppSyncDate: newDate,
                            lastFullAppSyncDate: newDate,
                          }
                        : {
                            lastSyncStatus: 'Complete',
                            lastIncrAppSyncDate: newDate,
                          },
                      realmStore?.dbOptions,
                    ));
                  Object.keys(hash).forEach(key => {
                    MarkReportAsDownloaded(hash[key], key)
                      .then(() => {
                        console.log(
                          'Report marked successfully as downloaded to API',
                        );
                      })
                      .catch(err =>
                        console.log('error marking report back to api', err),
                      );
                  });
                  this.setState({isCashReportsFetched: true}, () => {});
                });
              if (loadingStore?.loading === true) {
                loadingStore?.hideLoading();
              }
            });
        })
        .catch(async () => {
          /* APPLE DEMO TESTUSER ONLY BEGIN */
          if (this.state.hasFetchedFromS3) {
            this.setState({isLoading: false, isFetching: false}, () =>
              loadingStore?.hideLoading(),
            );
            return;
          }
          if (userStore?.client_id === 9999 || !isProduction) {
            await awsStore?.getSignedUrl(
              'qbo/json/cash_reports_apple_demo2.json',
              async (err, url) => {
                this.setState({hasFetchedFromS3: true}, async () => {
                  if (err) {
                    this.setErrorCode(
                      '403',
                      'There was an unexpected network error. Status Code: 403',
                    );
                    return;
                  }
                  if (url) {
                    this.setState({isFetching: true}, async () => {
                      realmStore?.dbOptions &&
                        (await this.props.userStore
                          ?.clearBankData(realmStore?.dbOptions)
                          .then(async () => {
                            await this._FetchBankData(url);
                          }));
                    });
                  }
                  return;
                });
              },
            );
            return;
          }
          /* APPLE DEMO TESTUSER ONLY END */
          const username = this.state.prevRoute
            ? `${clientsStore?.observedClient?.first_name}${clientsStore?.observedClient?.last_name}`
            : userStore?.username;
          await awsStore?.getSignedUrl(
            `qbo/json/${username}/${username}_CashReport.json`,
            async (err, url) => {
              this.setState({hasFetchedFromS3: true}, async () => {
                if (err) {
                  this.setErrorCode(
                    '403',
                    'There was an unexpected network error. Status Code: 403',
                  );
                  return;
                }
                this.setState({isFetching: true}, async () => {
                  realmStore?.dbOptions &&
                    (await this.props.userStore
                      ?.clearBankData(realmStore?.dbOptions)
                      .then(async () => {
                        await this._FetchBankData(url);
                      }));
                });
              });
            },
          );
        });
    } catch (err) {
      this.setErrorCode('error', 'There was an unexpected network error.');
    }
  };

  _FetchBankData = async (signedUrl?: string) => {
    const {realmStore} = this.props;
    if (!this.state.isMounted) {
      return;
    }
    try {
      this.setState({isProcessing: true});
      await axios
        .get(signedUrl!, {
          timeout: 9000,
          cancelToken: this.cancelTokenSource.token,
        })
        .then(({data}) => {
          return data;
        })
        .then(async awsresult => {
          if (awsresult) {
            const {start_date, end_date} = awsresult;
            let pieArray = [],
              totalBalance = 0;
            awsresult.data.forEach(
              (entity: {
                entity_name: string;
                bank_balance: number;
                accounts: IAccounts[];
              }) => {
                const {entity_name, bank_balance, accounts} = entity;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                totalBalance += bank_balance;
                pieArray.push({
                  number: bank_balance,
                  name: entity_name,
                  accounts: accounts,
                });
              },
            );

            if (this.state.isFetching) {
              this.setState(
                {
                  isFetching: !this.state.isFetching,
                  isLoading: !this.state.isLoading,
                },
                async () => {
                  // Store info in the background into RealmDB
                  // await realmBankActions.deleteAllCashReports(dbOptions)
                  realmStore?.dbOptions &&
                    (await _generateCashReportForRealm(
                      awsresult,
                      start_date,
                      end_date,
                      realmStore?.dbOptions,
                    )
                      .then(async () => {
                        await realmActions
                          .getUserByQuery(
                            `user_id = ${this.props.userStore?.id}`,
                            realmStore?.dbOptions,
                          )
                          .then(async user => {
                            const newDate = new Date();
                            realmStore?.dbOptions &&
                              (await realmActions.updateUser(
                                user[0].id!,
                                {
                                  lastSyncStatus: 'Complete',
                                  lastIncrAppSyncDate: newDate,
                                  lastFullAppSyncDate: newDate,
                                },
                                realmStore?.dbOptions,
                              ));
                          });
                      })
                      .then(() => this._loadCashReport()));
                },
              );
            }
          }
        })
        .catch(() => {
          this.setState({hasFetchedFromS3: true});
          this.setErrorCode(
            'error',
            'There was an error downloading your report.',
          );
          if (this.props.loadingStore?.loading === true) {
            this.props.loadingStore?.hideLoading();
          }
        });
    } catch (err) {
      if (this.props.loadingStore?.loading === true) {
        this.props.loadingStore?.hideLoading();
      }
      this.setErrorCode('error', 'There was a network error.');
    }
  };

  _isAppSynced = () => {
    const {userStore, bankStore} = this.props;
    if (this.state.hasFetchedFromS3 === true) {
      return;
    }
    if (!userStore?.lastAppSyncDate) {
      this.setState({isFetching: true}, async () => {
        await this._loadCashReport();
      });
      return false;
    }

    if (
      _checkAppSyncDateForUpdate(
        userStore.lastAppSyncDate,
        bankStore?.daysToCheckForFullAppSyncUpdate,
      )
    ) {
      this.setState({isFetching: true, isLoading: true}, async () => {
        await this._loadCashReport();
      });
      return false;
    } else if (
      _checkAppSyncDateForUpdate(
        userStore.lastAppSyncDate,
        bankStore?.daysToCheckForFullAppSyncUpdate,
      )
    ) {
      this.setState({isFetching: true, isLoading: true}, async () => {
        await this._FetchBankData();
      });
      return false;
    }
    return true;
  };
  _onPieItemSelected(newIndex: number) {
    this.setState({...this.state, activeIndex: newIndex});
  }

  _shuffle(a: []) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  _realmCashReportCheck = async () => {
    const {userStore, bankStore, realmStore} = this.props;
    let clientID = bankStore?.selected_client_id || userStore?.client_id;
    realmStore?.dbOptions &&
      (await realmBankActions
        .getCashReportsByQuery(
          `entity_parent_client_id = ${clientID}`,
          realmStore?.dbOptions,
        )
        .then(async res => {
          if (res && res.length === 0) {
            this.props.loadingStore?.showLoading('', true);
            setTimeout(async () => {
              await this._loadCashReport();
            }, 7000);
          } else if (res && res.length) {
            // entity remapping
            await this._loadCashReport();
          }
        }));
  };

  _loadCashReport = async () => {
    const {hasFetchedFromS3, selectedEndDate, isMounted} = this.state;
    const {
      userStore,
      bankStore,
      loadingStore,
      netInfoStore,
      teamStore,
      realmStore,
    } = this.props;
    let pieBankData: IPieBankData[] = [],
      accountsArr: IAccounts[] = [],
      latestDate: Date | string | undefined,
      oldestDate: Date | string | undefined | null,
      totalBalance = 0,
      transactionsTotalBalance = 0,
      totalTax = 0,
      taxHash: IObj = {};
    let clientID = bankStore?.selected_client_id || userStore?.client_id;

    let calendarEndDate = selectedEndDate
      ? new Date(selectedEndDate.toString()).addDays(0)
      : null;
    let calendarStartDate = selectedEndDate
      ? new Date(selectedEndDate.toString()).addDays(-6)
      : null;
    if (!isMounted || !userStore?.isAuthenticated) {
      if (loadingStore?.loading) {
        loadingStore.reset();
      }
      return;
    }
    if (hasFetchedFromS3 && userStore.client_id !== 9999) {
      loadingStore?.hideLoading();
      return;
    }
    realmStore?.dbOptions &&
      (await realmBankActions
        .getCashReportsByQuery(
          `entity_parent_client_id = ${clientID}`,
          realmStore?.dbOptions,
        )
        .then(async res => {
          if (res && res.length === 0) {
            if (!netInfoStore?.isConnected) {
              this.setState({isFetching: false, isLoading: false});
              return;
            }
            this.setState({isFetching: true, isLoading: true}, async () => {
              await this._fetchCashReports(clientID).then(async () => {
                await this._loadCashReport(); // recursively call function again once cash reports are loaded
                this.setState({isFetching: false, isLoading: false});
              });
            });
          } else if (res && res.length) {
            // entity remapping
            let mapUniqueEntities: IMapUniqueEntities = {},
              entityObj: IEntityObj = {},
              accountsObj: IAccountObj = {};
            let data = convertRealmArray(res);
            data.forEach(
              (entity: {
                entity_id: number;
                entity_name: string;
                lastAppSyncDate: Date;
                entity_type: string;
              }) => {
                if (!mapUniqueEntities[entity.entity_id]) {
                  mapUniqueEntities[entity.entity_id] = [];
                  mapUniqueEntities[entity.entity_id].push(entity);
                } else {
                  mapUniqueEntities[entity.entity_id].push(entity);
                }
                if (!entityObj[entity.entity_name]) {
                  entityObj[entity.entity_name] = entity.entity_name;
                  pieBankData.push({
                    lastAppSyncDate: entity.lastAppSyncDate,
                    entity_id: entity.entity_id,
                    entity_type: entity.entity_type,
                    name: entity.entity_name,
                    number: 0,
                    accounts: [],
                  });
                }
              },
            );
            for (const key of Object.keys(mapUniqueEntities)) {
              for (const item of mapUniqueEntities[key]) {
                const {
                  entity_id,
                  account_id,
                  account_parent_entity_id,
                  account_name,
                  account_type,
                  qbo_account_id,
                  qbo_parent_account_id,
                  is_sub_account,
                  transaction_date,
                  account_beginning_balance,
                  account_ending_balance, // only grabbing first unique account ending balance and needs to account repeated rows
                } = item;
                if (
                  calendarEndDate !== null &&
                  transaction_date &&
                  calendarEndDate.addDays(1) < transaction_date
                ) {
                  if (!latestDate && !oldestDate) {
                    latestDate = calendarEndDate;
                    oldestDate = calendarStartDate;
                  }
                  continue;
                }
                async function genTransactions() {
                  let txnArr: ITransactions[] = [],
                    filteredSearch;
                  realmStore?.dbOptions &&
                    realmBankActions
                      .getCashReportsByQuery(
                        `account_parent_entity_id = "${entity_id}" AND transaction_parent_account_id = "${account_id}" AND account_name = "${account_name}"`,
                        realmStore?.dbOptions,
                      )
                      .then(res => {
                        if (res && res.length) {
                          filteredSearch = convertRealmArray(res);
                          filteredSearch.forEach(
                            ({
                              account_beginning_balance,
                              account_ending_balance,
                              transaction_parent_account_id,
                              transaction_parent_account_name,
                              transaction_id,
                              transaction_ref_no,
                              transaction_payee,
                              transaction_memo,
                              transaction_deposit,
                              transaction_payment,
                              transaction_type,
                              transaction_date,
                              startDate,
                              endDate,
                              txn_added_or_matched,
                              txn_clear_or_reconcile,
                            }: ITransactions) => {
                              // Filter Dates
                              const transactionObj = {
                                account_beginning_balance,
                                account_ending_balance,
                                transaction_parent_account_id,
                                transaction_parent_account_name,
                                transaction_id,
                                transaction_ref_no,
                                transaction_payee,
                                transaction_memo,
                                transaction_deposit,
                                transaction_payment,
                                transaction_type,
                                transaction_date,
                                startDate,
                                endDate,
                                txn_added_or_matched,
                                txn_clear_or_reconcile,
                              };
                              if (calendarEndDate === null) {
                                if (!latestDate && !oldestDate) {
                                  latestDate = endDate;
                                  oldestDate = startDate;
                                } else {
                                  latestDate =
                                    latestDate &&
                                    endDate &&
                                    latestDate >= endDate
                                      ? latestDate
                                      : endDate;
                                  oldestDate =
                                    oldestDate &&
                                    startDate &&
                                    oldestDate <= startDate
                                      ? oldestDate
                                      : startDate;
                                }

                                txnArr.push(transactionObj);
                              } else if (
                                transaction_date &&
                                transaction_date <= calendarEndDate.addDays(1)
                              ) {
                                if (!latestDate && !oldestDate) {
                                  latestDate = calendarEndDate;
                                  oldestDate = calendarStartDate;
                                }

                                txnArr.push(transactionObj);
                              }
                            },
                          );
                        }
                      });
                  return txnArr;
                }

                if (
                  !accountsObj[`${account_name}_${account_parent_entity_id}`]
                ) {
                  // unique account mapping
                  let obj: IAccounts = {
                    account_id,
                    account_parent_entity_id,
                    account_name,
                    account_type,
                    account_beginning_balance,
                    account_ending_balance,
                    is_sub_account,
                    qbo_account_id,
                    qbo_parent_account_id,
                  };
                  obj.transactions = await genTransactions();
                  accountsObj[`${account_name}_${account_parent_entity_id}`] =
                    obj;
                  accountsArr.push(obj); // push in representation of each unique account
                } else if (
                  accountsObj[`${account_name}_${account_parent_entity_id}`]
                ) {
                  // implicit pointers
                  if (account_beginning_balance != null) {
                    accountsObj[
                      `${account_name}_${account_parent_entity_id}`
                    ].account_ending_balance = account_ending_balance;
                  }
                }
              }
            }
            for (const entity of pieBankData) {
              userStore.lastAppSyncDate = entity.lastAppSyncDate;
              if (userStore.lastAppSyncDate < entity.lastAppSyncDate) {
                userStore.lastAppSyncDate = entity.lastAppSyncDate;
                this._isAppSynced();
              }
              for (const account of accountsArr) {
                if (account.account_parent_entity_id === entity.entity_id) {
                  entity.accounts.push(account);

                  const transactionsAfterTodayBalance =
                    account.transactions &&
                    getTransactionsAfterTodayBalance(
                      account.transactions,
                      latestDate,
                    );

                  if (
                    transactionsAfterTodayBalance &&
                    transactionsAfterTodayBalance !== 0 &&
                    account.account_ending_balance
                  ) {
                    transactionsTotalBalance +=
                      account.account_ending_balance +
                      -transactionsAfterTodayBalance;
                    entity.number += account.account_ending_balance;
                    totalBalance += account.account_ending_balance;
                  } else if (account.account_ending_balance) {
                    transactionsTotalBalance += account.account_ending_balance;
                    entity.number += account.account_ending_balance;
                    totalBalance += account.account_ending_balance;
                  }
                }
                if (
                  account.account_name &&
                  (account.account_name.indexOf('TAX') !== -1 ||
                    account.account_name.indexOf('Tax') !== -1) &&
                  !taxHash[account.account_name]
                ) {
                  taxHash[account.account_name] =
                    account.account_ending_balance;
                  if (account.account_ending_balance) {
                    totalTax += account.account_ending_balance;
                  }
                }
              }
            }
            pieBankData = pieBankData?.sort((a, b) => {
              return a.entity_type.indexOf('Individual') !== -1
                ? -1
                : b.entity_type.indexOf('Individual') !== -1
                ? 1
                : a.name >= b.name
                ? 1
                : -1;
            });
            let display_date = latestDate && parseDate(latestDate as Date);
            userStore.bankData = {
              start_date: _convertDate(oldestDate!, '/'), // e.g. start_date: '2019-12-01',
              end_date: _convertDate(latestDate!, '/'), // e.g. end_date: '2020-01-01',
              display_end_date:
                display_date + ' : ' + moment(latestDate).format('hh:mm A'),
            };
            if (!bankStore?.selected_client_id) {
              teamStore?.setEntityCount(pieBankData.length);
            }
            userStore.updatePieBankData(pieBankData);
            userStore.setTotalBalance(totalBalance);
            userStore.setTransactionsTotalBalance(transactionsTotalBalance);
            bankStore?.setTotalTax(totalTax);
          } else {
            this._isAppSynced();
          }
        }));
    this.setState({isLoading: false}, () => {
      if (this.props.loadingStore?.loading) {
        if (
          Array.isArray(userStore.pieBankData) &&
          userStore.pieBankData.length > 0
        ) {
          this.props.loadingStore?.reset();
        } // OK
        else if (this.state.hasFetchedFromS3) {
          this.props.loadingStore?.reset();
        }
      }
      return;
    });
  };

  renderToolTip = () => {
    const {minDate, defaultEndDate} = this.state;
    return (
      <Animated.View
        style={[
          calendarStyles.view_tooltip,
          {marginTop: sizeHeight(-0.1), height: sizeHeight(2.6)},
        ]}>
        <View style={calendarStyles.oval_tooltip}>
          <Text style={calendarStyles.oval_text}>i</Text>
        </View>
        <AppText
          style={calendarStyles.text_tooltip}
          numberOfLines={
            2
          }>{`You may select a date within the past ${Math.floor(
          getDaysDifferenceInDays(minDate, defaultEndDate?.addDays(1)),
        )} days.`}</AppText>
      </Animated.View>
    );
  };
  defineNameToDisplay = (optional?: string) => {
    const {userStore} = this.props;
    if (userStore?.userData) {
      const {userData} = userStore;
      if (optional) {
        return optional;
      }
      if (userData === null) {
        return 'Username Not Found';
      }
      if (userData.display_name) {
        return userData.display_name;
      } else if (
        userData.first_name &&
        userData.last_name &&
        userData.display_name
      ) {
        return `${userData.first_name} "${userData.display_name}" ${userData.last_name}`;
      } else if (userData.first_name && userData.last_name) {
        return userStore?.getFullName;
      }

      return userData.user;
    }
  };

  _loadForAppleTestUser = async () => {
    /* APPLE DEMO TEST USER BEGIN */
    const {userStore, awsStore, loadingStore, realmStore} = this.props;
    if (
      (userStore?.client_id === 9999 &&
        this.state.hasFetchedFromS3 === false) ||
      (!isProduction && this.state.hasFetchedFromS3 === false)
    ) {
      loadingStore?.showLoading('', true);
      realmStore?.dbOptions &&
        (await realmBankActions
          .getCashReportsByQuery(
            'entity_parent_client_id = client_id',
            realmStore?.dbOptions,
          )
          .then(async res => {
            if (res && Object.keys(res).length === 0) {
              await awsStore?.getSignedUrl(
                'qbo/json/cash_reports_apple_demo2.json',
                async (err, url) => {
                  this.setState({hasFetchedFromS3: true}, async () => {
                    if (err) {
                      this.setErrorCode(
                        '403',
                        'There was an unexpected network error.',
                      );
                      return;
                    }
                    this.setState({isFetching: true, url}, async () => {
                      if (this.state.url) {
                        await this._FetchBankData(this.state.url);
                      }
                    });
                    return;
                  });
                },
              );
              return;
            }
            await this._loadCashReport();
          })
          .catch(() => {
            this.setErrorCode(
              '',
              'There was an error getting your cash report.',
            );
          }));
      loadingStore?.hideLoading();
    }
    return;
    /* APPLE DEMO TEST USER END */
  };
}
