var fs = require('fs');

module.exports = function(path) {
  var pkg_path = path + '/package.json', path;

  // Try to read package.json
  try {
    pkg = require(pkg_path);
  } catch (e) {
    throw new Error('Can\'t read package.json.');
  }

  // Default optional keys in pkg root
  pkg.config = pkg.config || {};
  pkg.scripts = pkg.scripts || {};

  // Build options
  var opt = {
    port: pkg.config.port || 8080,
    command: {
      'start': pkg.scripts.start || '/usr/bin/node /var/service/app.js'
    }
  };

  var dockerfile = [
    'FROM ubuntu:precise',
    'MAINTAINER node-dockgen',
    'RUN apt-get install -y python-software-properties python',
    'RUN add-apt-repository ppa:chris-lea/node.js',
    'RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list',
    'RUN apt-get update',
    'RUN apt-get install -y nodejs',
    'RUN mkdir /var/service',
    'EXPOSE ' + opt.port,
    'ENV PORT ' + opt.port,
    'ADD ./ /var/service/',
    'WORKDIR /var/service/',
    'RUN cd /var/service/; npm install',
    'CMD ' + 'PORT=' + opt.port + ' ' + opt.command.start
  ];

  return(dockerfile.join('\n'));

};
