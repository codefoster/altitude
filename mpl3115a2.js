/*
 * MPL3115A2 I2C Barometric Pressure, Altitude, and Temperature sensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-14 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var MPL3115A2_STATUS = 0x00,
    MPL3115A2_REGISTER_PRESSURE_MSB = 0x01,
    MPL3115A2_REGISTER_PRESSURE_CSB = 0x02,
    MPL3115A2_REGISTER_PRESSURE_LSB = 0x03,
    MPL3115A2_REGISTER_TEMP_MSB = 0x04,
    MPL3115A2_REGISTER_TEMP_LSB = 0x05,
    MPL3115A2_DR_STATUS = 0x06,
    MPL3115A2_OUT_P_DELTA_MSB = 0x07,
    MPL3115A2_OUT_P_DELTA_CSB = 0x08,
    MPL3115A2_OUT_P_DELTA_LSB = 0x09,
    MPL3115A2_OUT_T_DELTA_MSB = 0x0A,
    MPL3115A2_OUT_T_DELTA_LSB = 0x0B,
    MPL3115A2_WHO_AM_I = 0x0C,
    MPL3115A2_F_STATUS = 0x0D,
    MPL3115A2_F_DATA = 0x0E,
    MPL3115A2_F_SETUP = 0x0F,
    MPL3115A2_TIME_DLY = 0x10,
    MPL3115A2_SYSMOD = 0x11,
    MPL3115A2_INT_SOURCE = 0x12,
    MPL3115A2_PT_DATA_CFG = 0x13,
    MPL3115A2_BAR_IN_MSB = 0x14,
    MPL3115A2_BAR_IN_LSB = 0x15,
    MPL3115A2_P_TGT_MSB = 0x16,
    MPL3115A2_P_TGT_LSB = 0x17,
    MPL3115A2_T_TGT = 0x18,
    MPL3115A2_WND_MSB = 0x19,
    MPL3115A2_WND_LSB = 0x1A,
    MPL3115A2_T_WND = 0x1B,
    MPL3115A2_P_MIN_MSB = 0x1C,
    MPL3115A2_P_MIN_CSB = 0x1D,
    MPL3115A2_P_MIN_LSB = 0x1E,
    MPL3115A2_T_MIN_MSB = 0x1F,
    MPL3115A2_T_MIN_LSB = 0x20,
    MPL3115A2_P_MAX_MSB = 0x21,
    MPL3115A2_P_MAX_CSB = 0x22,
    MPL3115A2_P_MAX_LSB = 0x23,
    MPL3115A2_T_MAX_MSB = 0x24,
    MPL3115A2_T_MAX_LSB = 0x25,
    MPL3115A2_CTRL_REG1 = 0x26,
    MPL3115A2_CTRL_REG2 = 0x27,
    MPL3115A2_CTRL_REG3 = 0x28,
    MPL3115A2_CTRL_REG4 = 0x29,
    MPL3115A2_CTRL_REG5 = 0x2A,
    MPL3115A2_OFF_P = 0x30,
    MPL3115A2_OFF_T = 0x31,
    MPL3115A2_OFF_H = 0x32;

var Mpl3115A2 = module.exports = function Mpl3115A2() {
  Mpl3115A2.__super__.constructor.apply(this, arguments);
  this.address = 0x60;
  this.commands = {
    get_values: this.getValues,
  };
};

Cylon.Utils.subclass(Mpl3115A2, Cylon.Driver);

Mpl3115A2.prototype.start = function(callback) {
  //this.readCoefficients(callback);
  callback();
};

Mpl3115A2.prototype.halt = function(callback) {
  callback();
};

Mpl3115A2.prototype.getValues = function(callback) {
  var self = this;
    
    //set oversample rate to 128 (to put into altimeter mode)
    this.connection.i2cWrite(this.address, MPL3115A2_CTRL_REG1, 128);
  
 // this.connection.i2cWrite(this.address, MPL3115A2_REGISTER_STARTCONVERSION);
 // this.connection.i2cWrite(this.address, 0x00);

  Cylon.Utils.sleep(5);

  this.connection.i2cRead(this.address, MPL3115A2_REGISTER_PRESSURE_MSB, 5, function(err, d) {
    var pressure, altitude, temp, pressureComp;
    var data = new Buffer(d);

    pressure = (data.readUInt16BE(0)) >> 6;
    temp = (data.readUInt16BE(2)) >> 6;

    self.pressure = ((65.0 / 1023.0) * pressureComp) + 50.0;
	self.altitude = 0;
    self.temperature = ((temp - 498.0) / -5.35) + 25.0;

    var values = {
      'pressure': self.pressure,
	  'altitude': self.altitude,
      'temperature': self.temperature
    };

    callback(err, values);
  });
    //callback(null,{ 'pressure': 4, 'altitude': 4, 'temperature': 4 });

};

Mpl3115A2.prototype.getValues = Mpl3115A2.prototype.getValues;