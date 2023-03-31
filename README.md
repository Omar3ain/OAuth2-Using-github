# GitHub OAuth Example

This is an example Node.js application that demonstrates how to use GitHub's OAuth API to authenticate and fetch data about a user.

## Prerequisites

Before running this application, you'll need to create a GitHub OAuth App and obtain a client ID and secret. You can do this by following the instructions in the [GitHub documentation](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app).

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
Go to the project directory:

cd your-repo
Install the dependencies:

npm install
Set the following environment variables:

CLIENT_SECRET: the client secret of your GitHub OAuth App.
CLIENT_ID: the client ID of your GitHub OAuth App.
REDIRECT_URI: the redirect URI of your GitHub OAuth App.
SCOPE: the scopes that your GitHub OAuth App is requesting.
Start the server:

npm start
The server will start listening on http://localhost:3000.

# API

The API provides the following endpoints:

- `GET /`: returns the URL to the GitHub OAuth authorize page.
- `GET /redirect?code=<code>`: exchanges the authorization code for an access token and sets a session cookie with the access token.
- `GET /profile`: returns the authenticated user's GitHub profile data.
- `GET /followers`: returns the authenticated user's GitHub followers.
- `GET /repos`: returns the authenticated user's GitHub repositories.

## Authentication

The server uses the GitHub OAuth API to authenticate users. The `GET /` endpoint returns the URL to the GitHub OAuth authorize page, where the user can authorize the application to access their GitHub data. After the user authorizes the application, they are redirected to the `GET /redirect` endpoint, which exchanges the authorization code for an access token and sets a session cookie with the access token.

The `GET /profile`, `GET /followers`, and `GET /repos` endpoints require the user to be authenticated. The server checks for the presence of the session cookie and uses the access token stored in the cookie to authenticate the user. If the user is not authenticated, the server returns an error with the message "Unauthorized".
