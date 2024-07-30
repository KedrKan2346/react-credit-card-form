# React Credit Card Form sample app
## Run project:
1. Open terminal window and clone repository.
2. Execute `yarn install` to install dependencies.
3. Execute `npm run dev` to start the project.
4. See `url` and `port` where project is running in the terminal window. Usually it is `http://localhost:5173/`.

## Project Overview
1. Form validation is built on top of `react-hook-form` and `zod` validation packages.
2. Project bundler is `SWC + Vite`.
3. Project is written on TypeScript.
4. Credit card validation is performed by `card-validator` package which supports [`Luhn algorithm`](https://en.wikipedia.org/wiki/Luhn_algorithm)
5. Current configuration supports 16 digits cards: `Visa`, `Mastercard`, `Discover`, and [15 digits `Amex`](https://moneytips.com/credit/credit-cards/basics/anatomy-of-a-credit-card/#:~:text=Visa%20cards%20begin%20with%20a,6%20and%20%20have%2016%20%20digits);
6. There are 3 type of tests
    - `tabular unit tests` for `utils` and `formatters`
    - `unit tests` for validators
    - `integration tests` for react form component

## Some tips
Example of valid `Amex` card: `378734493671000`
Example of valid `Visa` card: `5555555555554444`;

## Possible improvements
1. Probably 3 or 4 digits code should be decided based on card type during validation.
2. Add more tests
