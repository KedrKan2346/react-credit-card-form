import { createFormValidationSchema, CreditCardFormState } from '../form';

const formValidationSchema = createFormValidationSchema({ disableStrictCreditCardValidation: false });

const DEFAULT_FORM_DATA: CreditCardFormState = {
  cardNumber: '5555555555554444',
  cardCvv: '4444',
  cardExp: '08/26',
  firstName: 'First Name',
  lastName: 'Last Name',
  zipCode: '12345',
};

describe('formValidationSchema', function () {
  describe('should validate credit card and', function () {
    it('pass with valid Amex', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, cardNumber: '378734493671000' };
      expect(() => formValidationSchema.parse(formData)).not.toThrow();
    });
    it('pass with valid 16 digits Visa/Master', async () => {
      const formData: CreditCardFormState = DEFAULT_FORM_DATA;
      expect(() => formValidationSchema.parse(formData)).not.toThrow();
    });
    it('fail with invalid Amex', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, cardNumber: '378734493671099' };
      expect(() => formValidationSchema.parse(formData)).toThrow('Invalid card number');
    });
    it('fail with invalid 16 digits Visa/Master', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, cardNumber: '5555555555554400' };
      expect(() => formValidationSchema.parse(formData)).toThrow('Invalid card number');
    });
  });
  describe('should validate zip code and', function () {
    it('pass with valid 5 digits code', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, zipCode: '12345' };
      expect(() => formValidationSchema.parse(formData)).not.toThrow();
    });
    it('pass with valid 9 digits code', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, zipCode: '123456789' };
      expect(() => formValidationSchema.parse(formData)).not.toThrow();
    });
    it('pass with hyphen separator character', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, zipCode: '12345-6789' };
      expect(() => formValidationSchema.parse(formData)).not.toThrow();
    });
    it('fail with non digit character', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, zipCode: '12345W6789' };
      expect(() => formValidationSchema.parse(formData)).toThrow('Must contain numbers only');
    });
    it('fail with 4 digits code', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, zipCode: '1234' };
      expect(() => formValidationSchema.parse(formData)).toThrow('Zip can be 5 or 9 characters long');
    });
    it('fail with 6 digits code', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, zipCode: '123456' };
      expect(() => formValidationSchema.parse(formData)).toThrow('Zip can be 5 or 9 characters long');
    });
  });
  describe('should validate CVV code and', function () {
    it('pass with valid 3 digits code', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, cardCvv: '123' };
      expect(() => formValidationSchema.parse(formData)).not.toThrow();
    });
    it('pass with valid 4 digits code', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, cardCvv: '1234' };
      expect(() => formValidationSchema.parse(formData)).not.toThrow();
    });
    it('fail with 2 digits', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, cardCvv: '12' };
      expect(() => formValidationSchema.parse(formData)).toThrow('Must contain 3 digits (4 for Amex)');
    });
    it('fail with non digit character', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, cardCvv: '12w' };
      expect(() => formValidationSchema.parse(formData)).toThrow('Must contain numbers only');
    });
  });

  describe('should validate firstName and', function () {
    it('pass with alphanumeric or space characters', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, firstName: 'Jack Ma' };
      expect(() => formValidationSchema.parse(formData)).not.toThrow();
    });
    it('fail with not allowed character', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, firstName: 'Jack Ma 1' };
      expect(() => formValidationSchema.parse(formData)).toThrow(
        'Must contain alphabetic characters or space'
      );
    });
  });

  describe('should validate lastName and', function () {
    it('pass with alphanumeric or space characters', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, lastName: 'Jack Ma' };
      expect(() => formValidationSchema.parse(formData)).not.toThrow();
    });
    it('fail with not allowed character', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, lastName: 'Jack Ma 1' };
      expect(() => formValidationSchema.parse(formData)).toThrow(
        'Must contain alphabetic characters or space'
      );
    });
  });

  describe('should validate expiration date and', function () {
    it('pass with valid MM/YY format', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, cardExp: '08/26' };
      expect(() => formValidationSchema.parse(formData)).not.toThrow();
    });
    it('fail with invalid 1/26 value', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, cardExp: '1/26' };
      expect(() => formValidationSchema.parse(formData)).toThrow('Invalid expiration date format MM/YY');
    });
    it('fail with invalid 01/2 value', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, cardExp: '01/2' };
      expect(() => formValidationSchema.parse(formData)).toThrow('Invalid expiration date format MM/YY');
    });
    it('fail with invalid 0129 value', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, cardExp: '0129' };
      expect(() => formValidationSchema.parse(formData)).toThrow('Invalid expiration date format MM/YY');
    });
    it('fail with invalid 00/29 value', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, cardExp: '00/29' };
      expect(() => formValidationSchema.parse(formData)).toThrow('Invalid month. Valid values are 1-12');
    });
    it('fail with invalid 14/29 value', async () => {
      const formData: CreditCardFormState = { ...DEFAULT_FORM_DATA, cardExp: '14/29' };
      expect(() => formValidationSchema.parse(formData)).toThrow('Invalid month. Valid values are 1-12');
    });
  });
});
