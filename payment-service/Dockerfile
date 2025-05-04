FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# Copy maven executable and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make the mvnw script executable
RUN chmod +x ./mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy the project source
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the built jar file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Set the entrypoint to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]