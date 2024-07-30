import { isNumber } from '../../utils/number';
import cardValidator from 'card-validator';

const DATE_SEPARATOR = '/';

// NOTE: If this parameter should be configurable the formatter functions can be
// created with factory higher order function or class can be used instead.
const NUMERIC_GROUPS_SEPARATOR = '-';

const matchDateSeparators = new RegExp(DATE_SEPARATOR, 'g');

const matchNumericGroupSeparators = new RegExp(NUMERIC_GROUPS_SEPARATOR, 'g');

function getLastCharacter(value: string): string {
  return value ? value[value.length - 1] : '';
}

export function formatExpirationDate(value: string): string {
  if (!value) {
    return '';
  }

  const lastCharacter = getLastCharacter(value);

  // Skip non-digits and non-separator characters
  if (lastCharacter && lastCharacter !== DATE_SEPARATOR && !isNumber(lastCharacter)) {
    return value.substring(0, value.length - 1);
  }

  // cannot have more than one separator
  if (lastCharacter === DATE_SEPARATOR && (value.match(matchDateSeparators)?.length ?? 0) > 1) {
    return value.substring(0, value.length - 1);
  }

  // cannot start with separator
  if (value === DATE_SEPARATOR) {
    return '';
  }

  // add separator automatically if does not exist yet
  if (value.length > 2 && !value.includes(DATE_SEPARATOR)) {
    return value.replace(/^(\d{2})(\d+)/, `$1${DATE_SEPARATOR}$2`);
  }

  // add leading month's zero when user enter separator
  if (lastCharacter === DATE_SEPARATOR && value.length > 1) {
    const month = value.substring(0, value.length - 1);
    if (month.length === 1) {
      return ['0', value].join('');
    }
  }

  return value;
}

export function formatCvvCode(value: string): string {
  if (!value) {
    return '';
  }
  return value.replace(/\D/g, '');
}

export function formatZipCode(value: string): string {
  if (!value) {
    return '';
  }

  const lastCharacter = getLastCharacter(value);

  // Skip non-digits and non-separator characters
  if (lastCharacter && lastCharacter !== NUMERIC_GROUPS_SEPARATOR && !isNumber(lastCharacter)) {
    return value.substring(0, value.length - 1);
  }

  // cannot have more than one separator
  if (
    lastCharacter === NUMERIC_GROUPS_SEPARATOR &&
    (value.match(matchNumericGroupSeparators)?.length ?? 0) > 1
  ) {
    return value.substring(0, value.length - 1);
  }

  // cannot start with separator
  if (value === NUMERIC_GROUPS_SEPARATOR) {
    return '';
  }

  // skip separator if first group of digits is less than 5
  if (lastCharacter === NUMERIC_GROUPS_SEPARATOR && value.length <= 5) {
    return value.substring(0, value.length - 1);
  }

  // add separator automatically if does not exist yet
  if (value.length > 5 && !value.includes(NUMERIC_GROUPS_SEPARATOR)) {
    return value.replace(/^(\d{5})(\d+)/, `$1${NUMERIC_GROUPS_SEPARATOR}$2`);
  }

  return value;
}

export function formatCreditCardNumber(value: string): string {
  if (!value) {
    return '';
  }
  const lastCharacter = getLastCharacter(value);

  // Skip non-digits and non-separator characters
  if (lastCharacter && lastCharacter !== NUMERIC_GROUPS_SEPARATOR && !isNumber(lastCharacter)) {
    return value.substring(0, value.length - 1);
  }

  // Remove any non-digit characters
  const cardNumber = value.replace(/\D/g, '');

  const cardValidationResult = cardValidator.number(cardNumber);

  if (cardValidationResult.card?.type === 'american-express') {
    if (cardNumber.length > 4 && cardNumber.length <= 10) {
      return cardNumber.replace(/^(\d{4})(\d+)/, `$1${NUMERIC_GROUPS_SEPARATOR}$2`);
    } else if (cardNumber.length > 10) {
      return cardNumber.replace(
        /^(\d{4})(\d{6})(\d+)/,
        `$1${NUMERIC_GROUPS_SEPARATOR}$2${NUMERIC_GROUPS_SEPARATOR}$3`
      );
    }

    return cardNumber;
  }

  // Insert a space every 4 digits
  return cardNumber.replace(/(\d{4})(?=\d)/g, `$1${NUMERIC_GROUPS_SEPARATOR}`);
}
