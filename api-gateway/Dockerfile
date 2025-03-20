# Stage 1: Build the application
FROM maven:3.9.9-amazoncorretto-21-alpine AS build
WORKDIR /app

# Copy only pom.xml first to leverage Docker cache for dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build
COPY src ./src
RUN mvn clean package -Pprod -DskipTests

# Stage 2: Create the final image with minimal footprint
FROM amazoncorretto:21-alpine
WORKDIR /app

# Create a non-root user to run the application
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy only the jar file from the build stage
COPY --from=build /app/target/*.jar hafasa-api.jar

# Use exec form of ENTRYPOINT with JVM optimizations
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/hafasa-api.jar"]
EXPOSE 8000