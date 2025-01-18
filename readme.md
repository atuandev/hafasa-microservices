# HafaSa Bookstore

## Requirement
- JDK 21

## Techs
- Spring Boot
- Spring Security
- Spring Data JPA
- Spring Cloud
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

### Dev mode
1. Clone project: `git clone git@github.com:atuandev/hafasa-microservices.git`
2. Install MySQL from Docker `docker pull mysql:8.4.0`
3. Run Container **MySQL** `docker run --name mysql-8.4.0 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.4.0`
4. Install Redis from Docker `docker pull redis:7.4.1`
5. Run Container **Redis** `docker run --name redis-7.4.1 -p 6379:6379 -d redis:7.4.1`
6. Use **Intellij** to run 4 project
> If error when build, run `mvn clean package`

![image](https://github.com/user-attachments/assets/791fc958-c802-44a5-8948-bad73d613157)


### Database
- Use HeidiSQL to connect the database with **username**: `root`, **password**: `root`
- Import data in `/data` folder

![image](https://github.com/user-attachments/assets/96e321da-49f6-4188-9724-74c2f3d759e1)

### SwaggerUI 

1. Test API with **Postman** or **SwaggerUI** at `http://localhost:8000/swagger-ui.html`
2. Login Admin account:
- username: `admin`
- password: `admin123`

![image](https://github.com/user-attachments/assets/8b2722fd-8006-4009-a8a3-e44d0c37c92d)

