package com.controller;

import com.dto.UserLoginRequest;
import com.dto.UserRegistrationRequest;
import com.service.UserService;
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