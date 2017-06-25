#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _parts = require('./template-files/parts.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _mkPath = function _mkPath(path) {
  var pathArr = path.split('/');

  pathArr.forEach(function (i) {
    if (_shelljs2.default.ls().indexOf(i) === -1) {
      // mkdir
      _shelljs2.default.mkdir(i);
    }
    // cd into dir
    _shelljs2.default.cd(i);
  });
};

var buildPod = function buildPod(podname, program) {
  var pod = {
    podName: podname,
    files: [],
    type: null,
    indexDetails: {
      type: 'smart',
      flow: false,
      redux: false,
      hasMSTP: false,
      hasMDTP: false
    },
    navDetails: {
      type: null }
  };

  if (program.stackNav || program.tabNav) {
    // if the program is trying to make a navigator component
    pod.files.push('index.js');
    pod.type = 'nav';
    pod.indexDetails = null;
    if (program.stackNav) {
      pod.navDetails.type = 'stack';
    } else if (program.tabNav) {
      pod.navDetails.type = 'tab';
    }
  } else {
    // make a normal pod
    pod.files.push('index.js');
    pod.files.push('styles.js');
    pod.type = 'component';
    pod.navDetails = null;

    // should the pods be a dumb component?
    if (program.dumbComponent) {
      pod.indexDetails.type = 'dumb';
    }

    if (program.flow) {
      pod.indexDetails.flow = true;
    }

    if (program.propTypes) {
      pod.indexDetails.propTypes = true;
    }
    // should the pod connect to redux store?
    if (program.redux) {
      pod.indexDetails.redux = true;
      // mapStateToProps?
      if (program.mapStateToProps) {
        pod.indexDetails.hasMSTP = true;
      }
      // mapDispatchToProps?
      if (program.mapDispatchToProps) {
        pod.indexDetails.hasMDTP = true;
      }
    }
  }

  return pod;
};

_commander2.default.arguments('<podname>').option('-r, --redux', 'has access to the redux store').option('-s, --mapStateToProps', 'include a mapStateToProps function and connect the index.js file to the redux store').option('-d, --mapDispatchToProps', 'include a mapDispatchToProps function and connect the index.js file to the redux store').option('-u, --dumb-component', 'make the component a \'dumb\' or presentational component with no independent state').option('-f, --flow', 'add the flow tag at the top of the index and action file').option('-S, --stackNav', 'create a stack navigator').option('-T, --tabNav', 'create a tab navigator').option('-P, --propTypes', 'use independent prop-types module').parse(process.argv);

var pod = _commander2.default.args[0];

if (pod.slice(-1) === '/') {
  pod = pod.slice(0, -1);
}
if (pod.slice(0, 1) === '/') {
  pod = pod.slice(1);
}

var podname = pod.split('/').slice(-1)[0];
var podpath = pod.split('/').slice(0, -1).join('/');

var newPod = buildPod(podname, _commander2.default);

var index = (0, _parts.buildPodFiles)(newPod);

_mkPath(pod);

// create the files
_shelljs2.default.touch('index.js');
_shelljs2.default.ShellString(index).to('index.js');

console.log(newPod);

if (newPod.type === 'component') {
  _shelljs2.default.touch('styles.js');
  _shelljs2.default.ShellString(_parts.styles).to('styles.js');
}