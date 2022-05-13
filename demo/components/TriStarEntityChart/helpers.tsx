import {IAccounts, ITransactions} from '../../mobx/UserStore_Types';
import * as realmBankActions from '../../realm/controllers/bankActions';
import {IBankData} from '../../realm/controllers/bankActions';
import IDbOptions from '../../mobx/Types';

interface IData {
  entity_id: number;
  entity_name: string;
  entity_type: string;
  accounts: IAccounts[];
  bank_balance: number | string;
}

interface IBankDataHelper {
  client_id: number;
  client_name: string;
  start_date: Date | string;
  end_date: Date | string;
  data: IData[];
}

export const _generateCashReportForRealm = async (
  bankData: IBankDataHelper,
  start_date: string | Date,
  end_date: string | Date,
  dbOptions: IDbOptions,
) => {
  try {
    let pieArray: unknown = [];
    for (let a of bankData.data) {
      const {entity_id, entity_name, entity_type, bank_balance, accounts} = a;
      for (let i of accounts) {
        if (i?.transactions) {
          for (let j of i?.transactions) {
            let {
              account_id,
              account_name,
              account_type,
              account_beginning_balance,
              account_ending_balance,
            } = i;
            let {
              transaction_id,
              transaction_ref_no,
              transaction_payee,
              transaction_memo,
              transaction_deposit,
              transaction_payment,
              transaction_type,
              transaction_date,
              txn_added_or_matched,
              txn_clear_or_reconcile,
            } = j;
            const obj = Object.assign(
              {},
              {
                client_id: bankData.client_id,
                client_name: bankData.client_name,
                lastSyncStatus: 'Complete',
                lastAppSyncDate: new Date(),
                startDate: start_date,
                endDate: end_date,
                entity_id,
                entity_parent_client_id: bankData.client_id,
                entity_name,
                entity_type,
                bank_balance:
                  bank_balance === ' '
                    ? i?.account_ending_balance
                    : bank_balance,
                account_id,
                account_parent_entity_id: entity_id,
                account_name,
                account_type,
                account_beginning_balance,
                account_ending_balance,
                transaction_parent_account_id: account_id,
                transaction_parent_account_name: account_name,
                transaction_id: '' + transaction_id,
                transaction_ref_no: '' + transaction_ref_no,
                transaction_payee,
                transaction_memo,
                transaction_deposit,
                transaction_payment,
                transaction_type,
                transaction_date,
                txn_added_or_matched,
                txn_clear_or_reconcile,
              },
            );
            await realmBankActions
              .createCashReport(obj as IBankData, dbOptions)
              .catch(err => {
                console.log('error writing report', err);
              });
          }
        }
      }
    }
    return pieArray;
  } catch (err) {
    return err;
  }
};

export const _convertDate = (date?: string | Date, separator?: string) => {
  if (date && typeof date === 'string' && date.indexOf('Z') === -1) {
    // if ISOstring
    return date;
  }
  if (date) {
    let newDate: Date | string = new Date(date); // otherwise, create date if formatted as '20xx-yy-zz'
    if (separator) {
      newDate = `${
        newDate.getMonth() + 1
      }${separator}${newDate.getDate()}${separator}${newDate.getFullYear()}`;
    }
    return newDate;
  }
};

export const _checkAppSyncDateForUpdate = (
  date: string | Date,
  intDays = 0,
  optional?: boolean,
) => {
  var currentDate = new Date();
  var lastSyncDate = new Date(date);
  var diffDate = Math.abs(Number(currentDate) - Number(lastSyncDate));
  var hours = diffDate / 36e5;
  var days = Math.floor(hours / 24);
  if (optional) {
    // optional third parameter to return an integer value in days
    return days;
  }
  return hours > 24 * intDays;
};

export const parseDate = (date: Date) => {
  let string = date?.toString()?.split(' ');
  string[2] += ',';
  return string.slice(1, 4).join(' ');
};

//Fri Dec 27 2019 06:35:56 GMT-0800 (Pacific Standard Time)

export const getDaysDifferenceInDays = (
  start?: number | Date,
  end?: number | Date,
) => {
  return Math.abs(Number(end) - Number(start)) / 36e5 / 24;
};

export const getLatestTransactionEndingBalance = (
  accountTransactions: ITransactions[],
) => {
  const sortedTransactions = accountTransactions.sort(
    (a: ITransactions, b: ITransactions) => {
      if (
        a?.transaction_id &&
        b?.transaction_id &&
        a?.transaction_date?.getDate() === b?.transaction_date?.getDate()
      ) {
        return +b?.transaction_id - +a?.transaction_id;
      } else if (a?.transaction_date && b?.transaction_date) {
        return +new Date(b?.transaction_date) - +new Date(a?.transaction_date);
      } else {
        return 1;
      }
    },
  );
  const transaction = sortedTransactions?.[0];
  return transaction?.account_beginning_balance;
};

export const getTransactionsAfterTodayBalance = (
  accountTransactions: ITransactions[],
  latestDate: string | Date = new Date(),
) => {
  return accountTransactions.reduce((previousValue: number, currentValue) => {
    if (
      currentValue.transaction_payment != null &&
      currentValue?.transaction_deposit != null &&
      currentValue?.transaction_date &&
      latestDate &&
      currentValue.transaction_date > latestDate
    ) {
      return (
        previousValue +
        currentValue.transaction_payment +
        currentValue?.transaction_deposit
      );
    } else {
      return previousValue;
    }
  }, 0);
};
