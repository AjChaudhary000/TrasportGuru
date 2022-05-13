import React from 'react';
import {FlatList, FlatListProps, ViewToken} from 'react-native';

export interface IExceptPage {
  dataPath: string;
  url: string;
}

export interface IProps extends FlatListProps<FlatList> {
  endpoint: string;
  addItem: any;
  exceptPage: IExceptPage[];
  dataPath: string;
  loadMoreEnable: boolean;
  onError: (err: string) => void;
  onLoad: (data: {[x: string]: {}}, page: number) => void;
  onRefresh: () => void;
  refreshEnable: boolean;
  refreshing?: boolean;
  EmptyComponent: React.ReactNode;
  HeaderComponent: React.ReactElement;
  renderSeparator: typeof React.Component;
  onViewableChanged:
    | ((info: {
        viewableItems: Array<ViewToken>;
        changed: Array<ViewToken>;
      }) => void)
    | null;
  onEndReachedThreshold: number;
  scrollEnabled: boolean;
}

export interface IState {
  loading?: boolean;
  firstLoad?: boolean;
  reachedEnd?: boolean;
  refreshing?: boolean;
  page?: number;
  items?: any;
  endpoint?: string;
  showLoadMoreIndicator?: boolean;
}
