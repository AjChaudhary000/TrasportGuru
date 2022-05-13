// @flow
'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';

import {Surface, Group} from '@react-native-community/art';

import AnimShape from '../AnimateArtShape';

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as format from 'd3-format';
import * as axis from 'd3-axis';

const d3 = {
  scale,
  shape,
  format,
  axis,
};

type Props = {
  height: number;
  width: number;
  color: string;
  data: any;
};

const margin = 20;

export default class AreaSpline extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this._createArea = this._createArea.bind(this);
    this._Xvalue = this._Xvalue.bind(this);
    this._Yvalue = this._Yvalue.bind(this);
    this._label = this._label.bind(this);
  }

  //TODO: expose this methods as part of the AreaSpline interface.
  _Yvalue(item: [number, number]) {
    return -item.values;
  }

  //TODO: expose this methods as part of the AreaSpline interface.
  _Xvalue(item: [number, number], index: number) {
    return index * 15;
  }

  //TODO: expose this methods as part of the AreaSpline interface.
  _label(item: {name: string}) {
    return item.name;
  }

  // method that transforms data into a svg path (should be exposed as part of the AreaSpline interface)
  _createArea() {
    var that = this;
    var area = d3.shape
      .area()
      .x(function (d, index) {
        return that._Xvalue(d, index);
      })
      .y1(function (d) {
        return that._Yvalue(d);
      })
      .curve(d3.shape.curveNatural)(this.props.data);

    return {path: area};
  }

  render() {
    const x = margin;
    const y = this.props.height - margin;

    return (
      <View>
        <Surface width={this.props.width} height={this.props.height}>
          <Group x={x} y={y}>
            <AnimShape color={this.props.color} d={() => this._createArea()} />
          </Group>
        </Surface>
      </View>
    );
  }
}
