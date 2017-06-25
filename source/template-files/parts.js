export const styles = `import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({

})
`;

const actionsPage =`/**
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
`

const flowFlag = `// @flow

`

const imports = `import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
`

const importStyles = `
import { styles } from './styles';

`;

const props = `import PropTypes from 'prop-types';
`;

const connect = `import { connect } from 'react-redux';
`;

const _dumbInit = (podName) => (
`const ${podName} = () => {
  return (

  );
}

${podName}.propTypes = {
};

`);

const _smartInit = (podName) => (
  `class ${podName} extends Component {
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

${podName}.propTypes = {
};

`)

const stack = (podName) =>  (
`import { StackNavigator } from 'react-navigation';

/*
import ComponentName from './path/to/component';
*/

const ${podName} = StackNavigator({
  //ComponentName: 'ComponentName',
}, {
  headerMode: '',
  initialRouteName: '',
});

export default ${podName};`
)

const tab  = (podName) => (
`import { TabNavigator } from 'react-navigation';

/*
import ComponentName from './path/to/component';
*/

const ${podName} = TabNavigator({
  //ComponentName: 'ComponentName',
}, {
 initialRouteName: '',
});

export default ${podName};`
)

const mstp = `const mapStateToProps = (state) => (
  {

  }
);

`

const mdtp = `const mapDispatchToProps = (dispatch) => (
  {

  }
);

`

const _connection = (mstp, mdtp, podName) => {
  mstp = mstp ? 'mapStateToProps' : null;
  mdtp = mdtp ? 'mapDispatchToProps' : null;
  return `
export default connect(${mstp}, ${mdtp})(${podName});
  `
}

const _exportWithoutConnection = (podName) => (`export default ${podName};`);

export const buildPodFiles = (buildObj) => {
    let index = ``;
    let { podName } = buildObj;

    if(buildObj.type === 'nav') {
      // create a nav object
      let { type } = buildObj.navDetails;
      if(type === 'stack') {
        return stack(podName);
      } else {
        return tab(podName);
      }
    } else {
      // create a component
      let { type, redux, hasMSTP, hasMDTP, flow, propTypes } = buildObj.indexDetails;
      // build the index age;

      // check flow
      if(flow) {
        index += flowFlag;
      }

      // add imports;
      index += imports;
      // see if we need redux
      if(redux) {
        index += connect;
      }

      if(propTypes) {
        index += props;
      }
      // add styles if needed
      index += importStyles;

      // check for component type
      if(type === 'smart') {
        index += _smartInit(podName);
      } else {
        index += _dumbInit(podName);
      }
      if(redux) {
        hasMSTP = true;
        index += mstp;

        if(hasMDTP) {
          index += mdtp;
        }
      }

      if(redux) {
        index += _connection(hasMSTP, hasMDTP, podName)
      } else {
        index += _exportWithoutConnection(podName);
      }

      return index;
    }
}
