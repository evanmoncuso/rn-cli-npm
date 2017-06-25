'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var styles = exports.styles = 'import { StyleSheet, Dimensions } from \'react-native\';\nconst { height, width } = Dimensions.get(\'window\');\n\nexport const styles = StyleSheet.create({\n\n})\n';

var actionsPage = '/**\n  A nice example action obj\n\n  const dispatchXYZ = (data) => {\n    return {\n      type: \'AN_ACTION\',\n      data: data,\n    }\n  }\n*/\n\nexport const actions = {\n\n}\n';

var flowFlag = '// @flow\n\n';

var imports = 'import React, { Component } from \'react\';\nimport {\n  Text,\n  View,\n} from \'react-native\';\n';

var importStyles = '\nimport { styles } from \'./styles\';\n\n';

var props = 'import PropTypes from \'prop-types\';\n';

var connect = 'import { connect } from \'react-redux\';\n';

var _dumbInit = function _dumbInit(podName) {
  return 'const ' + podName + ' = () => {\n  return (\n\n  );\n}\n\n' + podName + '.propTypes = {\n};\n\n';
};

var _smartInit = function _smartInit(podName) {
  return 'class ' + podName + ' extends Component {\n  constructor(props, context) {\n    super(props, context);\n    this.state = {\n\n    }\n  }\n\n  render() {\n    return (\n\n    )\n  }\n}\n\n' + podName + '.propTypes = {\n};\n\n';
};

var stack = function stack(podName) {
  return 'import { StackNavigator } from \'react-navigation\';\n\n/*\nimport ComponentName from \'./path/to/component\';\n*/\n\nconst ' + podName + ' = StackNavigator({\n  //ComponentName: \'ComponentName\',\n}, {\n  headerMode: \'\',\n  initialRouteName: \'\',\n});\n\nexport default ' + podName + ';';
};

var tab = function tab(podName) {
  return 'import { TabNavigator } from \'react-navigation\';\n\n/*\nimport ComponentName from \'./path/to/component\';\n*/\n\nconst ' + podName + ' = TabNavigator({\n  //ComponentName: \'ComponentName\',\n}, {\n initialRouteName: \'\',\n});\n\nexport default ' + podName + ';';
};

var mstp = 'const mapStateToProps = (state) => (\n  {\n\n  }\n);\n\n';

var mdtp = 'const mapDispatchToProps = (dispatch) => (\n  {\n\n  }\n);\n\n';

var _connection = function _connection(mstp, mdtp, podName) {
  mstp = mstp ? 'mapStateToProps' : null;
  mdtp = mdtp ? 'mapDispatchToProps' : null;
  return '\nexport default connect(' + mstp + ', ' + mdtp + ')(' + podName + ');\n  ';
};

var _exportWithoutConnection = function _exportWithoutConnection(podName) {
  return 'export default ' + podName + ';';
};

var buildPodFiles = exports.buildPodFiles = function buildPodFiles(buildObj) {
  var index = '';
  var podName = buildObj.podName;


  if (buildObj.type === 'nav') {
    // create a nav object
    var type = buildObj.navDetails.type;

    if (type === 'stack') {
      return stack(podName);
    } else {
      return tab(podName);
    }
  } else {
    // create a component
    var _buildObj$indexDetail = buildObj.indexDetails,
        _type = _buildObj$indexDetail.type,
        redux = _buildObj$indexDetail.redux,
        hasMSTP = _buildObj$indexDetail.hasMSTP,
        hasMDTP = _buildObj$indexDetail.hasMDTP,
        flow = _buildObj$indexDetail.flow,
        propTypes = _buildObj$indexDetail.propTypes;
    // build the index age;

    // check flow

    if (flow) {
      index += flowFlag;
    }

    // add imports;
    index += imports;
    // see if we need redux
    if (redux) {
      index += connect;
    }

    if (propTypes) {
      index += props;
    }
    // add styles if needed
    index += importStyles;

    // check for component type
    if (_type === 'smart') {
      index += _smartInit(podName);
    } else {
      index += _dumbInit(podName);
    }
    if (redux) {
      hasMSTP = true;
      index += mstp;

      if (hasMDTP) {
        index += mdtp;
      }
    }

    if (redux) {
      index += _connection(hasMSTP, hasMDTP, podName);
    } else {
      index += _exportWithoutConnection(podName);
    }

    return index;
  }
};