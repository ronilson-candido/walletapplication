package com.walletapp.service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    public void sendSms(String to, String body) {
        Message.creator(new PhoneNumber(to), new PhoneNumber("your_twilio_number"), body).create();
    }
}
