import React, {Component} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  Platform,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {request} from '../../api/Api';
import {LOADING_COLOR} from '../../../res/style/AppStyle';
import {sizeWidth} from '../../util/Size';

import styles from './styles';
import {IProps, IState} from './FetchableList_Types';

const INITIAL_FETCHABLE_PAGE = 0;

export default class FetchableList extends Component<IProps, IState> {
  static defaultProps: {
    loadMoreEnable: boolean;
    scrollEnabled: boolean;
    refreshEnable: boolean;
    showLoadMoreIndicator: boolean;
  };
  private flatList: React.RefObject<FlatList> | null = React.createRef();

  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      firstLoad: true,
      reachedEnd: false,
      refreshing: false,
      page: INITIAL_FETCHABLE_PAGE,
      items: [],
      endpoint: this.props.endpoint,
      showLoadMoreIndicator: false,
    };
  }

  UNSAFE_componentWillReceiveProps = (nextProps: IProps) => {
    if (nextProps.endpoint !== this.props.endpoint) {
      this.setState({
        loading: false,
        reachedEnd: false,
        refreshing: false,
        page: INITIAL_FETCHABLE_PAGE,
        endpoint: nextProps.endpoint,
      });
    }

    if (nextProps.addItem !== this.props.addItem) {
      this.addItem(nextProps.addItem);
    }
  };

  componentDidUpdate = (prevProps: IProps, prevState: IState) => {
    if (prevState.endpoint !== this.state.endpoint) {
      this.reload();
    }
  };

  addItem(addItem = []) {
    const {items} = this.state;
    this.setState({
      items: [addItem, ...items],
    });
  }

  componentDidMount() {
    this.fetchFirstTime();
  }

  getItems = (data: {[x: string]: {}}, page: number) => {
    const {exceptPage} = this.props;
    if (exceptPage && exceptPage[page]) {
      const dataPath = exceptPage[page].dataPath;
      if (!dataPath) {
        return data;
      }
      const paths = dataPath.split('.');
      paths.forEach((path: string | number) => {
        data = data[path];
      });
      return data;
    }

    const {dataPath} = this.props;
    if (!dataPath) {
      return data;
    }
    const paths = dataPath.split('.');

    paths.forEach(path => {
      data = data[path];
    });

    return data;
  };

  getEndpoint = (page: number) => {
    if (this.props.loadMoreEnable) {
      const {exceptPage} = this.props;
      if (exceptPage && exceptPage[page]) {
        return exceptPage[page].url;
      }
      // @ts-ignore
      return this.state.endpoint?.replace('${page}', page);
    }

    return this.state.endpoint;
  };

  fetchFirstTime = () => {
    this.setState({
      loading: true,
    });
    const page = INITIAL_FETCHABLE_PAGE + 1;
    const endpoint = this.getEndpoint(page);
    endpoint &&
      request(endpoint, 'GET')
        .then(data => {
          const items = this.getItems(data, page);
          if (items.length !== 0) {
            this.setState({
              items: [...this.state.items, items],
              loading: false,
              firstLoad: false,
              page,
            });
          } else {
            this.setState({
              loading: false,
              reachedEnd: true,
              firstLoad: false,
              page,
            });
          }

          const {onLoad} = this.props;
          if (onLoad) {
            onLoad(data, page);
          }
        })
        .catch(error => {
          const {onError} = this.props;
          if (onError) {
            onError(error);
          }
          this.setState({
            loading: false,
            firstLoad: false,
          });
        });
  };

  fetchPage = (page: number) => {
    this.setState({
      loading: true,
    });

    const endpoint = this.getEndpoint(page);
    endpoint &&
      request(endpoint, 'GET')
        .then(data => {
          const items = this.getItems(data, page);
          if (items.length !== 0) {
            this.setState({
              items: [...this.state.items, items],
              loading: false,
              page,
            });
          } else {
            this.setState({
              loading: false,
              reachedEnd: true,
              page,
            });
          }

          const {onLoad} = this.props;
          if (onLoad) {
            onLoad(data, page);
          }
        })
        .catch(error => {
          const {onError} = this.props;
          if (onError) {
            onError(error);
          }
          this.setState({
            loading: false,
          });
        });
  };

  refresh = () => {
    this.setState({
      refreshing: true,
      loading: true,
      reachedEnd: false,
    });

    const page = INITIAL_FETCHABLE_PAGE + 1;
    const endpoint = this.getEndpoint(page);
    endpoint &&
      request(endpoint, 'GET')
        .then(data => {
          const items = this.getItems(data, page);
          if (items.length !== 0) {
            this.setState({
              items: items,
              loading: false,
              page: page,
              refreshing: false,
            });
          } else {
            this.setState({
              items: [],
              loading: false,
              reachedEnd: true,
              page: page,
              refreshing: false,
            });
          }

          const {onLoad} = this.props;
          if (onLoad) {
            onLoad(data, page);
          }
        })
        .catch(error => {
          const {onError} = this.props;
          if (onError) {
            onError(error);
          }
          this.setState({
            loading: false,
            refreshing: false,
          });
        });
    const {onRefresh} = this.props;
    if (onRefresh) {
      onRefresh();
    }
  };

  reload = () => {
    this.setState({
      loading: true,
      reachedEnd: false,
    });
    const page = INITIAL_FETCHABLE_PAGE + 1;
    const endpoint = this.getEndpoint(page);

    endpoint &&
      request(endpoint, 'GET')
        .then(data => {
          const items = this.getItems(data, page);
          if (items.length !== 0) {
            this.setState({
              items: items,
              loading: false,
              page: page,
            });
          } else {
            this.setState({
              loading: false,
              reachedEnd: true,
              page: page,
              items: [],
            });
          }

          const {onLoad} = this.props;
          if (onLoad) {
            onLoad(data, page);
          }
        })
        .catch(error => {
          const {onError} = this.props;
          if (onError) {
            onError(error);
          }
          this.setState({
            loading: false,
          });
        });
  };

  onRefresh = () => {
    const {refreshEnable} = this.props;
    if (!refreshEnable) {
      return;
    }

    const {refreshing} = this.state;
    if (!refreshing) {
      this.refresh();
    }
  };

  onEndReached = () => {
    const {loadMoreEnable} = this.props;
    if (!loadMoreEnable) {
      return;
    }

    const {loading, reachedEnd} = this.state;
    if (!reachedEnd && !loading) {
      let pageCount = this.state.page || 0;
      this.fetchPage(pageCount + 1);
    }
  };

  renderFooterComponent = () => {
    const {loading, firstLoad, refreshing, showLoadMoreIndicator} = this.state;
    if (loading && !firstLoad && !refreshing && showLoadMoreIndicator) {
      const size = Platform.OS === 'ios' ? 'large' : sizeWidth(8);
      return (
        <ActivityIndicator
          style={{marginVertical: 4}}
          animating={true}
          size={size}
          color={LOADING_COLOR}
        />
      );
    }
  };

  render() {
    const {
      EmptyComponent,
      HeaderComponent,
      keyExtractor,
      renderItem,
      renderSeparator,
      onViewableChanged,
    } = this.props;
    const {refreshEnable, loadMoreEnable} = this.props;
    const refreshing = refreshEnable ? this.state.refreshing : null;
    const onRefresh = refreshEnable ? this.onRefresh : undefined;
    const onEndReached = loadMoreEnable ? this.onEndReached : null;
    const onEndReachedThreshold = loadMoreEnable
      ? this.props.onEndReachedThreshold || 0.2
      : null;
    if (this.state.firstLoad) {
      const size = Platform.OS === 'ios' ? 'large' : sizeWidth(9);
      return (
        <View style={styles.FirstLoadWrapper}>
          <ActivityIndicator
            animating={true}
            size={size}
            color={LOADING_COLOR}
          />
        </View>
      );
    }

    if (this.state.items.length === 0 && EmptyComponent) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={Boolean(refreshing)}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={styles.Container}>
          {HeaderComponent}
          {EmptyComponent}
        </ScrollView>
      );
    }

    return (
      <FlatList
        {...this.props}
        ref={ref => (this.flatList = ref as React.RefObject<FlatList> | null)}
        ListHeaderComponent={HeaderComponent}
        data={this.state.items}
        refreshControl={
          <RefreshControl
            refreshing={Boolean(refreshing)}
            onRefresh={onRefresh}
            tintColor={LOADING_COLOR}
          />
        }
        scrollEnabled={this.props.scrollEnabled}
        ItemSeparatorComponent={renderSeparator}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold || 0}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={this.renderFooterComponent()}
        onViewableItemsChanged={onViewableChanged}
        viewabilityConfig={this.viewabilityConfig}
      />
    );
  }

  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };
}

FetchableList.defaultProps = {
  refreshEnable: true,
  loadMoreEnable: true,
  scrollEnabled: true,
  showLoadMoreIndicator: true,
};
