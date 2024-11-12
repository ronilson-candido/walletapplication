package com.walletapp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
public class AuthController {

    @PostMapping("/send-code")
    public ResponseEntity<ResponseDto> sendCode(@RequestBody PhoneNumberRequest request) {

        String verificationId = "some-generated-id"; 
        return ResponseEntity.ok(new ResponseDto(true, verificationId));
    }

    @PostMapping("/verify-code")
    public ResponseEntity<ResponseDto> verifyCode(@RequestBody VerificationRequest request) {

        boolean success = true; 
        return ResponseEntity.ok(new ResponseDto(success, null));
    }
}
