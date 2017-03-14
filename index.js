#!/usr/bin/env node

const program = require('commander');
const shell = require('shelljs');

const parts = require('./template-files/parts');

const _mkPath = (path) => {
  pathArr = path.split('/');

  pathArr.forEach((i) => {
    if(shell.ls().indexOf(i) === -1) {
      // mkdir
      shell.mkdir(i);
    }
    // cd into dir
    shell.cd(i);
  })
}

const _buildPod = (podname, program) => {
  let pod = {
    podName: podname,
    files: ['index.js', 'styles.js'],
    type: 'smart',
    redux: false,
    flow: false,
    indexDetails: {
      hasMSTP: false,
      hasMDTP: false,
    }
  }

  // should the pods be a dumb component?
  if(program.dumbComponent) {
    pod.type = 'dumb';
  }

  if(program.flow) {
    pod.flow = true;
  }
  // should the pod connect to redux store?
  if(program.redux) {
    pod.redux = true;
    // mapStateToProps?
    if(program.mapStateToProps) {
      pod.indexDetails.hasMSTP = true;
    }
    // mapDispatchToProps?
    if(program.mapDispatchToProps) {
      pod.indexDetails.hasMDTP = true;
    }
    // actions?
  }

  if(program.addActions) {
    pod.files.push('actions.js');
  }

  return pod;
}

program
  .arguments('<podname>')
  .option('-r, --redux', 'has access to the redux store')
  .option('-a, --add-actions', 'include an actions file')
  .option('-s, --mapStateToProps', 'include a mapStateToProps function and connect the index.js file to the redux store')
  .option('-d, --mapDispatchToProps', 'include a mapDispatchToProps function and connect the index.js file to the redux store')
  .option('-u, --dumb-component', 'make the component a \'dumb\' or presentational component with no independent state')
  .option('-f, --flow', 'add the flow tag at the top of the index and action file')
  .parse(process.argv);

const newIndex = parts.b(_buildPod(program.args, program));

let pod = program.args[0];
if(pod.slice(-1) === '/') {
  pod = pod.slice(0, -1);
}
if(pod.slice(0, 1) === '/') {
  pod = pod.slice(1);
}

let podname = pod.split('/').slice(-1)[0];
let podpath = pod.split('/').slice(0, -1).join('/');

console.log(pod, podpath, podname);

// make a directory
_mkPath(pod);

// create the files
shell.touch('index.js');
shell.ShellString(newIndex).to('index.js');

shell.touch('styles.js');
shell.ShellString(parts.s).to('styles.js');

if(program.addActions) {
  shell.touch('actions.js');
  if(program.flow) {
    shell.ShellString(parts.f).to('actions.js');
    shell.ShellString(parts.a).toEnd('actions.js');
  } else {
    shell.ShellString(parts.a).to('actions.js');
  }
}
