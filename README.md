## Installation and running the project

To run first install dependencies:
`yarn install` or `npm install`

Then start the project with:
`yarn start` or `npm start`


## Available Backend Functions

### `listCLients()` List all clients 
### `listVenues()` List all venues 
### `getVenue(venue_id)` Get a single venue 
### `getClient(client_id)` Get a single client 
### `addClient(client)` Adds a client, required email and user
### `addVenue(venue)` Adds a venue, required name
### `getClientFavoriteVenues(client_id)` Returns a client's favorite venues
### `addFavoriteVenueToClient(client_id, venue_id)` Add favorite venue to client
### `removeFavoriteVenueFromClient(client_id, venue_id)` Remove favorite venue from client
### `removeVenue(venue_id)` Removes a venue
### `removeClient(client_id)` Removes a client
