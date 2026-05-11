# =========================
# BUILD STAGE
# =========================
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /licensing

# copy only pom first (better caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# copy source
COPY src ./src

# build jar
RUN mvn clean package -DskipTests

# =========================
# RUN STAGE
# =========================
FROM eclipse-temurin:17-jdk

WORKDIR /licensing

# copy built jar from build stage
COPY --from=build /licensing/target/*.jar licensing.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "licensing.jar"]