# ---- Build Stage ----
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /build
COPY . .
RUN mvn clean package -DskipTests

# ---- Run Stage ----
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=builder /build/target/datasaver-microservice-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar"]
