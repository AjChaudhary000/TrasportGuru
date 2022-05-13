import {StyleSheet} from 'react-native';
import {sizeFont, sizeWidth} from '../../util/Size';
import {COLOR_APP_BLACK, COLOR_APP_BLUE} from '../../../res/style/AppStyle';

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  ContentWrapper: {
    paddingHorizontal: sizeWidth(3.2),
    paddingVertical: sizeWidth(4),
    alignItems: 'center',
  },
  TitleText: {
    fontSize: sizeFont(4.8),
    marginBottom: sizeWidth(2),
    color: '#000',
  },
  ContentText: {
    fontSize: sizeFont(4),
    marginBottom: sizeWidth(1),
    color: COLOR_APP_BLACK,
    textAlign: 'center',
  },
  ActionContainer: {
    flexDirection: 'row',
  },
  VerticalSeparator: {
    height: 1,
    width: sizeWidth(70),
    backgroundColor: '#DDDDDD',
  },
  HorizontalSeparator: {
    width: 1,
    backgroundColor: '#DDDDDD',
  },
  ActionWrapper: {
    flex: 1,
    padding: sizeWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ActionText: {
    color: COLOR_APP_BLUE,
    fontSize: sizeFont(4),
  },
});

export default styles;
