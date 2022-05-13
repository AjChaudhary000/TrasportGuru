import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export interface IProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  left_right?: React.ReactNode;
  title?: string;
  style?: StyleProp<ViewStyle>;
  translucent?: boolean;
  whole?: React.ReactNode;
}
