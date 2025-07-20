FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/datasaver-microservice-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 5000
ENTRYPOINT ["java","-jar","app.jar"]
