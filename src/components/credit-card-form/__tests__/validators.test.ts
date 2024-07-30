import { createFormValidationSchema, CreditCardFormState } from '../form';

const formValidationSchema = createFormValidationSchema({ disableStrictCreditCardValidation: false });

describe('formValidationSchema', function () {
  describe('should pass validation when', function () {
    it('with valid Amex credit card', async () => {
      const formData: CreditCardFormState = {
        cardNumber: '378734493671000',
        cardCvv: '4444',
        cardExp: '08/26',
        firstName: 'First Name',
        lastName: 'Last Name',
        zipCode: '12345',
      };
      expect(() => formValidationSchema.parse(formData)).not.toThrow();
    });
    it('with valid Visa/Master card 16 digits credit card', async () => {
      const formData: CreditCardFormState = {
        cardNumber: '5555555555554444',
        cardCvv: '333',
        cardExp: '08/26',
        firstName: 'First Name',
        lastName: 'Last Name',
        zipCode: '12345',
      };
      expect(() => formValidationSchema.parse(formData)).not.toThrow();
    });
  });
  describe('should fail validation when', function () {
    it('with invalid Amex credit card', async () => {
      const formData: CreditCardFormState = {
        cardNumber: '378734493671099',
        cardCvv: '4444',
        cardExp: '08/26',
        firstName: 'First Name',
        lastName: 'Last Name',
        zipCode: '12345',
      };
      expect(() => formValidationSchema.parse(formData)).toThrow();
    });
    it('with invalid Visa/Master card 16 digits credit card', async () => {
      const formData: CreditCardFormState = {
        cardNumber: '5555555555554400',
        cardCvv: '333',
        cardExp: '08/26',
        firstName: 'First Name',
        lastName: 'Last Name',
        zipCode: '12345',
      };
      expect(() => formValidationSchema.parse(formData)).toThrow();
    });
  });
});
