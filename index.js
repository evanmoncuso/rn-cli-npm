#!/usr/bin/env node
import program from 'commander';
import shell from 'shelljs';

import {
  buildPodFiles,
  styles
} from './template-files/parts.js';

const _mkPath = (path) => {
  let pathArr = path.split('/');

  pathArr.forEach((i) => {
    if(shell.ls().indexOf(i) === -1) {
      // mkdir
      shell.mkdir(i);
    }
    // cd into dir
    shell.cd(i);
  })
}

const buildPod = (podname, program) => {
  let pod = {
    podName: podname,
    files: [],
    type: null,
    indexDetails: {
      type: 'smart',
      flow: false,
      redux: false,
      hasMSTP: false,
      hasMDTP: false,
    },
    navDetails: {
      type: null, // 'stack' or 'tab'
    }
  }

  if(program.stackNav || program.tabNav) {
    // if the program is trying to make a navigator component
    pod.files.push('index.js');
    pod.type = 'nav';
    pod.indexDetails = null;
    if(program.stackNav) {
      pod.navDetails.type = 'stack';
    } else if(program.tabNav) {
      pod.navDetails.type = 'tab';
    }
  } else {
    // make a normal pod
    pod.files.push('index.js');
    pod.files.push('styles.js');
    pod.type = 'component';
    pod.navDetails = null;

    // should the pods be a dumb component?
    if(program.dumbComponent) {
      pod.indexDetails.type = 'dumb';
    }

    if(program.flow) {
      pod.indexDetails.flow = true;
    }

    if(program.propTypes) {
      pod.indexDetails.propTypes = true;
    }
    // should the pod connect to redux store?
    if(program.redux) {
      pod.indexDetails.redux = true;
      // mapStateToProps?
      if(program.mapStateToProps) {
        pod.indexDetails.hasMSTP = true;
      }
      // mapDispatchToProps?
      if(program.mapDispatchToProps) {
        pod.indexDetails.hasMDTP = true;
      }
    }
  }

  return pod;
}


program
  .arguments('<podname>')
  .option('-r, --redux', 'has access to the redux store')
  .option('-s, --mapStateToProps', 'include a mapStateToProps function and connect the index.js file to the redux store')
  .option('-d, --mapDispatchToProps', 'include a mapDispatchToProps function and connect the index.js file to the redux store')
  .option('-u, --dumb-component', 'make the component a \'dumb\' or presentational component with no independent state')
  .option('-f, --flow', 'add the flow tag at the top of the index and action file')
  .option('-S, --stackNav', 'create a stack navigator')
  .option('-T, --tabNav', 'create a tab navigator')
  .option('-P, --propTypes', 'use independent prop-types module')
  .parse(process.argv);

let pod = program.args[0];

if(pod.slice(-1) === '/') {
  pod = pod.slice(0, -1);
}
if(pod.slice(0, 1) === '/') {
  pod = pod.slice(1);
}

let podname = pod.split('/').slice(-1)[0];
let podpath = pod.split('/').slice(0, -1).join('/');

const newPod = buildPod(podname, program);

let index = buildPodFiles(newPod);

_mkPath(pod);

// create the files
shell.touch('index.js');
shell.ShellString(index).to('index.js');

console.log(newPod)

if(newPod.type === 'component') {
  shell.touch('styles.js');
  shell.ShellString(styles).to('styles.js');
}
