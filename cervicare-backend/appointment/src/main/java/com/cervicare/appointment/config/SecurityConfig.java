package com.cervicare.appointment.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors() // 👈 this is key
                .and()
                .csrf().disable() // adjust as needed
                .authorizeHttpRequests()
                .anyRequest().permitAll(); // adjust to your auth rules

        return http.build();
    }
}
