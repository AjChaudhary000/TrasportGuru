import React, {Component} from 'react';
import {Text, ScrollView, View, StyleSheet} from 'react-native';

import data from '../../res/data/data';
import {ISpendingsPerYear} from '../components/TriStarEntityChart/TriStarEntityChart_Types';

type State = {
  activeIndex: number;
  spendingsPerYear: ISpendingsPerYear[];
};

export default class D3Art extends Component {
  state: State;

  constructor(props: {}) {
    super(props);
    this.state = {
      activeIndex: 0,
      spendingsPerYear: data.spendingsPerYear,
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this._shuffle = this._shuffle.bind(this);
  }

  _onPieItemSelected(newIndex: number) {
    this.setState({
      ...this.state,
      activeIndex: newIndex,
      spendingsPerYear: this._shuffle(data.spendingsPerYear),
    });
  }

  _shuffle(a: ISpendingsPerYear[]) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  render() {
    // const height = 600;
    // const width = 500;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.chart_title}>Weekly Spending Balance</Text>
          {/*<Pie*/}
          {/*  pieWidth={250}*/}
          {/*  pieHeight={250}*/}
          {/*  onItemSelected={this._onPieItemSelected}*/}
          {/*  colors={Theme.colors}*/}
          {/*  width={width}*/}
          {/*  height={height}*/}
          {/*  data={data.spendingsLastMonth}*/}
          {/*/>*/}

          <Text style={styles.chart_title}>
            Yearly Spending in{' '}
            {data.spendingsLastMonth[this.state.activeIndex].name}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'whitesmoke',
    // spending accounts - left margin: needs to be accounted for
    // component will generate the account information - expandable to display account entities
    marginTop: 21,
  },
  chart_title: {
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor: 'white',
    color: 'grey',
    fontWeight: 'bold',
  },
});
