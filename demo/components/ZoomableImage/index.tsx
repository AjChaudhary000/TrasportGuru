import React, {Component} from 'react';
import {
  View,
  PanResponder,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponderInstance,
  LayoutChangeEvent,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {calcDistance, calcCenter, maxOffset, calcOffsetByZoom} from './helpers';
import {isBase64Img, isValidImgUrl} from '../../util/ImageUtils';
import {sizeHeight} from '../../util/Size';
import {isIPhoneX} from '../../util/Device';
import {Metrics} from '../../../res/themes';
import {inject, observer} from 'mobx-react';
import ImageViewerStore from '../../mobx/ImageViewerStore';
import {IProfileImage} from '../../mobx/TeamStore_Types';

interface IProps {
  imageWidth: number;
  imageHeight: number;
  onPress?: () => void;
  imageViewerStore?: ImageViewerStore;
  source: ImageSourcePropType | string | IProfileImage | number;
  style?: StyleProp<ViewStyle>;
}
interface IState {
  zoom: number | null;
  minZoom: number | null;
  layoutKnown: boolean;
  isZooming: boolean;
  isMoving: boolean;
  initialDistance: number | null;
  initialX: number | null;
  initialY: number | null;
  offsetTop: number;
  offsetLeft: number;
  initialTop: number;
  initialLeft: number;
  initialTopWithoutZoom: number;
  initialLeftWithoutZoom: number;
  initialZoom: number | null;
  top: number;
  left: number;
  width?: number;
  height?: number;
  fadeIn: Animated.Value;
}

@inject('imageViewerStore')
@observer
export default class ZoomableImage extends Component<IProps, IState> {
  private _panResponder: PanResponderInstance | null = null;
  constructor(props: IProps) {
    super(props);
    this.state = {
      zoom: null,
      minZoom: null,
      layoutKnown: false,
      isZooming: false,
      isMoving: false,
      initialDistance: null,
      initialX: null,
      initialY: null,
      offsetTop: 0,
      offsetLeft: 0,
      initialTop: 0,
      initialLeft: 0,
      initialTopWithoutZoom: 0,
      initialLeftWithoutZoom: 0,
      initialZoom: 1,
      top: 0,
      left: 0,
      fadeIn: new Animated.Value(0),
    };
  }

  processPinch = (x1: number, y1: number, x2: number, y2: number) => {
    const distance = calcDistance(x1, y1, x2, y2);
    const center = calcCenter(x1, y1, x2, y2);

    if (!this.state.isZooming) {
      const offsetByZoom = calcOffsetByZoom(
        this.state.width,
        this.state.height,
        this.props.imageWidth,
        this.props.imageHeight,
        this.state.zoom,
      );
      this.setState({
        isZooming: true,
        initialDistance: distance,
        initialX: center.x,
        initialY: center.y,
        initialTop: this.state.top,
        initialLeft: this.state.left,
        initialZoom: this.state.zoom,
        initialTopWithoutZoom: this.state.top - (offsetByZoom?.top || 0),
        initialLeftWithoutZoom: this.state.left - (offsetByZoom?.left || 0),
      });
    } else {
      const touchZoom =
        this.state.initialDistance && distance / this.state.initialDistance;
      if (touchZoom && this.state.initialZoom && this.state.minZoom) {
        const zoom =
          touchZoom * this.state.initialZoom > this.state.minZoom
            ? touchZoom * this.state.initialZoom
            : this.state.minZoom;

        const offsetByZoom = calcOffsetByZoom(
          this.state.width,
          this.state.height,
          this.props.imageWidth,
          this.props.imageHeight,
          zoom,
        );
        const left =
          this.state.initialLeftWithoutZoom * touchZoom +
          (offsetByZoom?.left || 0);
        const top =
          this.state.initialTopWithoutZoom * touchZoom +
          (offsetByZoom?.top || 0);

        this.setState({
          zoom,
          left:
            left > 0
              ? 0
              : maxOffset(left, this.state.width, this.props.imageWidth * zoom),
          top:
            top > 0
              ? 0
              : maxOffset(
                  top,
                  this.state.height,
                  this.props.imageHeight * zoom,
                ),
        });
      }
    }
  };

  processTouch = (x: number, y: number) => {
    if (!this.state.isMoving) {
      this.setState({
        isMoving: true,
        initialX: x,
        initialY: y,
        initialTop: this.state.top,
        initialLeft: this.state.left,
      });
    } else {
      if (this.state.initialX && this.state.initialY && this.state.zoom) {
        const left = this.state.initialLeft + x - this.state.initialX;
        const top = this.state.initialTop + y - this.state.initialY;

        this.setState({
          left:
            left > 0
              ? 0
              : maxOffset(
                  left,
                  this.state.width,
                  this.props.imageWidth * this.state.zoom,
                ),
          top:
            top > 0
              ? 0
              : maxOffset(
                  top,
                  this.state.height,
                  this.props.imageHeight * this.state.zoom,
                ),
        });
      }
    }
  };

  _onLayout = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;

    if (
      layout.width === this.state.width &&
      layout.height === this.state.height
    ) {
      return;
    }

    const zoom = layout.width / this.props.imageWidth;

    const offsetTop =
      layout.height > this.props.imageHeight * zoom
        ? (layout.height - this.props.imageHeight * zoom) / 2
        : 0;

    this.setState({
      layoutKnown: true,
      width: layout.width,
      height: layout.height,
      zoom,
      offsetTop,
      minZoom: zoom,
    });
  };

  fadeIn = () => {
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeIn, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (typeof this.props.onPress === 'function') {
        this.props.onPress();
        return;
      }
      this.props.imageViewerStore?.reset();
    });
  };

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: evt => {
        const touches = evt.nativeEvent.touches;
        if (touches.length === 2) {
          this.processPinch(
            touches[0].pageX,
            touches[0].pageY,
            touches[1].pageX,
            touches[1].pageY,
          );
        } else if (touches.length === 1 && !this.state.isZooming) {
          this.processTouch(touches[0].pageX, touches[0].pageY);
        }
      },

      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: () => {
        this.setState({
          isZooming: false,
          isMoving: false,
        });
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    });
  }

  componentDidMount() {
    this.fadeIn();
  }

  render() {
    const {style, source, imageWidth, imageHeight} = this.props;
    const {offsetTop, offsetLeft, top, left, zoom} = this.state;

    let anim = this.state.fadeIn.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1],
    });
    const custom_anim = {
      opacity: this.state.fadeIn,
      transform: [{scale: anim}],
    };
    return (
      <Animated.View style={[style || styles.container, custom_anim]}>
        <View
          style={style || styles.container}
          {...this._panResponder?.panHandlers}
          onLayout={this._onLayout}>
          <Image
            style={{
              position: 'absolute',
              top: offsetTop + top,
              left: offsetLeft + left,
              width: imageWidth * (zoom || 0),
              height: imageHeight * (zoom || 0),
              marginTop: sizeHeight(-5),
            }}
            source={
              isBase64Img(source) || isValidImgUrl(source)
                ? {
                    uri: `${
                      isBase64Img(source) ? 'data:image/png;base64,' : ''
                    }${source}`,
                  }
                : (source as ImageSourcePropType)
            }
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.fadeOut} style={{zIndex: 70}}>
            <Image
              source={require('../../../res/images/ic_delete_black_3x.png')}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'column-reverse',
    zIndex: 50,
    backgroundColor: 'rgba(0,0,0,1)',
  },
  footer: {
    position: 'absolute',
    zIndex: 60,
    height: isIPhoneX() ? sizeHeight(14) : sizeHeight(11),
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: isIPhoneX() ? sizeHeight(7) : sizeHeight(5),
  },
});
