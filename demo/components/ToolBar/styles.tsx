import {StyleSheet} from 'react-native';
import {sizeHeight, sizeWidth} from '../../util/Size';
import {TOOLBAR_COLOR} from '../../../res/style/AppStyle';

const styles = StyleSheet.create({
  Container: {
    height: sizeHeight(6.9),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: TOOLBAR_COLOR,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: sizeWidth(0.1)},
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,
  },
  Default: {
    height: sizeHeight(6.9),
    flexDirection: 'row',
    backgroundColor: TOOLBAR_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: sizeWidth(0.1)},
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,
  },
  Left: {
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Right: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LeftRight: {
    position: 'absolute',
    right: 40,
  },
  Center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
