// @flow
'use strict';

import React, {Component} from 'react';

import {LayoutAnimation} from 'react-native';
import Morph from 'art/morph/path';
import {Shape} from '@react-native-community/art';

export interface Dfunc {
  path: string | null;
  color?: string;
}

type Props = {
  color: string;
  d: () => Dfunc;
};

interface IState {
  path: string;
}

const AnimationDurationMs = 0;

export default class AnimateArtShape extends Component<Props, IState> {
  private animating: number | null = null;
  private previousGraph: Dfunc | null = null;
  constructor(props: Props) {
    super(props);
    this.state = {
      path: '',
    };
  }

  UNSAFE_componentWillMount() {
    this.computeNextState(this.props);
  }
  componentWillUnmount() {
    this.animating = null;
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => {
      return;
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    this.computeNextState(nextProps);
  }

  // Animations based on: https://github.com/hswolff/BetterWeather
  computeNextState(nextProps: Props) {
    // const {d} = nextProps;

    const graph = this.props.d();

    this.setState({
      path: graph.path || '',
    });

    // The first time this function is hit we need to set the initial
    // this.previousGraph value.
    if (!this.previousGraph) {
      this.previousGraph = graph;
    }

    // Only animate if our properties change. Typically this is when our
    // yAccessor function changes.
    if (this.props !== nextProps) {
      const pathFrom = this.previousGraph.path;
      const pathTo = graph.path;

      this.animating && cancelAnimationFrame(this.animating);
      this.animating = null;

      // Opt-into layout animations so our y tickLabel's animate.
      // If we wanted more discrete control over their animation behavior
      // we could use the Animated component from React Native, however this
      // was a nice shortcut to get the same effect.
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          AnimationDurationMs,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity,
        ),
      );

      this.setState(
        {
          // Create the ART Morph.Tween instance.
          path: Morph.Tween(pathFrom, pathTo),
        },
        () => {
          // Kick off our animations!
          this.animate();
        },
      );

      this.previousGraph = graph;
    }
  }

  // This is where we animate our graph's path value.
  animate(start?: number) {
    this.animating = requestAnimationFrame(timestamp => {
      if (!start) {
        start = timestamp;
      }

      // Get the delta on how far long in our animation we are.
      const delta = (timestamp - start) / AnimationDurationMs;

      // If we're above 1 then our animation should be complete.
      if (delta > 1) {
        this.animating = null;
        // Just to be safe set our final value to the new graph path.
        this.setState({
          path: this.previousGraph?.path || '',
        });

        // Stop our animation loop.
        return;
      }

      // Tween the SVG path value according to what delta we're currently at.
      // @ts-ignore
      this.state.path.tween(delta);

      this.setState(this.state, () => {
        this.animate(start);
      });
    });
  }

  render() {
    const path = this.state.path;
    return <Shape d={path} stroke={this.props.color} fill={this.props.color} />;
  }
}
