import React, {PureComponent} from 'react';
import {TouchableOpacity} from 'react-native';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import config from '../../../res/icon/config.json';
import {sizeWidth} from '../../util/Size';
import {COLOR_APP_BLACK} from '../../../res/style/AppStyle';
import {IProps} from './Fontello_Types';

const Icon = createIconSetFromFontello(config);

export default class Fontello extends PureComponent<IProps> {
  static defaultProps = {
    name: 'ic_back',
    color: COLOR_APP_BLACK,
    size: sizeWidth(4.5),
    style: {textAlign: 'center'},
    styleButton: {},
  };

  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {styleButton, onPress} = this.props;
    return (
      <TouchableOpacity
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            padding: sizeWidth(1),
          },
          styleButton,
        ]}
        disabled={!onPress}
        onPress={onPress}>
        <Icon name={'ic_back'} {...this.props} />
      </TouchableOpacity>
    );
  }
}
