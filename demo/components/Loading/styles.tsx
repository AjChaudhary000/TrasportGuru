import {StyleSheet} from 'react-native';
import {sizeFont, sizeHeight} from '../../util/Size';
import {Metrics, Fonts} from '../../../res/themes';
import {isIPhoneX} from '../../util/Device';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: '100%',
    width: '100%',
    zIndex: 2,
  },
  LoadingInnerContainer: {
    width: Metrics.WIDTH * 1,
    height: Metrics.HEIGHT * 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingBottom: sizeHeight(10),
    alignItems: 'center',
  },
  LoadingInnerContainer_Transparent: {
    width: Metrics.WIDTH * 0.8,
    height: Metrics.HEIGHT * 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 320,
    alignSelf: 'center',
  },
  img_transparent: {
    width: 75,
    alignSelf: 'center',
  },
  text: {
    position: 'absolute',
    bottom: sizeHeight(24),
    fontFamily: Fonts.type.MinionPro,
    color: '#000',
    fontSize: sizeFont(5.7),
    letterSpacing: 0.77,
    textAlign: 'center',
    paddingBottom: sizeHeight(4.85),
    zIndex: 3,
  },
  text_time: {
    fontFamily: Fonts.type.MinionPro,
    fontSize: sizeFont(3.9),
    letterSpacing: 0.77,
    textAlign: 'center',
  },
  view_clock_container: {
    width: '100%',
    marginBottom: isIPhoneX() ? sizeHeight(23) : sizeHeight(24),
    position: 'absolute',
    bottom: isIPhoneX() ? sizeHeight(52) : sizeHeight(47),
  },
  view_clock: {
    marginTop: sizeHeight(5),
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  view_time_row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
