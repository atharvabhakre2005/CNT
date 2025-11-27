📘 VIT Result Backend – Spring Boot + MongoDB Atlas Setup Guide

This guide explains every step required to set up and run the Spring Boot backend with MongoDB Atlas, starting from installing Java/Maven up to running the project successfully.

📌 1. Install Java (JDK 17)

Spring Boot requires Java.
Download JDK 17 (LTS) from Eclipse Adoptium:

🔗 https://adoptium.net/temurin/releases/?version=17

During installation:

✔ Enable Modify PATH variable
✔ Enable Set/override JAVA_HOME

After installation, verify:

java -version

📌 2. Install Apache Maven

Download latest stable Maven:

🔗 https://dlcdn.apache.org/maven/maven-3/3.9.11/binaries/apache-maven-3.9.11-bin.zip

Steps:

Extract to:

C:\apache-maven-3.9.11


Add to PATH:

C:\apache-maven-3.9.11\bin


Verify Maven:

mvn -version


If you see Maven & Java versions → success.

📌 3. Get the Project

Navigate to your backend folder:

cd D:\5th sem\CNT\CNT-Exam\Springboot-main\Springboot-main\backend

📌 4. Install MongoDB Atlas

Go to: https://www.mongodb.com/atlas

Create a free cluster

Create a database user (username + password)

Click Connect → Drivers

Select:

Driver: Java

Version: 4.11+

Copy the connection string (WITHOUT password):

mongodb+srv://<username>:<password>@cluster0.frm3jjg.mongodb.net/?appName=Cluster0

📌 5. Add MongoDB URI in Spring Boot

Open:

src/main/resources/application.properties


Add this (replace your password):

spring.data.mongodb.uri=mongodb+srv://USERNAME:PASSWORD@cluster0.frm3jjg.mongodb.net/vitresults?retryWrites=true&w=majority&appName=Cluster0


✔ Make sure vitresults (database name) is present
❗ Without DB name, Spring Boot will crash with “Database name must not be empty”.

📌 6. (Optional) Add MongoDB Dependencies

Your pom.xml should include:

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>


(Optional for API Testing):

<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
</dependency>

📌 7. Run the Spring Boot Backend

From inside the backend folder:

mvn spring-boot:run


You should see logs:

✔ MongoDB connected
✔ Repositories initialized
✔ Tomcat started on port 8080
✔ Application started successfully

📌 8. Access Your Backend

Default URL:

http://localhost:8080


Swagger UI (if enabled):

http://localhost:8080/swagger-ui/index.html

📌 9. Common Fixes
❗ Maven not recognized

Add to PATH:

C:\apache-maven-3.9.11\bin

❗ JAVA_HOME incorrect

Set:

JAVA_HOME = C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot

❗ MongoDB connection error

Ensure DB name exists:

...mongodb.net/vitresults?retryWrites=true...
