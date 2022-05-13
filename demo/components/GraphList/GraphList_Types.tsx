import React from 'react';
import {FlatList, FlatListProps} from 'react-native';

interface IExceptPage {
  dataPath: string;
  variables: {};
  query: string;
}

export interface IProps extends FlatListProps<FlatList> {
  query: string;
  variables: {};
  exceptPage: IExceptPage[];
  dataPath: string;
  loadMoreEnable: boolean;
  onLoad: (data: {[x: string]: {}}, page: number) => void;
  onRefresh: () => void;
  refreshEnable: boolean;
  numColumns: number;
  showsHorizontalScrollIndicator: boolean;
  stickyHeaderIndices: number[];
  EmptyComponent: React.ReactNode;
  HeaderComponent: React.ReactElement;
  initialNumToRender: number;
  renderSeparator: typeof React.Component;
  onEndReachedThreshold?: number | null;
  scrollEnabled: boolean;
}

export interface IState {
  loading: boolean;
  firstLoad: boolean;
  reachedEnd: boolean;
  refreshing: boolean;
  page: number;
  items: [];
  query: string;
  variables: {};
}
