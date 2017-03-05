const stylePage = `import { StyleSheet } from 'react-native';

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

const imports = `import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

`

const importStyles = `import { styles } from './styles';

`;

const importActions = `import { actions } from './actions';
`;

const connect = `import { connect } from 'react-redux';

`;

const _dumbInit = (podName) => (
`const ${podName} = () => {
  return (

  );
}

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

`)

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

const buildPages = (buildObj) => {
  let index = ``;
  let styles = stylePage;
  let { podName, type, redux, indexDetails, files } = buildObj;
  let { hasMSTP, hasMDTP } = indexDetails;
  let actions = files.length === 3;

  let filename = podName[0].split('/');
  if(filename[filename.length - 1] === '') {
    filename = filename[filename.length - 2];
  } else {
    filename = filename[filename.length - 1];
  }

  // build the index page;

  // start with imports;
  index += imports;
  // see if we need redux
  if(redux) {
    index += connect;
  }
  // add actions if needed
  if(actions) {
    index += importActions;
  }
  // add styles if needed
  index += importStyles;

  // check for component type
  if(type === 'smart') {
    index += _smartInit(filename);
  } else {
    index += _dumbInit(filename);
  }

  if(redux) {
    hasMSTP = true;
    index += mstp;

    if(hasMDTP) {
      index += mdtp;
    }
  }

  if(redux) {
    index += _connection(hasMSTP, hasMDTP, filename)
  } else {
    index += _exportWithoutConnection(filename);
  }

  return index;
}

module.exports = { b: buildPages, s: stylePage, a: actionsPage };
