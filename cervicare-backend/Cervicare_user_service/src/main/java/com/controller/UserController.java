package com.cervicare.controller;

import com.cervicare.dto.UserLoginRequest;
import com.cervicare.dto.UserRegistrationRequest;
import com.cervicare.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public String register(@RequestBody UserRegistrationRequest request) {
        return service.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody UserLoginRequest request) {
        return service.login(request);
    }
}