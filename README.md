# rn-cli

A simple command line tool to create a "pod-type" structure for React Native Components.

That structure consists of

```javascript
  - podname
  | - index.js // home to the component itself
  | - styles.js // home to the styles for that component
```

OR

```javascript
  - podname
  | - index.js // a 'react-navigation' navigator component
```


## Installation

As of right now, it'll be cloning the repo and running `npm install -g` in the repo

## Commands

| Shorthand        | Longhand           | description  |
| ------------- | ------------- | ----- |
| -h | --help | HELP |
| -r | --redux | give component access to redux store |
| -s | --mapStateToProps | include a mapStateToProps function and connect the index.js file to the redux store |
| -d | --mapDispatchToProps | include a mapDispatchToProps function and connect the index.js file to the redux store |
| -u | --dumb | make the component a 'dumb' or presentational component with no independent state |
| -f | --flow | Include the // @flow flag at the top of the index|
| -S | --stackNav | create a stack navigator component |
| -T | --tabNav | create a tab navigator component |
| -P | --propTypes | use and add the `prop-types` add on. needed for React version > 15.5.7 |


## Syntax

Run the command line tool with the flags you want and a path for the pod to live in.

run `rn-cli Path/To/New/Pod`

Will create a new pod at `Path/To/New/Pod` with a pod called `Pod`

## Examples

### Simple 'Dumb' React component

`rn-cli -u Dumb`

```javascript
import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';

import { styles } from './styles';

const Dumb = () => {
  return (

  );
}

export default Dumb;
```

### Simple 'Smart' React component connected to the redux store w/ actions and flow

`rn-cli -adfrs SmartRedux`

```javascript
// @flow

import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';

import { actions } from './actions';
import { styles } from './styles';

class SmartRedux extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    }
  }

  render() {
    return (

    )
  }
}

const mapStateToProps = (state) => (
  {

  }
);

const mapDispatchToProps = (dispatch) => (
  {

  }
);


export default connect(mapStateToProps, mapDispatchToProps)(SmartRedux);
```




### Sample Stack Navigator file
`rn-cli -S Main`

```javascript
import { StackNavigator } from 'react-navigation';

/*
import ComponentName from './path/to/component';
*/

const Main = StackNavigator({
  //ComponentName: 'ComponentName',
}, {
  headerMode: '',
  initialRouteName: '',
});

export default Main;
```
### Sample Styles file

```javascript
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

});
```


## Notes

This tool WILL overwrite files if there are already files in that directory

Currently, this tool only supports navigation with `react-navigation`
