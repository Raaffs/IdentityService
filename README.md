<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<br />

<div align="center">

  <h3 align="center">Identity Management Service</h3>

  <p align="center">
</div>



<!-- TABLE OF CONTENTS -->


<!-- ABOUT THE PROJECT -->
## About The Project
This is a full-stack identity management system built to handle user registration, login, and secure profile storage. The project is split into three main parts: a Go backend API, a React (Vite) frontend dashboard, and a PostgreSQL database.
The core focus of this system is the Protection of Personally Identifiable Information (PII). Specifically, it implements AES-256 encryption to ensure that sensitive data like Aadhaar/National ID numbers remain encrypted even if the database is compromised.


### Built With

* [![Go][Go]][Go-url]
* [![React][React.js]][React-url]
* [![psql][psql]][psql-url]
* [![docker][docker]][docker-url]

## Implementation Approach & Core Logic

This project follows a **microservices-friendly architecture** optimized for Docker deployment. Key components include:

1. **Authentication & Authorization**  
   - Users are authenticated via JWTs, generated using `GenerateToken(userID)` and validated in each request with `GetUserJWT()`.
   - JWT claims include the `UserID` and standard JWT expiration.
   - Tokens are generated using the HS256 signing algorithm with a 72-hour expiration.
    
1. **Data Layer**  
   - All user data and profiles are managed through separate repository interfaces (`UserRepository` and `ProfileRepository`) for clean separation of concerns.
   - CRUD operations are abstracted behind the repository layer to allow easy swapping of database backends.
   - Database schema is initialized via the `migrations/` folder. `init.sql` is used to initialize docker container
     
3. **Data Security**  
   - Sensitive fields are encrypted using AES-GCM via `EncryptFields` and `DecryptFields` helpers.
   - Uses Go’s standard libraries: `crypto/aes` for the AES block cipher, `crypto/cipher` for GCM mode, and `crypto/rand` for secure random nonces.
   - AES-256 secret keys are securely managed through environment variables.
   - Passwords are hashed using `bcrypt` with a nonce, ensuring secure storage and protection against brute-force and rainbow table attacks.

4. **Input Validation**
   - User and profile data is validated using the `Validator` utility before saving to the database.
   - Checks include name length, Aadhaar number format, phone number format, and date correctness.
   - Errors are collected in an `Errors` map with descriptive messages for consistent handling of invalid inputs.
     
5. **Error Handling & Responses**
   - Standard HTTP errors are defined via HttpResponseMsg constants (ErrBadRequest, ErrUnauthorized, etc.) for clear messaging.
   - Repository methods return custom errors (`NotFound`, `AlreadyExists`) to provide a consistent interface for the service layer.
   - DB-specific errors (e.g., `pgx.ErrNoRows`, unique constraint violations) are mapped to these custom errors, keeping the service layer database-agnostic.




[Go]: https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white
[Go-url]: https://go.dev/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[psql]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[psql-url]: https://www.postgresql.org/
[docker]: https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white
[docker-url]: https://www.docker.com/
