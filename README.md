# Backend developer assessment by José Luis Jiménez

## Instalation
Running `npm install` will install al the project's dependencies.

## Development
Running `npm start` will start an auto reload server using **nodemon**. By default, the system uses a db in memory for development.

## Production
Setting the environment variable **NODE_ENV** to **production** to start the server in prodcution mode, this include shutting down the api explorer and configuring a connection to a mongo database.

## Endpoints

To see the list of endpoints and their responses just access the route **GET/explorer**. Every request must have a header called **Authentication** with the email of the user making the request.

*  To get user data based on user id **GET /users/{id}**
*  To get user data based on user name **GET /clients?filter[where][name]={name}**
*  To get the list of policies linked to a user name **GET /clients?filter[where][name]={name}&filter[include]=policies**
*  To get the user linked to a policy number **GET /policies/{id}/client**

## Testing
Execute `npm test` to run unit tests. 
