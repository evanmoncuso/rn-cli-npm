# rn-cli

A simple command line tool to create a "pod-type" structure for React Native Components.

That structure consists of

```javascript
  - podname
  | - index.js // home to the major of the
  | - styles.js // home to the styles for that component
  | - actions.js // home to any redux actions/dispatches [optional]
```

## Installation

As of right now, it'll be cloning the repo and running `npm install -g` in the repo

## Commands

| Shorthand        | Longhand           | description  |
| ------------- | ------------- | ----- |
| -h | --help | HELP |
| -r | --redux | give component access to redux store |
| -a | --add-actions | include an actions file |
| -s | --mapStateToProps | include a mapStateToProps function and connect the index.js file to the redux store |
| -d | --mapDispatchToProps | include a mapDispatchToProps function and connect the index.js file to the redux store |
| -u | --dumb | make the component a 'dumb' or presentational component with no independent state |


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

### Simple 'Smart' React component connected to the redux store w/ actions

`rn-cli -arsd SmartRedux`

```javascript
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
### Sample Styles file

```javascript
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

});
```

### Sample Actions file

```javascript
/**
  A nice example action obj

  const dispatchXYZ = (data) => {
    return {
      type: 'AN_ACTION',
      data: data,
    }
  }
*/

export const actions = {

}
```

## Notes

This tool WILL overwrite files if there are already files in that directory
