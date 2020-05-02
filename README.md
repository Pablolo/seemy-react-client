# seemy-react-client

Seemy is a platform that puts in contact people who has sports & luxury cars with those who want to rent them for a few days. Think about it as a 'Getaround' app but only focused on high-end cars.

There will be two types of users: owners and renters. Both will have to register. 

* Owners will be able to add their cars on the platform, edit and delete them.
* Renters will be able to browse through all cars, search by name and book them on their desired date.

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
| `/cars/list`          | add a new car             | Owner                     |
| `/cars/:id`           | get a specific car        | Both                      |
| `/cars/:id/update`    | update a car              | Owner                     |
| `/learn-more`         | info on how to use it     | Both                      |
| `/signup`             | signup page               | Both                      |
| `/login`              | login page                | Both                      |

### Backlog

| Path                  | Description               | Type of User              |
| --------------------- | ------------------------- | ------------------------- |
| `/cars/:id/book`      | book a car                | Renter                    |


## Links
[Seemy Trello](https://trello.com/b/gNnluUYp/ironhack-module3-project)

[Github - Client React](https://github.com/Pablolo/seemy-react-client)
[Github - Server API](https://github.com/Pablolo/seemy-node-server)