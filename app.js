var Cylon = require('cylon');

Cylon.robot({
    connections: {
        edison: { adaptor: 'intel-iot' }
    },
    
    devices: {
        mpl3115a2: { driver: 'mpl3115a2' }
    },
    
    work: function (my) {
        every((2).seconds(), function () {
            my.mpl3115a2.getValues(function (err, data) {
                console.log("data " + JSON.stringify(data));
            });
        });
    }
}).start();

//var m = require('mraa'); //require mraa

//// helper function to go from hex val to dec
//function char(x) { return parseInt(x, 16); }

//var i2c = new m.I2c(0)
//i2c.address(0x60)
//i2c.writeReg(0x26, 0xB8);
//i2c.writeReg(0x13, 0x07);
//i2c.writeReg(0x26,0xB9);
//var d = i2c.readReg(0x00);
//console.log(d);
//// initialise device
////if (x.readReg(char('0xd0')) != char('0x55')) {
////    console.log("error");
////}

////// we want to read temperature so write 0x2e into control reg
////x.writeReg(char('0xf4'), char('0x2e'))

////// read a 16bit reg, obviously it's uncalibrated so mostly a useless value :)
////console.log(x.readWordReg(char('0xf6')))

////// and we can do the same thing with the read()/write() calls if we wished
////// thought I'd really not recommend it!
////buf = new Buffer(2)
////buf[0] = char('0xf4')
////buf[1] = char('0x2e')
////console.log(buf.toString('hex'))
////x.write(buf)

////x.writeByte(char('0xf6'))
////d = x.read(2)