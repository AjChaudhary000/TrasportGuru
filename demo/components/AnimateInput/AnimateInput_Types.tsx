import React from 'react';
import {KeyboardTypeOptions, StyleProp, ViewStyle} from 'react-native';

interface IOnChange {
  (text: string): void;
}

interface IOnBlur {
  (): void;
}

export type textContentTypeValue =
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | 'newPassword'
  | 'oneTimeCode'
  | undefined;

type IAutoCompleteType =
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'email'
  | 'name'
  | 'password'
  | 'postal-code'
  | 'street-address'
  | 'tel'
  | 'username'
  | 'off'
  | undefined;

export interface IProps {
  value?: string | null;
  defaultValue?: string | null;
  onChangeText: IOnChange;
  keyboardType?: KeyboardTypeOptions;
  mandatory?: boolean;
  otherIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  editable?: boolean;
  ref?: string;
  textContentType?: textContentTypeValue | 'email';
  placeholder?: string;
  label?: string;
  autoCompleteType?: IAutoCompleteType;
  onBlur?: IOnBlur;
  autoCorrect?: boolean;
}
