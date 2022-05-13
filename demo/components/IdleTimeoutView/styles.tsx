import {StyleSheet} from 'react-native';
import {Metrics, Fonts} from '../../../res/themes';
import {sizeWidth, sizeFont, sizeHeight} from '../../util/Size';

const styles = StyleSheet.create({
  container_overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9997,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_container: {
    width: '90%',
    minHeight: Metrics.HEIGHT * 0.2,
    borderRadius: sizeWidth(3),
    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 9998,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingVertical: sizeHeight(2),
  },
  view_text_container: {
    height: '85%',
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view_text: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_text: {
    fontFamily: Fonts.type.OpenSansDisplayBold,
    fontSize: sizeFont(4.7),
    paddingVertical: sizeWidth(1),
    paddingHorizontal: sizeWidth(3),
  },
  text: {
    fontFamily: Fonts.type.OpenSansDisplayRegular,
    fontSize: sizeFont(4.2),
    paddingVertical: sizeWidth(1),
    paddingHorizontal: sizeWidth(3),
    textAlign: 'center',
    color: '#000',
  },
  touchable_keep: {
    marginVertical: sizeHeight(3),
    paddingVertical: sizeHeight(1.5),
    width: '90%',
    minHeight: sizeHeight(5),
    borderRadius: sizeWidth(2),
    backgroundColor: 'black',
  },
  touchable_text: {
    fontFamily: Fonts.type.OpenSansDisplayRegular,
    fontSize: sizeFont(4.2),
    paddingVertical: sizeWidth(1),
    paddingHorizontal: sizeWidth(3),
    letterSpacing: 0.34,
    textAlign: 'center',
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default styles;
