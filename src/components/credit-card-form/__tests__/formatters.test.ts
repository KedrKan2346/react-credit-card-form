import { formatCreditCardNumber, formatZipCode, formatExpirationDate, formatCvvCode } from '../formatters';

describe('formatCreditCardNumber should', function () {
  describe('detect Amex card type', function () {
    it.each`
      input                  | result
      ${'378734493671000'}   | ${'3787-344936-71000'}
      ${'3787-344936-7100W'} | ${'3787-344936-7100'}
      ${'37873449367'}       | ${'3787-344936-7'}
      ${'3787344936'}        | ${'3787-344936'}
      ${'3787344'}           | ${'3787-344'}
      ${'37873'}             | ${'3787-3'}
      ${'3787'}              | ${'3787'}
      ${''}                  | ${''}
    `('and return 15 digits formatted value for Amex', ({ input, result }) => {
      expect(formatCreditCardNumber(input)).toEqual(result);
    });
  });

  describe('detect Visa/MasterCard type', function () {
    it.each`
      input                 | result
      ${'5555555555554444'} | ${'5555-5555-5555-4444'}
      ${'5555555555554'}    | ${'5555-5555-5555-4'}
      ${'555555555555'}     | ${'5555-5555-5555'}
      ${'555555555'}        | ${'5555-5555-5'}
      ${'555555'}           | ${'5555-55'}
      ${''}                 | ${''}
    `('and return 16 digits formatted value', ({ input, result }) => {
      expect(formatCreditCardNumber(input)).toEqual(result);
    });
  });
});

describe('formatZipCode should', function () {
  it.each`
    input          | result
    ${'123456789'} | ${'12345-6789'}
    ${'123456'}    | ${'12345-6'}
    ${'12345'}     | ${'12345'}
    ${''}          | ${''}
  `('format 5 and 9 digits codes', ({ input, result }) => {
    expect(formatZipCode(input)).toEqual(result);
  });
});

describe('formatExpirationDate should', function () {
  it.each`
    input     | result
    ${'1122'} | ${'11/22'}
    ${'112'}  | ${'11/2'}
    ${'11'}   | ${'11'}
    ${'1/'}   | ${'01/'}
    ${''}     | ${''}
  `('format value as digit characters only', ({ input, result }) => {
    expect(formatExpirationDate(input)).toEqual(result);
  });
});

describe('formatCvvCode should', function () {
  it.each`
    input      | result
    ${'11W22'} | ${'1122'}
    ${'11/2'}  | ${'112'}
    ${'11'}    | ${'11'}
    ${'1/'}    | ${'1'}
    ${''}      | ${''}
  `('format value as digit characters only', ({ input, result }) => {
    expect(formatCvvCode(input)).toEqual(result);
  });
});
