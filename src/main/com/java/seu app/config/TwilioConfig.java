package com.walletapp.config;

import com.twilio.Twilio;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TwilioConfig {

    private final String ACCOUNT_SID = "your_account_sid";
    private final String AUTH_TOKEN = "your_auth_token";

    @Bean
    public void initializeTwilio() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }
}
