package com.isf6.socialLoginTest.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @GetMapping("/loginTest")
    public String login() {
        return "Hello World";
    }
}
