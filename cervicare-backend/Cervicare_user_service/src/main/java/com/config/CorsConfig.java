package com.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("https://cervicare-frontend-mknk.onrender.com") // ✅ Frontend origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")      // ✅ Allowed methods
                        .allowedHeaders("*")                                            // ✅ All headers
                        .allowCredentials(true);                                        // ✅ For localStorage/cookies
            }
        };
    }
}
