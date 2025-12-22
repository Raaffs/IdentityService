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

## Implementation approach and core logic 

### 1.  Backend Implementation

a. **Authentication & Authorization**  
  - Users are authenticated via JWTs, generated using `GenerateToken(userID)` and validated in each request with `GetUserJWT()`.  
  - JWT claims include the `UserID` and standard JWT expiration.  
  - Tokens use the HS256 signing algorithm with a 72-hour expiration.  

b. **Data Layer**  
  - User and profile data is managed through separate repository interfaces (`UserRepository` and `ProfileRepository`) for clean separation of concerns.  
  - CRUD operations are abstracted behind the repository layer to allow easy swapping of database backends.  
  - Database schema is initialized via the `migrations/` folder; `init.sql` is used for Docker container setup.  

c. **Data Security**  
  - Sensitive fields are encrypted using AES-GCM via `EncryptFields` and `DecryptFields`.  
  - Uses Go’s standard libraries: `crypto/aes` (AES block cipher), `crypto/cipher` (GCM mode), and `crypto/rand` (secure nonces).  
  - AES-256 secret keys are stored securely via environment variables.  
  - Passwords are hashed using `bcrypt` with a nonce to protect against brute-force and rainbow table attacks.  

d. **Input Validation**  
  - Data is validated using the `Validator` utility before saving to the database.  
  - Checks include name length, Aadhaar number format, phone number format, and date correctness.  
  - Errors are collected in an `Errors` map for consistent handling of invalid inputs.  

e. **Error Handling**  
  - Standard HTTP errors are defined via `HttpResponseMsg` constants (`ErrBadRequest`, `ErrUnauthorized`, etc.).  
  - Repository methods return custom errors (`NotFound`, `AlreadyExists`) to provide a consistent interface for the service layer.  
  - DB-specific errors (e.g., `pgx.ErrNoRows`, unique constraint violations) are mapped to these custom errors, keeping the service layer database-agnostic.  

### 2. Frontend Implementation

a. **API Integration**  
  - Axios is used for HTTP requests, with the base URL dynamically set from `VITE_API_BASE_URL` and a fallback to `http://localhost:8080/api`.  
  - JWT tokens from `localStorage` are automatically attached to requests via an Axios request interceptor (`Authorization: Bearer <token>`).  

b. **Routing & Route Protection**  
  - Routes are managed with `react-router-dom`.  
  - The `ProtectedRoute` component ensures only authenticated users can access certain pages (e.g., Profile).  
  - Unauthenticated users are redirected to the login page, and unknown routes fall back to a 404 error page.
    
c. **Form Handling & Validation**  
- Forms are implemented using `Formik` for state management and submission handling.  
- Input validation is done with `Yup` schemas, enforcing rules like name length, Aadhaar number format, phone number format, and valid dates.  
- On submit, forms either create or update profiles via the API (`POST` or `PUT` requests to `restricted/profile`).  
- Server responses are handled gracefully, showing success or error messages based on API results.


d. **Theme & Styling**  
- The app uses Material-UI (`@mui`) with a custom theme applied via `ThemeProvider`.  
- Input fields are styled with `textFieldSx` and `activeTextFieldSx` for focused, hover, and disabled states.  
- Buttons use `btnstyle` with gradients, rounded borders, shadows, and hover effects for a modern look.  

[Go]: https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white
[Go-url]: https://go.dev/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[psql]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[psql-url]: https://www.postgresql.org/
[docker]: https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white
[docker-url]: https://www.docker.com/