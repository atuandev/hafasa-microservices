# Spring API for BookStore

## Requirement
- JDK 21

## Techs
- Spring Boot
- Spring Security
- Spring Data JPA
- Redis
- Lombok
- Mapstruct
- Swagger UI
- MySQL

## Tools
- IntelliJ IDEA 2024
- Docker
- HeidiSQL

## Getting Started

### Prod mode
1. Clone project: `git clone git@github.com:atuandev/bookstore-backend.git`
2. Build Image `docker build -t api-image-bookstore:1.0.0 .`
3. Run Container `docker-compose up -d`
![image](https://github.com/user-attachments/assets/81e1d4ed-6b1c-426a-8525-570dcff496e8)

### Dev mode
1. Clone project: `git clone git@github.com:atuandev/bookstore-backend.git`
2. Install MySQL from Docker `docker pull mysql:8.4.0`
3. Run Container **MySQL** `docker run --name mysql-8.4.0 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.4.0`
4. Install Redis from Docker `docker pull redis:7.4.1`
5. Run Container **Redis** `docker run --name redis-7.4.1 -p 6379:6379 -d redis:7.4.1`
![image](https://github.com/user-attachments/assets/2d93be6f-c87b-4c9b-8faf-7b005dbfc91f)
6. Use **Intellij** to run a project
> If error when build, run `mvn clean package`

### Database
- Use HeidiSQL to connect the database with **username**: `root`, **password**: `root`
- Import data in `/src/data/bookstore.sql`

![image](https://github.com/user-attachments/assets/96e321da-49f6-4188-9724-74c2f3d759e1)

### SwaggerUI 

1. Test API with **Postman** or **SwaggerUI** at `http://localhost:8080/bookstore/swagger-ui/index.html`
2. Login Admin account:
- username: `admin`
- password: `admin123`

![image](https://github.com/user-attachments/assets/8ab9e92e-47e5-40b8-ae04-bf97faaff592)

