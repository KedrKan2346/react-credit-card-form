# React Credit Card Form sample app
## Run project:
1. Open terminal window and clone repository.
2. Execute `yarn install` to install dependencies.
3. Execute `npm run dev` to start the project.
4. See `url` and `port` where project is running in the terminal window. Usually it is `http://localhost:5173/`.

## Testing
1. There are 3 type of tests
    - `tabular unit tests` for `utils` and `formatters`
    - `unit tests` for validators
    - `integration tests` for react form component
2. Execute `npm run test` to run tests.

## Project Overview
1. Form validation is built on top of `react-hook-form` and `zod` validation packages.
2. Project bundler is `SWC + Vite`.
3. Project is written on TypeScript.
4. Credit card validation is performed by `card-validator` package which supports [`Luhn algorithm`](https://en.wikipedia.org/wiki/Luhn_algorithm)
5. Current configuration supports 16 digits cards: `Visa`, `Mastercard`, `Discover`, and [15 digits `Amex`](https://moneytips.com/credit/credit-cards/basics/anatomy-of-a-credit-card/#:~:text=Visa%20cards%20begin%20with%20a,6%20and%20%20have%2016%20%20digits);


## Some tips
Example of valid `Amex` card: `378734493671000`
Example of valid `Visa` card: `5555555555554444`;

## Possible improvements
1. Probably 3 or 4 digits code should be decided based on card type during validation.
2. Figure out why `CSS module` is not loaded in `jest` integration tests.
3. Add more tests

## Known Issues
In dev mode when app is started the `[unocss] Entry module not found. Did you add `import 'uno.css'` in your main entry?` overlay error appears. The error is not reproducible in production mode as it is related to server `hmr`. It seems to be a known issue [Bug: `unocss` entry module not found, have you add import 'uno.css' in your main entry?](https://github.com/storybookjs/storybook/issues/26744)