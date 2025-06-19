package com.cervicare.service;

import com.cervicare.dto.UserLoginRequest;
import com.cervicare.dto.UserRegistrationRequest;
import com.cervicare.entity.User;
import com.cervicare.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public String register(UserRegistrationRequest request) {
        if (repo.findByEmail(request.getEmail()).isPresent()) {
            return "Email already registered";
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // Plain for now
        repo.save(user);
        return "User registered successfully";
    }

    public String login(UserLoginRequest request) {
        return repo.findByEmail(request.getEmail())
                .filter(u -> u.getPassword().equals(request.getPassword()))
                .map(u -> "Login successful")
                .orElse("Invalid email or password");
    }
}