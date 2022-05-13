import React, {Component} from 'react';
import {View, Modal, Animated} from 'react-native';
import {observer, inject} from 'mobx-react';
import {parseDate} from '../../util/DateUtil';
import {getSignedUrl} from '../../util/AWSUtils';
import Button from '../../component/Button';
import AppText from '../../component/Text';
import RNFetchBlob from 'rn-fetch-blob';
import Pdf from 'react-native-pdf';
import * as realmUserActions from '../../realm/controllers/userActions';

import styles from './styles';
import UserStore from '../../mobx/UserStore';
import RealmStore from '../../mobx/RealmStore';
import NetInfoStore from '../../mobx/NetInfoStore';
import IDbOptions from '../../mobx/Types';
import Realm from 'realm';
import {IUserData} from '../../mobx/UserStore_Types';

interface IProps {
  userStore?: UserStore;
  realmStore?: RealmStore;
  netInfoStore?: NetInfoStore;
  type: string;
  handleModalVisibility: (bool: boolean) => void;
  showTermsModal?: boolean;
  showPrivacyModal?: boolean;
}

@inject('userStore')
@inject('realmStore')
@inject('netInfoStore')
@observer
export default class TNCView extends Component<IProps> {
  state = {
    pdfContractUri: '',
    wasPdfDownloaded: false,
    isPdfLoaded: false,
    tc_accepted_date: new Date(),
    fadeIn: new Animated.Value(0),
  };

  async UNSAFE_componentWillMount() {
    const {netInfoStore, userStore, realmStore} = this.props;
    // const {dbOptions} = this.props.realmStore;
    const dirs = RNFetchBlob.fs.dirs.CacheDir;
    const fileName =
      this.props.type === 'tnc'
        ? '/Tristar-Terms-And-Conditions.pdf'
        : '/Tristar-Privacy-Terms.pdf';
    let url =
      this.props.type === 'tnc'
        ? 'https://tristar-app-prod.s3-us-west-1.amazonaws.com/policies/TriStarApp-TermsAndConditions.pdf'
        : 'https://tristar-app-prod.s3-us-west-1.amazonaws.com/policies/TriStarApp-PrivacyPolicy.pdf';
    if (netInfoStore?.isConnected) {
      realmUserActions
        .getUsers(realmStore?.dbOptions as IDbOptions)
        .then(async users => {
          const user = (
            users as Realm.Results<IUserData & Realm.Object>
          ).sorted('lastLogin', true)[0];
          const {terms_and_conditions, tc_accepted_date, tc_user_signature} =
            user;
          userStore?.setTrueAuthentication(false); // pause touch timer
          await getSignedUrl(url, async (_err, signedUrl) => {
            await RNFetchBlob.config({
              path: dirs + fileName,
            })
              .fetch('GET', signedUrl)
              .then(async res => {
                let status = res.info().status;
                if (status === 200) {
                  const filePath = res.path();
                  this.setState({
                    pdfContractUri: filePath,
                    signedUrl,
                    wasPdfDownloaded: true,
                    terms_and_conditions,
                    tc_accepted_date,
                    tc_user_signature,
                  });
                }
              })
              .catch(() => {
                this.setState({pdfContractUri: `${dirs + fileName}`});
              });
            return;
          });
        })
        .catch(err => {
          console.log(
            'Error getting users from realm [InspirationScreen]',
            err,
          );
        });
      return;
    }
    this.setState({pdfContractUri: `${dirs + fileName}`});
  }

  componentDidMount() {
    this.fadeIn();
  }

  componentWillUnmount() {
    this.props.userStore?.setTrueAuthentication(true); // reset touch timer
  }

  fadeIn = () => {
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 1250,
      useNativeDriver: true,
    }).start();
  };

  renderPdf = () => {
    const {pdfContractUri} = this.state;
    return (
      <View style={styles.pdf_container}>
        <Pdf
          source={{uri: pdfContractUri}}
          onError={err => {
            console.log('PDF error:', err);
          }}
          onLoadComplete={() => {
            this.setState({isPdfLoaded: true});
          }}
          style={styles.pdf_styles}
        />
      </View>
    );
  };

  render() {
    const {userStore} = this.props;
    const {pdfContractUri, tc_accepted_date} = this.state;
    let anim = this.state.fadeIn.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1],
    });
    const custom_anim = {
      opacity: this.state.fadeIn,
      transform: [{scale: anim}],
    };
    return (
      <Modal visible={true} animationType={'slide'} transparent={false}>
        <Animated.View style={[styles.container, custom_anim]}>
          <View style={styles.container_inner}>
            <View
              style={[
                styles.footer,
                this.props.type === 'privacy' ? styles.footer_alt : {},
              ]}>
              {this.props.type === 'tnc' && (
                <AppText numberOfLines={3} style={styles.text}>
                  {`I, ${userStore?.first_name} ${
                    userStore?.last_name
                  }, have read and agree to all consented terms and conditions as of signed date, ${parseDate(
                    new Date(tc_accepted_date),
                  )}.`}
                </AppText>
              )}
              <View style={styles.button_container}>
                <Button
                  text={'Close'}
                  onPress={() => this.props.handleModalVisibility(false)}
                />
              </View>
            </View>
            {pdfContractUri.length > 0 && this.renderPdf()}
          </View>
        </Animated.View>
      </Modal>
    );
  }
}
