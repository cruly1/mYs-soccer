# Build stage
FROM maven:3.8.1-openjdk-17 AS build

WORKDIR /project

COPY pom.xml .

COPY src ./src

RUN mvn clean install

# Run stage
FROM eclipse-temurin:17-jre-alpine

RUN addgroup -S appgroup && adduser -S mysuser -G appgroup

RUN mkdir /app && chown -R mysuser:appgroup /app

COPY --from=build /project/target/*.jar /app/app.jar

WORKDIR /app

EXPOSE 8080

USER mysuser

ENTRYPOINT ["java", "-cp", "/app/app.jar", "-Dloader.path=/app/", "-Dloader.main=com.app.manageyself_soccer.Application", "org.springframework.boot.loader.launch.JarLauncher"]