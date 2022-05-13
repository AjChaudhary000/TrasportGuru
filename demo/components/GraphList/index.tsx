import React, {Component} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  Platform,
  ScrollView,
  RefreshControl,
} from 'react-native';
// import * as Api from '../graphql/api';
import {sizeWidth} from '../../util/Size';
import {LOADING_COLOR} from '../../../res/style/AppStyle';
// import {handleError} from '../graphql/error';

import {IProps, IState} from './GraphList_Types';

const INITIAL_PAGE = 0;
const PATH_SEPARATOR = '.';

export default class GraphList extends Component<IProps, IState> {
  private list: React.RefObject<FlatList> | null = React.createRef();

  static defaultProps: {
    loadMoreEnable: boolean;
    scrollEnabled: boolean;
    refreshEnable: boolean;
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      firstLoad: true,
      reachedEnd: false,
      refreshing: false,
      page: INITIAL_PAGE,
      items: [],
      query: this.props.query,
      variables: this.props.variables,
    };
  }

  UNSAFE_componentWillReceiveProps = (nextProps: IProps) => {
    if (
      nextProps.query !== this.props.query ||
      nextProps.variables !== this.props.variables
    ) {
      this.setState({
        loading: false,
        reachedEnd: false,
        refreshing: false,
        page: INITIAL_PAGE,
        query: nextProps.query,
        variables: nextProps.variables,
      });
    }
  };

  componentDidUpdate = (prevProps: IProps, prevState: IState) => {
    if (
      prevState.query !== this.state.query ||
      prevState.variables !== this.state.variables
    ) {
      this.reload();
    }
  };

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
      const paths = dataPath.split(PATH_SEPARATOR);
      paths.forEach((path: string | number) => {
        data = data[path];
      });
      return data;
    }

    const {dataPath} = this.props;
    if (!dataPath) {
      return data;
    }
    const paths = dataPath.split(PATH_SEPARATOR);

    paths.forEach(path => {
      data = data[path];
    });
    return data;
  };

  getQuery = (page: number) => {
    if (this.props.loadMoreEnable) {
      const {exceptPage} = this.props;
      if (exceptPage && exceptPage[page]) {
        return exceptPage[page].query;
      }
    }

    return this.state.query;
  };

  getVariables = (page: number) => {
    const {variables} = this.state;
    if (this.props.loadMoreEnable) {
      const {exceptPage} = this.props;
      if (exceptPage && exceptPage[page]) {
        return {...exceptPage[page].variables, page};
      } else {
        return {...variables, page};
      }
    }

    return variables;
  };

  fetchFirstTime = () => {
    this.setState({
      loading: true,
    });
    // const page = INITIAL_PAGE + 1;
    // const query = this.getQuery(page);
    // const variables = this.getVariables(page);
    // Api.query(query, variables)
    //   .then((data: {[x: string]}) => {
    //     const items = this.getItems(data, page);
    //     if (items.length !== 0) {
    //       this.setState({
    //         items: [...this.state.items, items],
    //         loading: false,
    //         firstLoad: false,
    //         page,
    //       });
    //     } else {
    //       this.setState({
    //         loading: false,
    //         reachedEnd: true,
    //         firstLoad: false,
    //         page,
    //       });
    //     }
    //
    //     const {onLoad} = this.props;
    //     if (onLoad) {
    //       onLoad(data, page);
    //     }
    //   })
    //   .catch(() => {
    //     handleError(error);
    //     this.setState({
    //       loading: false,
    //       firstLoad: false,
    //     });
    //   });
  };

  fetchPage = () => {
    this.setState({
      loading: true,
    });
  };

  refresh = () => {
    this.setState({
      refreshing: true,
      loading: true,
      reachedEnd: false,
    });

    // const page = INITIAL_PAGE + 1;
    // const query = this.getQuery(page);
    // const variables = this.getVariables(page);
    // Api.query(query, variables)
    //   .then((data: {[x: string]}) => {
    //     const items = this.getItems(data, page);
    //     if (items.length !== 0) {
    //       this.setState({
    //         items: items,
    //         loading: false,
    //         page: page,
    //         refreshing: false,
    //       });
    //     } else {
    //       this.setState({
    //         items: [],
    //         loading: false,
    //         reachedEnd: true,
    //         page: page,
    //         refreshing: false,
    //       });
    //     }
    //
    //     const {onLoad} = this.props;
    //     if (onLoad) {
    //       onLoad(data, page);
    //     }
    //   })
    //   .catch(() => {
    //     handleError(error);
    //     this.setState({
    //       loading: false,
    //       refreshing: false,
    //     });
    //   });
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

    // const page = INITIAL_PAGE + 1;
    // const query = this.getQuery(page);
    // const variables = this.getVariables(page);
    // Api.query(query, variables)
    //   .then((data: {[x: string]}) => {
    //     const items = this.getItems(data, page);
    //     if (items.length !== 0) {
    //       this.setState({
    //         items: items,
    //         loading: false,
    //         page: page,
    //       });
    //     } else {
    //       this.setState({
    //         loading: false,
    //         reachedEnd: true,
    //         page: page,
    //         items: [],
    //       });
    //     }
    //
    //     const {onLoad} = this.props;
    //     if (onLoad) {
    //       onLoad(data, page);
    //     }
    //   })
    //   .catch(() => {
    //     // handleError(error);
    //     this.setState({
    //       loading: false,
    //     });
    //   });
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
      this.fetchPage();
    }
  };

  renderFooterComponent = () => {
    const {loading, firstLoad, refreshing} = this.state;
    if (loading && !firstLoad && !refreshing) {
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
      extraData,
      numColumns,
      showsHorizontalScrollIndicator,
      getItemLayout,
      initialNumToRender,
      stickyHeaderIndices,
      EmptyComponent,
      HeaderComponent,
      keyExtractor,
      renderItem,
      renderSeparator,
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
        <View>
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
              refreshing={refreshing as boolean}
              onRefresh={onRefresh}
            />
          }
          // contentContainerStyle={styles.container}
        >
          {HeaderComponent}
          {EmptyComponent}
        </ScrollView>
      );
    }

    return (
      <FlatList
        ref={list => {
          this.list = list as React.RefObject<FlatList> | null;
        }}
        stickyHeaderIndices={stickyHeaderIndices}
        numColumns={numColumns}
        ListHeaderComponent={HeaderComponent}
        data={this.state.items}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        getItemLayout={getItemLayout}
        initialNumToRender={initialNumToRender}
        refreshing={refreshing}
        scrollEnabled={this.props.scrollEnabled}
        ItemSeparatorComponent={renderSeparator}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold || 0}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={this.renderFooterComponent()}
        extraData={extraData}
      />
    );
  }
}

GraphList.defaultProps = {
  refreshEnable: true,
  loadMoreEnable: true,
  scrollEnabled: true,
};
