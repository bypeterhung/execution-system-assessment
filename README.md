## Web GUI

This project corresponds to Web GUI component of the assessment

## Installation

Clone repo then run this node command in project directory: `npm install`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts After Installation

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode with test coverage report.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Choice of Technology

-  as specified in the assessment instruction

### Additional Exception Handling

-  use of error boundary to catch rendering error
-  stock list fetching error message alert

### Ui Improvement

-  pagination in stock list
-  transition effect between stock list and orders basket
-  default stock list sorting
-  check all and uncheck all in orders basket
-  orders basket items count on page header button
-  page button style and placement

### Assumption

-  basket items with error status cannot be edit or submitted again (only mentioned in the instruction pdf: When there is an error response, should update order status to Error.)
-  new basket items list on top
