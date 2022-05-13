import {Platform, StyleSheet} from 'react-native';
import {isIPhoneX} from '../../util/Device';
import {sizeFont, sizeWidth, sizeHeight} from '../../util/Size';
import {Fonts} from '../../../res/themes';
import {COLOR_APP_BLACK, COLOR_APP_WHITE} from '../../../res/style/AppStyle';
import {isIphoneX} from '../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    ...Platform.select({
      ios: {
        margin: isIPhoneX() ? sizeHeight(7.7) : sizeHeight(9),
      },
    }),
  },
  outer_container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  chartDesign: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: sizeHeight(-5),
  },
  //add the chevron background
  label_container: {
    marginTop: sizeHeight(2.3),
    display: 'flex',
    flexDirection: 'column',
    width: '74%',
    alignContent: 'center',
    zIndex: 3,
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666666',
    fontWeight: 'normal',
    letterSpacing: 0.5,
    marginBottom: sizeHeight(0.5),
    textAlign: 'center',
    flexWrap: 'wrap',
    textTransform: 'uppercase',
    fontFamily: Fonts.type.OpenSansDisplayRegular,
  },
  label_balance: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.75,
    textAlign: 'center',
    color: '#231F20',
    fontFamily: Fonts.type.OpenSansDisplayBold,
    marginBottom: isIPhoneX() ? 24 : 10,
  },
  labelBackground: {
    // inner-container
    flex: 1,
    width: '100%',
    padding: 10,
    ...Platform.select({
      ios: {
        marginTop: isIPhoneX() ? sizeHeight(-1) : sizeHeight(3),
      },
      android: {
        marginTop: 0,
      },
    }),
  },
  labelBackgroundAlt: {
    ...Platform.select({
      ios: {
        marginTop: isIPhoneX() ? sizeHeight(3) : sizeHeight(3),
      },
      android: {
        marginTop: 0,
      },
    }),
  },
  labelContainer: {
    // outer-container
    flex: 1,
    paddingTop: sizeHeight(1),
    paddingBottom: sizeHeight(3), // grey bottom padding
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#F6F6F6',
    ...Platform.select({
      ios: {
        marginTop: isIPhoneX() ? sizeHeight(-6) : sizeHeight(-6),
      },
      android: {
        marginTop: sizeHeight(-3),
      },
    }),
  },
  labelContainerAlt: {
    paddingTop: sizeHeight(1),
    ...Platform.select({
      ios: {
        marginTop: isIPhoneX() ? sizeHeight(-3) : sizeHeight(-2),
      },
      android: {
        marginTop: sizeHeight(-3),
      },
    }),
  },
  view_item_chevron: {
    paddingBottom: sizeHeight(1),
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  view_content_chevron: {
    marginBottom: '5.67%',
    shadowOffset: {width: 0, height: sizeWidth(1)},
    shadowOpacity: 0.1,
    elevation: 10,
    borderRadius: sizeWidth(2),
    backgroundColor: COLOR_APP_WHITE,
    width: '99%',
    minHeight: sizeWidth(20), // create offset for panel
  },
  view_chevron_item_spacer: {
    height: sizeHeight(9.3),
    borderRadius: 100 / 2,
    marginLeft: -13,
  },
  view_chevron_item_right: {
    right: 0,
    borderColor: 'transparent',
    borderTopLeftRadius: isIPhoneX()
      ? sizeHeight(9.3) / 2
      : sizeHeight(12.3) / 2,
    borderBottomLeftRadius: isIPhoneX()
      ? sizeHeight(9.3) / 2
      : sizeHeight(12.3) / 2,
    position: 'absolute',
  },
  view_chevron_item_left: {
    left: 0,
    borderColor: 'transparent',
    borderTopRightRadius: isIPhoneX()
      ? sizeHeight(9.3) / 2
      : sizeHeight(12.3) / 2,
    borderBottomRightRadius: isIPhoneX()
      ? sizeHeight(9.3) / 2
      : sizeHeight(12.3) / 2,
    position: 'absolute',
  },
  view_image: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: sizeWidth(2),
    shadowOffset: {width: 0, height: sizeWidth(0.1)},
    shadowOpacity: 0.1,
    justifyContent: 'center',
    marginBottom: sizeWidth(3),
    borderStyle: 'dashed',
    borderColor: '#D8D8D8',
    borderWidth: sizeHeight(0.3),
    marginTop: sizeHeight(3),
  },
  view_image_chevron: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: sizeWidth(2),
    shadowOffset: {width: 0, height: sizeWidth(0.1)},
    shadowOpacity: 0.1,
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderColor: '#D8D8D8',
    borderWidth: sizeHeight(0.3),
    borderRadius: sizeWidth(2),
  },
  icon: {
    width: sizeWidth(8.5),
    height: sizeWidth(8.5),
  },
  text_image: {
    marginLeft: sizeWidth(3),
    color: '#7B7B7B',
  },
  image: {
    width: sizeWidth(5.2),
    height: sizeWidth(5.2),
  },
  image_chevron: {
    width: sizeWidth(20),
    height: sizeWidth(20),
    marginLeft: -50,
    justifyContent: 'center',
  },
  icon_row: {
    width: sizeWidth(3.2),
    height: sizeWidth(3.2),
  },
  total_container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: sizeHeight(1),
  },
  chart_total_container: {
    flex: 1,
    width: '100%',
    marginBottom: sizeHeight(10),
    ...Platform.select({
      ios: {
        marginTop: isIphoneX() ? sizeHeight(-2) : sizeHeight(-3),
      },
      android: {
        marginTop: sizeHeight(-3),
      },
    }),
  },
  chart_total_container_alt: {
    top: sizeHeight(2),
    ...Platform.select({
      ios: {
        marginTop: isIphoneX() ? sizeHeight(-2) : sizeHeight(-3),
      },
      android: {
        marginTop: sizeHeight(-3),
      },
    }),
  },
  chart_total_balance: {
    paddingTop: 5,
    textAlign: 'center',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 28,
    backgroundColor: 'white',
    color: '#231F20',
    fontFamily: Fonts.type.OpenSansDisplayBold,
  },
  chart_total: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.type.OpenSansDisplayBold,
    textTransform: 'uppercase',
  },
  // label AccountInfo CSS
  account_info_outer_container: {flex: 1, justifyContent: 'center'},
  view_label_account_info_container: {
    flex: 1,
    maxHeight: 50,
    width: '100%',
  },
  view_label_account_info_main: {
    marginTop: 4, // 8
    marginBottom: 4,
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 15,
    paddingRight: 15,
    width: '90%',
    minHeight: 40,
    borderColor: COLOR_APP_BLACK,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: sizeWidth(1),
  },
  text_label_account_info_left: {
    fontSize: sizeFont(3.65),
    letterSpacing: 0.11,
    textAlign: 'left',
    fontFamily: Fonts.type.OpenSansDisplayRegular,
  },
  view_label_account_info_left_container: {},
  view_label_account_info_right_container: {
    display: 'flex',
    flexDirection: 'row',
  },
  text_label_account_info_right: {
    fontSize: sizeFont(3.8),
    marginRight: isIPhoneX() ? sizeWidth(-1.3) : sizeWidth(-1),
    letterSpacing: 0.11,
    textAlign: 'right',
    fontFamily: Fonts.type.OpenSansDisplayRegular,
  },
  icon_label_account_info_right: {
    marginTop: sizeHeight(0.2),
    marginLeft: sizeWidth(3),
    marginRight: sizeWidth(-2),
    width: 16,
    height: 17,
  },
});

export default styles;
