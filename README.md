# Dev Environment Setup
- Run `npm i` or `yarn install`
- I havent exposed the twitter OAUTH TOKENS create a file `apiconfig.js` in server folder
- In dev environment you need to run client and server seperately
- Open new terminal and run `npm run devapp`
- Open new terminal and run `npm run devserver`

`apiconfig.js`
 ```
  const API_KEY = XXXXXXXXXXXXXXX;
  const API_SECRET_KEY = XXXXXXXXXXXXXXX";
  const ACCESS_TOKEN = XXXXXXXXXXXXXXX;
  const ACCESS_TOKEN_SECRET = XXXXXXXXXXXXXXX;

module.exports = {
  API_KEY,
  API_SECRET_KEY,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET 
}
 ```

# Prod SetUp

- Run `npm run prodserver` to start server.
- For Prod environment you need to set the following fields as environment variable.

```
API_KEY
API_SECRET_KEY
ACCESS_TOKEN
ACCESS_TOKEN_SECRET
```
