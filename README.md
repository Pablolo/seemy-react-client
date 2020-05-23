# Seemy - React Client

## Description

Seemy is a platform that puts in contact people who has sports & luxury cars with those who want to rent them for a few days. Think about it as a 'Getaround' app, but only focused on high-end cars.

There will be two types of users: owners and renters. Both will have to register. 

* __Owners__ will be able to add their cars on the platform, edit and delete them.
* __Renters__ will be able to browse through all cars, search by name and book them on their desired date.


## User Stories

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the team screws it up so that I know that is not my fault

**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup

**Sign up** - As a user I want to sign up on the webpage so that I can book or list a car

**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**Cars** - As a user I want to see all the events available so that I can choose which ones I want to attend

**Car detail** - As a user I want to see all the details on every car

**List a Car** - As a renter I want to list my car so others can rent it

**Edit Car** - As a renter I want to be able to edit the details of my listed car

**Delete Car** - As a renter I want to be able to delete my listed cars

**Book a Car** - As a client I want to be able to book a car on a desired date


## Backlog

List of other features outside of the MVPs scope

User profile: - see and edit my profile - upload my profile picture.

Book a car: - all the steps to actually book it.

Reviews: - add reviews when you used a car.

Famous: - what famous people have this same car that you're going to book.

* * *
## MVP
### Technique
We will use __React__ for the frontend. 


## Views
### MVP

| Path                  | Description               | Type of User              |
| --------------------- | ------------------------- | ------------------------- |
| `/`                   | Homepage                  | Both                      |
| `/cars`               | show all cars available   | Both                      |
| `/cars/add`           | add a new car             | Owner                     |
| `/cars/:id`           | get a specific car        | Both                      |
| `/cars/:id/update`    | update a car              | Owner                     |
| `/driver/:id`         | see driver profile        | Both                      |
| `/learn-more`         | info on how to use it     | Both                      |
| `/signup`             | signup page               | Both                      |
| `/login`              | login page                | Both                      |

### Backlog

| Path                  | Description               | Type of User              |
| --------------------- | ------------------------- | ------------------------- |
| `/cars/:id/book`      | book a car                | Renter                    |

## Links

### Trello

[Seemy Trello](https://trello.com/b/gNnluUYp/seemy-ironhack)

### Git

[Github Repo - React Client](https://github.com/Pablolo/seemy-react-client)

[Github Repo - Server API](https://github.com/Pablolo/seemy-express-server)

### Deploy

[Heroku Backend](https://seemy.herokuapp.com/)

[See the App Live on Netlify!](https://seemy.netlify.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1ObNk9DjLsHOZoJXh-yFEwvvMG1NtIPOso9FP3NaXWt4/edit?usp=sharing)