package com.service;
import com.dto.UserLoginRequest;
import com.dto.UserRegistrationRequest;
import com.entity.User;
import com.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User register(UserRegistrationRequest request) {
        if (repo.findByEmail(request.getEmail()).isPresent()) {
            return null;
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // Consider hashing
        user.setRole(request.getRole() != null ? request.getRole() : "DOCTOR");
        return repo.save(user);
    }

    public User login(UserLoginRequest request) {
        Optional<User> userOpt = repo.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(request.getPassword())) {
                return user;
            }
        }
        return null;
    }
}
