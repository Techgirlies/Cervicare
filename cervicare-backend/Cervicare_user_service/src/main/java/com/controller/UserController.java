package com.controller;

import com.dto.UserLoginRequest;
import com.dto.UserRegistrationRequest;
import com.entity.User;
import com.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody UserRegistrationRequest request) {
        User user = service.register(request);
        Map<String, Object> response = new HashMap<>();

        if (user == null) {
            response.put("message", "Email already registered");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("id", user.getId());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        response.put("message", "User registered successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserLoginRequest request) {
        User user = service.login(request);
        Map<String, Object> response = new HashMap<>();

        if (user == null) {
            response.put("message", "Invalid email or password");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("id", user.getId());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        response.put("message", "Login successful");
        return ResponseEntity.ok(response);
    }
}
