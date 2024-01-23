# Project Overview

This project is for Project Portfolio 3 at Full Sail University. It is a simple web application that utilizes the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) to allow users to search for artists, albums, and tracks. This application is built using ReactJS.

# Prerequisites

- NodeJS >= v21.3.0
- npm >= 10.2.4
- MongoDB >= 6.3.0
- Chrome/Firefox/Edge/Safari/Arc >= Latest version

# Getting Started

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Run `npm install` to install all dependencies.
    - After this step, you will need to create your `.env` file in the root directory of the `api` folder. Copy the contents of `.env.dist` into your `.env` file and fill in the values.
4. In terminal, navigate to the `api` folder and run `npm run watch`.
5. In a new terminal, navigate to the `reactjs` folder and run `npm run start`.
5. Navigate to `http://localhost:3000` in your browser.

# Set Up Mongo Database

1. Navaigate to [Mongo Atlas](https://www.mongodb.com/cloud/atlas) and create an account.
2. Create a new project.
3. Click on the create button under "Create a deployment".
4. Choose the free tier option.
5. Choose a region.
6. Click on the "Create" button.
7. Create a user, and save the username and password.
8. Add the your IP address to the IP access list. Or you can add 0.0.0.0 to allow all IP addresses.
9. Click finish and close.
10. Click on the `CONNECT` button.
11. Click on Drivers.
12. Copy the connection string to your `.env` file in the `api` folder. Make sure to replace `<password>` with the password you created in step 7.


# Links

- http://localhost:3000 - ReactJS application frontend, primary interface for the application
- http://localhost:3001/spotify - NodeJS application backend, handles API requests to Spotify Web API
