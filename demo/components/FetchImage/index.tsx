import React, {Component} from 'react';
import {Image, ImageStyle, Platform, StyleProp} from 'react-native';
import FastImage, {
  Priority,
  ResizeMode,
  ImageStyle as FastImageStyle,
} from 'react-native-fast-image';
import {IProps} from './FetchImage_Types';

export default class FetchImage extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  renderPlaceHolder = () => {
    const {style, resizeMode} = this.props;
    const placeholder =
      this.props.placeholder || require('../../res/images/empty-image.png');
    return (
      <Image
        resizeMode={resizeMode || 'cover'}
        style={style as StyleProp<ImageStyle>}
        source={placeholder}
      />
    );
  };

  renderImage = () => {
    const {uri, style, resizeMode, priority, onLoadEnd} = this.props;
    if (Platform.OS === 'ios') {
      return (
        <FastImage
          style={style as StyleProp<FastImageStyle>}
          // onLoad={this.onLoad}
          source={{
            uri: uri,
            priority: priority as Priority,
          }}
          resizeMode={resizeMode as ResizeMode}
          onLoadEnd={onLoadEnd}
        />
      );
    }
    return (
      <Image
        style={style as StyleProp<ImageStyle>}
        // onLoad={this.onLoad}
        source={{
          uri: uri,
        }}
        resizeMode={resizeMode}
        onLoadEnd={onLoadEnd}
      />
    );
  };

  render() {
    const {uri} = this.props;
    if (uri) {
      return this.renderImage();
    } else {
      return this.renderPlaceHolder();
    }
  }
}
