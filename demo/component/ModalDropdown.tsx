import React, {Component} from 'react';

import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {sizeWidth} from '../util/Size';
import {FlatList} from 'react-native-gesture-handler';
import {COLOR_PLACEHOLDER} from '../../res/style/AppStyle';
import {IProps, IState} from '../components/ModalDropdown/ModalDropdown_Types';

export default class ModalDropdown extends Component<IProps, IState> {
  static defaultProps = {
    disabled: false,
    scrollEnabled: true,
    defaultIndex: -1,
    defaultValue: 'Please select...',
    options: null,
    animated: true,
    showsVerticalScrollIndicator: true,
    keyboardShouldPersistTaps: 'never',
  };
  private _button: React.RefObject<TouchableOpacity> | null = React.createRef();
  private _nextIndex?: number | null;
  private _nextValue?: {name: string} | string | null;
  private _buttonFrame: {w: number; x: number; h: number; y: number} | null;

  constructor(props: IProps) {
    super(props);

    this._button = null;
    this._buttonFrame = null;
    this._nextValue = null;
    this._nextIndex = null;

    this.state = {
      disabled: props.disabled,
      accessible: !!props.accessible,
      loading: props.options === null || props.options === undefined,
      showDropdown: false,
      buttonText: props.defaultValue,
      selectedIndex: props.defaultIndex,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    let buttonText =
      this._nextValue == null
        ? this.state.buttonText
        : (typeof this._nextValue !== 'string' &&
            this._nextValue.name &&
            this._nextValue.name.toString()) ||
          (this._nextValue as string);
    let selectedIndex =
      this._nextIndex == null ? this.state.selectedIndex : this._nextIndex;
    if (selectedIndex && selectedIndex < 0) {
      selectedIndex = nextProps.defaultIndex;
      buttonText = nextProps.defaultValue;
    }
    this._nextValue = null;
    this._nextIndex = null;
    this.setState({
      disabled: nextProps.disabled,
      loading: nextProps.options == null,
      buttonText: buttonText,
      selectedIndex: selectedIndex,
    });
  }

  render() {
    const {options} = this.props;
    return (
      <View {...this.props}>
        {(options?.length || 0) > 1 ? this._renderButton() : this._renderView()}
        {this._renderModal()}
      </View>
    );
  }

  _updatePosition(callback: {(): void}) {
    if (this._button && this._button?.current?.measure) {
      this._button?.current?.measure(
        (
          fx: number,
          fy: number,
          width: number,
          height: number,
          px: number,
          py: number,
        ) => {
          this._buttonFrame = {x: px, y: py, w: width, h: height};
          callback && callback();
        },
      );
    }
  }

  show() {
    this._updatePosition(() => {
      this.setState({
        showDropdown: true,
      });
    });
  }

  hide() {
    this.setState({
      showDropdown: false,
    });
  }

  select(idx?: number | null) {
    let value = this.props.defaultValue;
    if (
      idx == null ||
      this.props.options == null ||
      idx >= this.props.options.length
    ) {
      idx = this.props.defaultIndex;
    }

    if (idx && idx >= 0) {
      value = this.props.options?.[idx].toString();
    }

    this._nextValue = value;
    this._nextIndex = idx;

    this.setState({
      buttonText: value,
      selectedIndex: idx,
    });
  }

  _renderButton() {
    const tintColor = StyleSheet.flatten([
      styles.image,
      {
        // tintColor: this.props.typeTheme.otc.TEXT,
      },
    ]);

    return (
      <TouchableOpacity
        ref={button =>
          (this._button = button as React.RefObject<TouchableOpacity> | null)
        }
        disabled={this.props.disabled}
        accessible={this.props.accessible}
        onPress={this._onButtonPress.bind(this)}>
        {this.props.children || (
          <View style={styles.button}>
            <Text
              style={[styles.buttonText, this.props.textStyle]}
              numberOfLines={1}>
              {this.state.buttonText}
            </Text>
            <Image
              resizeMode={'contain'}
              style={[styles.image, tintColor]}
              source={require('../../res/images/backBlackArrow.png')}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  }

  _renderView() {
    return (
      <View>
        {this.props.children || (
          <View style={styles.button}>
            <Text
              style={[styles.buttonText, this.props.textStyle]}
              numberOfLines={1}>
              {this.state.buttonText}
            </Text>
          </View>
        )}
      </View>
    );
  }

  _onButtonPress() {
    if (
      !this.props.onDropdownWillShow ||
      this.props.onDropdownWillShow() !== false
    ) {
      this.show();
    }
  }

  _renderModal() {
    if (this.state.showDropdown && this._buttonFrame) {
      const frameStyle = this._calcPosition();
      const animationType = this.props.animated ? 'fade' : 'none';
      return (
        <Modal
          animationType={animationType}
          visible={true}
          transparent={true}
          onRequestClose={this._onRequestClose.bind(this)}
          supportedOrientations={[
            'portrait',
            'portrait-upside-down',
            'landscape',
            'landscape-left',
            'landscape-right',
          ]}>
          <TouchableWithoutFeedback
            accessible={this.props.accessible}
            disabled={!this.state.showDropdown}
            onPress={this._onModalPress.bind(this)}>
            <View style={styles.modal}>
              <View
                style={[styles.dropdown, this.props.dropdownStyle, frameStyle]}>
                {this.state.loading
                  ? this._renderLoading()
                  : this._renderDropdown()}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      );
    }
  }

  _calcPosition() {
    const dimensions = Dimensions.get('window');
    const windowWidth = dimensions.width;
    const windowHeight = dimensions.height;

    const dropdownHeight =
      (this.props.dropdownStyle &&
        StyleSheet.flatten(this.props.dropdownStyle).height) ||
      StyleSheet.flatten(styles.dropdown).height;
    if (this._buttonFrame) {
      const bottomSpace =
        windowHeight - this._buttonFrame?.y - this._buttonFrame?.h;
      const rightSpace = windowWidth - this._buttonFrame?.x;
      const showInBottom =
        bottomSpace >= (dropdownHeight || 0) ||
        bottomSpace >= this._buttonFrame?.y;
      const showInLeft = rightSpace >= this._buttonFrame?.x;

      let style: StyleProp<ViewStyle> = {
        height: dropdownHeight,
        top: showInBottom
          ? this._buttonFrame?.y + this._buttonFrame?.h
          : Math.max(0, this._buttonFrame?.y - Number(dropdownHeight || 0)),
      };

      if (showInLeft) {
        style.left = this._buttonFrame?.x - 1;
      } else {
        const dropdownWidth =
          (this.props.dropdownStyle &&
            StyleSheet.flatten(this.props.dropdownStyle).width) ||
          (this.props.style && StyleSheet.flatten(this.props.style).width) ||
          -1;
        if (dropdownWidth !== -1) {
          style.width = dropdownWidth;
        }
        style.right = rightSpace - this._buttonFrame?.w - 1;
      }

      if (this.props.adjustFrame) {
        style = this.props.adjustFrame(style) || style;
      }

      return style;
    }
  }

  _onRequestClose() {
    if (
      !this.props.onDropdownWillHide ||
      this.props.onDropdownWillHide() !== false
    ) {
      this.hide();
    }
  }

  _onModalPress() {
    if (
      !this.props.onDropdownWillHide ||
      this.props.onDropdownWillHide() !== false
    ) {
      this.hide();
    }
  }

  _renderLoading() {
    return <ActivityIndicator size="small" />;
  }

  _renderDropdown() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.options}
        renderItem={this._renderItemDrop}
      />
    );
  }

  _renderItemDrop = ({
    item,
    index,
  }: {
    item: {key: string | null};
    index: number;
  }) => {
    const itemKey = item.key;
    return (
      <TouchableHighlight
        onPress={item =>
          this._onRowPressFlat(item as unknown as string, index, itemKey)
        }>
        <Text
          style={[
            styles.rowText,
            this.props.dropdownTextStyle,
            styles.highlightedRowText,
            this.props.dropdownTextHighlightStyle,
          ]}>
          {item.key}
        </Text>
      </TouchableHighlight>
    );
  };

  _onRowPressFlat(item: string, index: number, itemKey: string | null) {
    const {onSelect, renderButtonText, onDropdownWillHide} = this.props;
    onSelect && onSelect({value: itemKey, index: 0});
    this.setState({
      buttonText:
        (renderButtonText && itemKey && renderButtonText(itemKey)) ||
        itemKey?.toString(),
      selectedIndex: index,
    });

    if (!onDropdownWillHide || onDropdownWillHide() !== false) {
      this.setState({
        showDropdown: false,
      });
    }
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    flex: 1,
  },
  modal: {
    flexGrow: 1,
  },
  dropdown: {
    position: 'absolute',
    borderWidth: 1,
    marginTop: 5,
    borderColor: COLOR_PLACEHOLDER,
    borderRadius: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: undefined,
  },
  loading: {
    alignSelf: 'center',
  },
  list: {},
  rowText: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    fontSize: 11,
    color: 'gray',
    backgroundColor: 'white',
    textAlignVertical: 'center',
  },
  highlightedRowText: {
    color: 'black',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'lightgray',
  },
  image: {
    marginRight: sizeWidth(3),
    width: sizeWidth(5),
    height: sizeWidth(5),
    transform: [
      {
        rotate: '270deg',
      },
    ],
  },
});
