import {IAccounts} from '../../mobx/UserStore_Types';
import {IRes} from '../../realm/controllers/bankActions';
import {Moment} from 'moment';
import LoadingStore from '../../mobx/LoadingStore';
import UserStore from '../../mobx/UserStore';
import BankStore from '../../mobx/BankStore';
import AWSStore from '../../mobx/AWSStore';
import ClientsStore from '../../mobx/ClientsStore';
import RealmStore from '../../mobx/RealmStore';
import NetInfoStore from '../../mobx/NetInfoStore';
import TeamStore from '../../mobx/TeamStore';

export interface IObj {
  [key: string]: number | undefined;
}

export interface ISpendingsPerYear {
  year: number;
  value: number;
}

export interface IEntityObj {
  [key: string]: string;
}

export interface IAccountObj {
  [key: string]: IAccounts;
}

export interface IMapUniqueEntities {
  [key: string]: IRes[];
}

export type State = {
  activeIndex?: number;
  spendingsPerYear?: ISpendingsPerYear[];
  selectCount?: number;
  isMounted?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
  isProcessing?: boolean;
  hasFetchedFromS3?: boolean;
  isRealmBankDataEmpty?: boolean;
  isCashReportsFetched?: boolean;
  prevRoute?: string | null;
  days?: number;
  errCode?: string | null;
  errMessage?: string | null;
  color?: boolean | null;
  //dates,
  selectedStartDate?: Date | string | null | Moment;
  selectedEndDate?: Date | string | null | Moment;
  defaultStartDate?: Date | string | null;
  defaultEndDate?: Date;
  datesApplied?: boolean;
  hasCalendarRendered?: boolean;
  hasReset?: boolean;
  minDate?: Date;
  duration?: number;
  url?: string;
};

export interface IProps {
  loadingStore?: LoadingStore;
  userStore?: UserStore;
  bankStore?: BankStore;
  awsStore?: AWSStore;
  clientsStore?: ClientsStore;
  realmStore?: RealmStore;
  netInfoStore?: NetInfoStore;
  teamStore?: TeamStore;
  isWillFocus: boolean;
  disableWillFocus: () => void;
  prevRoute?: string;
  tab: number;
  toggleTab: (bool?: boolean) => void;
}
