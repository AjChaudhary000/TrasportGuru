import {StyleSheet} from 'react-native';
import {sizeHeight, sizeWidth} from '../../util/Size';
import {Metrics, Fonts} from '../../../res/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
  },
  container_inner: {
    width: Metrics.WIDTH * 1,
    height: Metrics.HEIGHT * 0.95,
    backgroundColor: 'gray',
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  footer: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.HEIGHT * 0.24,
    width: Metrics.WIDTH * 1,
  },
  footer_alt: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.HEIGHT * 0.17,
    width: Metrics.WIDTH * 1,
  },
  footer_top: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  touchable_checkbox_container: {
    width: 64,
    height: 56,
  },
  view_checkbox_container: {
    width: 34,
    height: 32,
  },
  checkbox_img: {
    width: 33,
    height: 29.6,
  },
  text: {
    color: '#000',
    width: '90%',
    marginTop: sizeHeight(1),
    paddingLeft: sizeWidth(2),
    textAlign: 'center',
  },
  text_name: {
    color: '#000',
    fontFamily: Fonts.type.OpenSansDisplaySemiBold,
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: sizeWidth(5),
    marginVertical: sizeHeight(2.5),
  },
  button: {
    width: '45%',
  },
  pdf_container: {
    height: Metrics.HEIGHT * 0.78,
    width: Metrics.WIDTH * 1,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  pdf_styles: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export default styles;
