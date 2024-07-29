import { z } from 'zod';
import cardValidator from 'card-validator';
import { isNumber } from '../../utils/number';

export interface CreditCardFormState {
  cardNumber: string;
  cardExp: string;
  cardCvv: string;
  firstName: string;
  lastName: string;
  zipCode: string;
}

export const FORM_DEFAULT_VALUES = {
  cardNumber: '',
  cardExp: '',
  cardCvv: '',
  firstName: '',
  lastName: '',
  zipCode: '',
};

const requiredStringConstraint = z.string().min(1, { message: 'Required field' });

function removeAllSeparators(value: string | null): string {
  if (!value) {
    return '';
  }

  return value.replace(new RegExp(/[ -]/, 'g'), '');
}

export function createFormValidationSchema(options: { disableStrictCreditCardValidation: boolean }) {
  const { disableStrictCreditCardValidation } = options;
  return z.object({
    cardNumber: requiredStringConstraint.refine(
      (val) => {
        const trimmedValue = removeAllSeparators(val);
        const numberValidation = cardValidator.number(trimmedValue);

        if (!disableStrictCreditCardValidation) {
          return numberValidation.isValid;
        }

        return numberValidation.isValid || numberValidation.isPotentiallyValid;
      },
      {
        message: 'Invalid card number',
      }
    ),
    cardExp: requiredStringConstraint
      .refine(
        (val) => {
          return /^\d{2}\/\d{2}$/.test(val);
        },
        {
          message: 'Invalid expiration date format MM/YY',
        }
      )
      .refine(
        (val) => {
          const valParts = val ? val.split('/') : [];
          const monthString = valParts[0];
          if (!isNumber(monthString)) {
            return false;
          }
          const month = parseInt(monthString);
          if (month < 1 || month > 12) {
            return false;
          }
          return true;
        },
        {
          message: 'Invalid month. Valid values are 1-12',
        }
      ),
    cardCvv: requiredStringConstraint
      .min(3, {
        message: 'Must contain 3 digits (4 for Amex)',
      })
      .refine(
        (val) => {
          const trimmedValue = removeAllSeparators(val);
          return /^[0-9]+$/.test(trimmedValue);
        },
        {
          message: 'Must contain numbers only',
        }
      ),
    firstName: requiredStringConstraint.refine((val) => /^[A-Za-z ]+$/.test(val), {
      message: 'Must contain alphabetic characters or space',
    }),
    lastName: requiredStringConstraint.refine((val) => /^[A-Za-z ]+$/.test(val), {
      message: 'Must contain alphabetic characters or space',
    }),
    zipCode: requiredStringConstraint
      .refine(
        (val) => {
          const trimmedValue = removeAllSeparators(val);
          return /^[0-9]+$/.test(trimmedValue);
        },
        {
          message: 'Must contain numbers only',
        }
      )
      .refine(
        (val) => {
          const trimmedValue = removeAllSeparators(val);
          if (trimmedValue.length === 5 || trimmedValue.length === 9) {
            return true;
          }
          return false;
        },
        {
          message: 'Zip can be 5 or 9 characters long',
        }
      ),
  });
}

export const FORM_FIELD_MAX_LENGTH = {
  cardNumber: 19, // 16 digits + 3 spaces
  cardExp: 5, // 2 digits, hyphen, 2 digits
  cardCvv: 4,
  firstName: 255,
  lastName: 255,
  zipCode: 10, // 5 digits, hyphen, 4 digits
};
