'use strict';

var expect = require('chai').expect;


describe('to-integer', function () {

  var toInteger = require('../../');

  it('common test', function () {
    expect(toInteger(1)).to.be.equal(1);
    expect(toInteger(Number.MAX_VALUE)).to.be.equal(Number.MAX_VALUE);
    expect(toInteger(Number.MIN_VALUE)).to.be.equal(Number.MIN_VALUE);
    expect(toInteger(Infinity)).to.be.equal(Infinity);
    expect(toInteger()).to.be.equal(0);
    expect(toInteger(null)).to.be.equal(0);
  });

  it('convert boolean to 0/1', function () {
    expect(toInteger(true)).to.be.equal(1);
    expect(toInteger(false)).to.be.equal(0);
  });

  it('convert string', function () {
    expect(toInteger('1')).to.be.equal(1);
    expect(toInteger('0')).to.be.equal(0);
    expect(toInteger('-1')).to.be.equal(-1);
    expect(toInteger('1.1000')).to.be.equal(1);
    expect(toInteger('-1.100')).to.be.equal(-1);
    expect(toInteger('01')).to.be.equal(1);
    expect(toInteger('0.10')).to.be.equal(0);
    expect(toInteger('1a')).to.be.equal(1);
    expect(toInteger('a1')).to.be.NaN
  });


  it('convert binary', function () {
    expect(toInteger('0b01')).to.be.equal(1);
    expect(toInteger('0b10')).to.be.equal(2);
    expect(toInteger('0b11')).to.be.equal(3);
    expect(toInteger('0b02')).to.be.NaN
  });

  it('convert octal', function () {
    expect(toInteger('0o01')).to.be.equal(1);
    expect(toInteger('0o07')).to.be.equal(7);
    expect(toInteger('0o10')).to.be.equal(8);
    expect(toInteger('0o08')).to.be.NaN;

  });

  it('convert hex', function () {
    expect(toInteger('0x01')).to.be.equal(1);
    expect(toInteger('0x0F')).to.be.equal(15);
    expect(toInteger('0x0G')).to.be.NaN;
    expect(toInteger('-0x0F')).to.be.NaN;
    expect(toInteger('+0x0F')).to.be.NaN;
  });

  it('convert object', function () {

    var obj = { foo: 1 };

    expect(toInteger(obj)).to.be.NaN

    obj.valueOf = null;
    expect(toInteger(obj)).to.be.NaN

    obj.valueOf = function () {
      return 1;
    };
    expect(toInteger(obj)).to.be.equal(1);

    obj.valueOf = function () {
      return 0;
    };
    expect(toInteger(obj)).to.be.equal(0);

    expect(toInteger(function () {})).to.be.NaN
    expect(toInteger(new Object(1))).to.be.equal(1);
    expect(toInteger(new Number(1))).to.be.equal(1);
    expect(toInteger(new Number(1.1))).to.be.equal(1.1);
  });
});
