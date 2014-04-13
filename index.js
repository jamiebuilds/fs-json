var fs = require('fs');
var util = require('util');
var detectIndent = require('detect-indent');

var jsonFs = exports;

jsonFs.readFile = function () {
  var args = arguments;
  var callback = args[args.length - 1];

  if (typeof callback !== 'function') {
    throw new Error('json-fs::readFile needs callback function');
  }

  args[args.length - 1] = function (err, data) {
    if (err) return callback(err);
    data = JSON.parse(data.toString());
    callback(null, data);
  };

  return fs.readFile.apply(fs, args);
};

jsonFs.readFileSync = function () {
  var data = fs.readFileSync.apply(fs, arguments);
  return JSON.parse(data.toString());
};

jsonFs.writeFile = function () {
  var args = arguments;
  var callback = args[args.length - 1];

  if (typeof callback !== 'function') {
    throw new Error('json-fs::writeFile needs callback function');
  }

  fs.readFile(args[0], function (err, data) {
    if (err) return callback(err);
    var indent = detectIndent(data.toString()) || '  ';
    args[1] = JSON.stringify(args[1], null, indent);
    return fs.writeFile.apply(fs, args);
  });
};

jsonFs.writeFileSync = function () {
  var args = arguments;
  var data = fs.readFileSync(args[0]);
  var indent = detectIndent(data.toString()) || '  ';
  args[1] = JSON.stringify(args[1], null, indent);
  fs.writeFileSync.apply(fs, args);
};
