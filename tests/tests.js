var expect = require('chai').expect;
var fs = require('fs');
var jsonFs = require('../');

var DATA;
var TEMP_FILE = './tests/FIXTURES/tmp.json';

describe('json-fs', function () {
  beforeEach(function (done) {
    DATA = require('./FIXTURES/data.json');
    fs.writeFile(TEMP_FILE, JSON.stringify(DATA, null, '  '), done);
  });

  afterEach(function (done) {
    DATA = null;
    fs.unlink(TEMP_FILE, done);
  });

  it('should readFile', function (done) {
    jsonFs.readFile(TEMP_FILE, function (err, data) {
      expect(data).to.deep.equal(DATA);
      done();
    });
  });

  it('should readFileSync', function () {
    var data = jsonFs.readFileSync(TEMP_FILE);
    expect(data).to.deep.equal(DATA);
  });

  it('should writeFile', function (done) {
    DATA.bar = 'hello boston';

    var original = fs.readFileSync(TEMP_FILE).toString().replace('world', 'boston');

    jsonFs.writeFile(TEMP_FILE, DATA, function (err) {
      var created = fs.readFileSync(TEMP_FILE).toString();
      expect(original).to.equal(created);
      done();
    });
  });

  it('should writeFileSync', function () {
    DATA.bar = 'hello boston';
    var original = fs.readFileSync(TEMP_FILE).toString().replace('world', 'boston');
    jsonFs.writeFileSync(TEMP_FILE, DATA);
    var created = fs.readFileSync(TEMP_FILE).toString();
    expect(original).to.equal(created);
  });
});
