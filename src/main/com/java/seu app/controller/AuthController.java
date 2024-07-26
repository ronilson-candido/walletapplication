package com.walletapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private SmsService smsService;

    private Map<String, String> otpStorage = new HashMap<>();

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        String otp = String.format("%04d", new Random().nextInt(10000));
        otpStorage.put(phoneNumber, otp);
        smsService.sendSms(phoneNumber, "Your OTP code is: " + otp);
        return "OTP sent successfully";
    }

    @PostMapping("/verify-otp")
    public boolean verifyOtp(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        String otp = request.get("otp");
        return otp.equals(otpStorage.get(phoneNumber));
    }
}
