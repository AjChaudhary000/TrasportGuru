import {StyleSheet} from 'react-native';
import {sizeFont, sizeWidth, sizeHeight} from '../../util/Size';
import {Metrics} from '../../../res/themes';
import {isIPhoneX} from '../../util/Device';

const styles = StyleSheet.create({
  container: {
    zIndex: 995,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
  },
  topBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#b8dbff',
    borderTopColor: '#0080ff',
    borderTopWidth: sizeWidth(0.1),
    borderBottomColor: '#0080ff',
    borderBottomWidth: sizeWidth(0.1),
    width: '100%',
    zIndex: 996,
    marginTop: isIPhoneX() ? 40 : 30,
  },
  containerInner: {
    justifyContent: 'center',
    alignItems: 'center',
    top: sizeHeight(0.2),
    marginLeft: sizeWidth(7),
    width: '85%',
    height: sizeHeight(5.5),
  },
  text_error_blue: {
    color: '#0080ff',
    fontSize: sizeFont(3.4),
    paddingRight: sizeWidth(2),
    letterSpacing: 0.34,
  },
});

export default styles;
