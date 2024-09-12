# NLM API Integration with TypeScript

## Setup Instructions

1. Clone the repository
  ```
  git clone git@github.com:jshberglingcps/DavidGill.git
  ```
  or
  ```
  git clone https://github.com/jshberglingcps/DavidGill.git
  ```

2. Install dependencies
  ```
  npm install
  ```

3. Run the application
  ```
  npm start
  ```

4. Run tests
  ```
  npm test
  ```

## API Endpoints Used

- Get drug details: `/drugs.json?name={drugName}`
- Get proprietary information: `/rxcui/{rxcui}/proprietary.xml`
