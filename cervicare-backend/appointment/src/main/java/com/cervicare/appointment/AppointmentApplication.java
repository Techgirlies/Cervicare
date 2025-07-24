package com.cervicare.appointment;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AppointmentApplication {

	public static void main(String[] args) {
		// Load environment variables from .env file (if present)
		Dotenv dotenv = Dotenv.configure()
				.directory(System.getProperty("user.dir"))
				.ignoreIfMissing()
				.load();

		// Set dotenv variables as system properties for Spring Boot access
		dotenv.entries().forEach(entry ->
				System.setProperty(entry.getKey(), entry.getValue())
		);

		// Launch the Spring Boot application
		SpringApplication.run(AppointmentApplication.class, args);
	}
}
