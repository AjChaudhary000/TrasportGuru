import {StyleSheet} from 'react-native';
import {sizeFont, sizeWidth} from '../../util/Size';
import {COLOR_APP_BLUE} from '../../../res/style/AppStyle';

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
    fontWeight: 'bold',
    color: '#000',
  },
  ContentText: {
    fontSize: sizeFont(3.8),
    marginBottom: sizeWidth(1),
    color: 'black',
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
    padding: sizeWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ActionText: {
    color: COLOR_APP_BLUE,
    fontSize: sizeFont(4.5),
    fontWeight: 'bold',
  },
});

export default styles;
