# GeoLocation App


### Install Dependencies


```
npm install
```


### Run the Application

```
npm start
```

Navigate `http://localhost:8000/index.html`.



## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  view2/                --> the template and logic
    geolocation.html            --> template
    geolocation.js              --> controller logic
    geolocation_test.js         --> tests of the controller
  app.js                --> main application module
  index.html            --> app layout file
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```


### Running Unit Tests


```
npm test
```

### End to end testing
* the configuration is found at `e2e-tests/protractor-conf.js`
* the end-to-end tests are found in `e2e-tests/scenarios.js`


```
npm run protractor
```
