# Stage 1: Build the app
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy the JAR file
COPY target/user-service-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8083
EXPOSE 8083

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
