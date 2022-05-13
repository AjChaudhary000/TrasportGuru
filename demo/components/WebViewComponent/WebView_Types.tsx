import {WebViewNavigation} from 'react-native-webview/lib/WebViewTypes';

export interface IProps {
  uri: string;
  titleError: string;
  contentError: string;
  onNavigationStateChange?: (
    event: WebViewNavigation | string | boolean,
  ) => void;
}

export interface IState {
  loading: boolean;
  isFailed: boolean;
  progress: number;
  canGoBack?: string | boolean;
}
