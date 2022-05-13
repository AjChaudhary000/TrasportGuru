import NetInfoStore from '../../mobx/NetInfoStore';
import moment from 'moment';

export interface IProps {
  netInfoStore?: NetInfoStore;
  isVisible: boolean;
}

export interface IState {
  eventDate?: moment.Duration;
  days?: number;
  hours?: number;
  mins?: number;
  secs?: number;
  millis?: number;
  status?: string;
  startTime?: string;
  currentTime?: string;
}
