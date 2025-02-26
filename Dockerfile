# Stage 1: Build the application
FROM maven:3.9.9-amazoncorretto-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -Pprod -DskipTests

# Stage 2: Create the final image
FROM amazoncorretto:21-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar bookstore-api.jar
ENTRYPOINT ["java", "-jar", "/app/bookstore-api.jar"]
EXPOSE 8080