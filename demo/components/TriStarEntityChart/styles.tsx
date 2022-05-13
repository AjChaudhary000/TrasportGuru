import {StyleSheet} from 'react-native';
import {Fonts} from '../../../res/themes';
import {sizeFont, sizeWidth, sizeHeight} from '../../util/Size';

const styles = StyleSheet.create({
  main: {flex: 1, height: '100%'},
  outer_container: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    // spending accounts - left margin: needs to be accounted for
    // component will generate the account information - expandable to display account entities
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: sizeWidth(4),
    width: '100%',
    height: '100%',
  },
  chart_title: {
    paddingTop: 5,
    textAlign: 'center',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 28,
    backgroundColor: 'white',
    color: '#231F20',
    fontFamily: Fonts.type.OpenSansDisplayBold,
  },
  chart_date_container: {
    padding: sizeHeight(0.4),
    zIndex: 1,
  },
  chart_client_name: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.type.OpenSansDisplayBold,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  chart_date: {
    textAlign: 'center',
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#666666',
    fontFamily: Fonts.type.OpenSansDisplayBold,
    fontWeight: 'bold',
    letterSpacing: 0.1,
  },
  text_error: {
    color: 'red',
    fontSize: sizeFont(3.4),
    paddingRight: sizeWidth(2),
  },
  text_error_blue: {
    color: '#0080ff',
    fontSize: sizeFont(3.4),
    paddingRight: sizeWidth(2),
  },
  view_error_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff0f7',
    borderTopColor: 'red',
    borderTopWidth: sizeWidth(0.1),
    borderBottomColor: 'red',
    borderBottomWidth: sizeWidth(0.1),
    width: '100%',
    zIndex: 999,
  },
  view_error_container_blue: {
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
    zIndex: 999,
  },
  view_error: {
    justifyContent: 'center',
    alignItems: 'center',
    top: sizeHeight(0.2),
    marginLeft: sizeWidth(7),
    width: '85%',
    height: sizeHeight(5.5),
  },
});

export default styles;
