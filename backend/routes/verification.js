const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

router.post('/send-code', (req, res) => {
  const { phoneNumber } = req.body;
  client.verify.services(serviceSid)
    .verifications
    .create({ to: phoneNumber, channel: 'sms' })
    .then(verification => {
      res.status(200).send({ success: true, verificationId: verification.sid });
    })
    .catch(error => {
      res.status(500).send({ success: false, error: error.message });
    });
});

router.post('/verify-code', (req, res) => {
  const { phoneNumber, verificationCode } = req.body;
  client.verify.services(serviceSid)
    .verificationChecks
    .create({ to: phoneNumber, code: verificationCode })
    .then(verificationCheck => {
      if (verificationCheck.status === 'approved') {
        res.status(200).send({ success: true });
      } else {
        res.status(400).send({ success: false, message: 'Código inválido' });
      }
    })
    .catch(error => {
      res.status(500).send({ success: false, error: error.message });
    });
});

module.exports = router;
