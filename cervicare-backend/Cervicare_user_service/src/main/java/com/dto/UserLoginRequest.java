package com.dto;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
public class UserLoginRequest {
    // ✅ Getters and Setters
    private String email;
    private String password;

    // ✅ Add default constructor
    public UserLoginRequest() {
    }
}
