import LoadingStore from '../../mobx/LoadingStore';
import UserStore from '../../mobx/UserStore';
import {Animated} from 'react-native';
import moment from 'moment';

export interface IProps {
  loadingStore?: LoadingStore;
  userStore?: UserStore;
}

export interface IState {
  eventDate?: moment.Duration;
  days?: number;
  hours?: number;
  mins?: number;
  secs?: number;
  millis?: number;
  startTime?: string;
  currentTime?: string;
  fadeIn?: Animated.Value;
  timerDidFinish?: Boolean;
  secondsToReRouteToLogin?: number;
  forceLogoutDidStart?: boolean;
  status?: string;
  deviceName?: Promise<string>;
  device?: string;
  sysVersion?: string;
  totalDiskCapacity?: number | string;
  freeDiskStorage?: number | string;
  usedStorage?: number | string;
  connectionStatus?: string;
  showLogin?: boolean;
  isHidden?: boolean;
}
