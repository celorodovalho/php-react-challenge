# php-react-challenge

# Architecture

## Backend: Laravel

I choose the Laravel Framework to the backend for the following reasons:
- Easy setup - In few minutes I can build and up a application
- Large components repository
- REST friendly
- TMDb component available
- Little learning curve

### Backend dependencies
- php-tmdb/laravel: It provides the full mapping to TMDb API endpoints, so there is no need to "reinvent the wheel"

## Frontend: React

- It's a project requirement

### Frontend dependencies
- Axios: Provides a fully mapping to HTTP requests
- Bootstrap 4: I choose this UX framework, because it's common to me easy to use and understand
- qs: A small and common library to convert arrays/objects in QueryString
- react-bootstrap: A fully component implementation of Bootstrap UX
- react-router-dom: A simple Router for React applications

## Assumptions that I made
- There is no information about "Pagination" in requirements, so I choose to use the TMDb API with the pagination
- I intentionally injured the SOLID "Single responsibility principle" in the "search" method of MovieController. Why? I prefer to follow the DRY principle in this moment, once the method just have to retrieve me a movies list, by search or upcoming list.
- I aggregate the "Cast" list to Movie details page, because to me it's a very important information and the API allows to do that.
- There is not PHPUnit tests, because I just write Controllers, so in this case I think "integration tests" are better then Unit Tests.
- The requirements mention that is a "MVP", and intentionally let some "vague" aspects, so it's up to me to make best decision about what to do, so I intentionally generated a ["Technical Debt"](https://hackernoon.com/there-are-3-main-types-of-technical-debt-heres-how-to-manage-them-4a3328a4c50c), because "I need to quickly deliver product to the market".

# Configuration

## Local environment
- In Terminal, go to folder /back and run the commands:
  - composer install
  - php artisan serve
- It will start the backend server in the following address: http://localhost:8000
- Go to folder /front and run the commands:
  - npm install
  - npm run serve
- It will start the frontend server in the following address: http://localhost:3000
- Just go to http://localhost:3000 and test the application
- You can change the TMDb API key in file "back/config/tmdb.php"
- You can change the API Address in the file "front/src/config.js"
- Run the command "npm run build" in the "front" folder to generate the static file of Frontend application

## Remote environment
