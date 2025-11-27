# VIT Result API (Spring Boot + MongoDB)

## Prereqs
- Java 17+
- Maven 3.9+
- MongoDB running locally on `mongodb://localhost:27017`

## Run
```bash
cd backend
mvn spring-boot:run
```
API base: `http://localhost:8080/api/results`

### Endpoints
- `POST /add`  — add a result (JSON body)
- `GET /all`   — list all results
