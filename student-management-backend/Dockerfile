# STEP 1 - Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy Maven files first (caching)
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
COPY mvnw.cmd .

# Download dependencies (cache layer)
RUN mvn -q -B dependency:go-offline

# Copy entire project
COPY src ./src

# Build project
RUN ./mvnw clean package -DskipTests


# STEP 2 - Run stage
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
