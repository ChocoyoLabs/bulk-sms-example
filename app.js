require('dotenv').config();
const SmsGateway = require('smsgateway');
const parse = require('csv-parse');
const fs = require('fs');

// device ID from smsgateway.me
const deviceId = process.env.SMS_GATEWAY_DEVICE_ID;

let csvOut = fs.readFileSync('./list.csv', 'utf8');
let gateway = new SmsGateway(process.env.SMS_GATEWAY_EMAIL, process.env.SMS_GATEWAY_PASSWORD);

// parse csv file content
parse(csvOut, (err, output) => {

  // validate if data
  if (output) {

    // each items/lines
    output.forEach((item) => {
      let firstName = item[0].split(' ')[0];
      let message = `Hello ${firstName}, message - Att: Chocoyo Labs`;
      let number = item[1];

      // send SMS
      gateway.send(number, message, deviceId).then((data) => {
          console.log('Send Success');
          console.log(data);
      }).fail((errorMessage) => {
          console.log('failed',errorMessage);
      });
    });
  } else {
    console.log('Invalid csv');
  }
});
