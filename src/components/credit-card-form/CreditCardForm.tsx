import classnames from 'classnames';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreditCardFormState,
  FORM_DEFAULT_VALUES,
  FORM_FIELD_MAX_LENGTH,
  createFormValidationSchema,
} from './form';
import styles from './credit-card-form.module.css';
import { FieldErrorMessage } from './FieldErrorMessage';
import { formatCreditCardNumber, formatCvvCode, formatExpirationDate, formatZipCode } from './formatters';

// Source: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill

interface CreditCardFormProps {
  formName: string;
  disableStrictCreditCardValidation?: boolean;
  initialFormData: CreditCardFormState | null;
  className?: string;
  onFormSubmit: (formData: CreditCardFormState) => void;
}

export function CreditCardForm({
  className,
  formName,
  onFormSubmit,
  initialFormData,
  disableStrictCreditCardValidation = false,
}: CreditCardFormProps) {
  const {
    control,
    handleSubmit: createSubmitHandler,
    formState: { errors },
  } = useForm<CreditCardFormState>({
    defaultValues: initialFormData ? initialFormData : FORM_DEFAULT_VALUES,
    resolver: zodResolver(createFormValidationSchema({ disableStrictCreditCardValidation })),
  });

  const handleSubmitFormSuccessful: SubmitHandler<CreditCardFormState> = function handleSubmitFormSuccessful(
    data: CreditCardFormState
  ) {
    onFormSubmit({
      ...data,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
    });
  };

  return (
    <div className={classnames(styles.content, className)}>
      <form onSubmit={createSubmitHandler(handleSubmitFormSuccessful)}>
        <div className={styles.formItem}>
          <label htmlFor={`${formName}-cc-number`}>Credit Card Number</label>
          <Controller
            control={control}
            name={'cardNumber'}
            render={({ field: { value, ...rest } }) => {
              return (
                <input
                  type="text"
                  className={classnames(styles.input, styles.inputFullWidth)}
                  id={`${formName}-cc-number`}
                  aria-label="Credit Card Number"
                  autoComplete="cc-number"
                  maxLength={FORM_FIELD_MAX_LENGTH.cardNumber}
                  value={formatCreditCardNumber(value)}
                  {...rest}
                />
              );
            }}
          />
          <FieldErrorMessage fieldError={errors.cardNumber} />
        </div>
        <div className={styles.formItemsRow}>
          <div className={classnames(styles.formItem, styles.formItemExp)}>
            <label htmlFor={`${formName}-cc-exp`}>Exp Date (MM/YY)</label>
            <Controller
              control={control}
              name={'cardExp'}
              render={({ field: { value, ...rest } }) => {
                return (
                  <input
                    type="text"
                    className={classnames(styles.input, styles.inputExp)}
                    id={`${formName}-cc-exp`}
                    aria-label="Expiration Date"
                    autoComplete="cc-exp"
                    maxLength={FORM_FIELD_MAX_LENGTH.cardExp}
                    value={formatExpirationDate(value)}
                    {...rest}
                  />
                );
              }}
            />

            <FieldErrorMessage fieldError={errors.cardExp} />
          </div>
          <div className={classnames(styles.formItem, styles.formItemCvv)}>
            <label htmlFor={`${formName}-cc-cvv`}>CVV</label>
            <Controller
              control={control}
              name="cardCvv"
              render={({ field: { value, ...rest } }) => {
                return (
                  <input
                    type="text"
                    className={classnames(styles.input, styles.inputCvv)}
                    id={`${formName}-cc-cvv`}
                    aria-label="CVV"
                    autoComplete="cc-csc"
                    maxLength={FORM_FIELD_MAX_LENGTH.cardCvv}
                    value={formatCvvCode(value)}
                    {...rest}
                  />
                );
              }}
            />
            <FieldErrorMessage fieldError={errors.cardCvv} />
          </div>
        </div>
        <div className={styles.formItemsRow}>
          <div className={classnames(styles.formItem, styles.formItemFirstName)}>
            <label htmlFor={`${formName}-first-name`}>First Name</label>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { value, ...rest } }) => {
                return (
                  <input
                    type="text"
                    className={classnames(styles.input, styles.inputFirstName)}
                    id={`${formName}-first-name`}
                    aria-label="First Name"
                    autoComplete="given-name"
                    maxLength={FORM_FIELD_MAX_LENGTH.firstName}
                    value={value}
                    {...rest}
                  />
                );
              }}
            />

            <FieldErrorMessage fieldError={errors.firstName} />
          </div>
          <div className={styles.formItem}>
            <label htmlFor={`${formName}-last-name`}>Last Name</label>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { value, ...rest } }) => {
                return (
                  <input
                    type="text"
                    className={classnames(styles.input, styles.inputLastName)}
                    id={`${formName}-last-name`}
                    aria-label="Last Name"
                    autoComplete="family-name"
                    maxLength={FORM_FIELD_MAX_LENGTH.lastName}
                    value={value}
                    {...rest}
                  />
                );
              }}
            />
            <FieldErrorMessage fieldError={errors.lastName} />
          </div>
        </div>
        <div className={styles.formItem}>
          <label htmlFor={`${formName}-zip-code`}>Zip Code</label>
          <Controller
            control={control}
            name="zipCode"
            render={({ field: { value, ...rest } }) => {
              return (
                <input
                  type="text"
                  className={classnames(styles.input, styles.inputFullWidth)}
                  id={`${formName}-zip-code`}
                  aria-label="Zip Code"
                  autoComplete="postal-code"
                  maxLength={FORM_FIELD_MAX_LENGTH.zipCode}
                  value={formatZipCode(value)}
                  {...rest}
                />
              );
            }}
          />
          <FieldErrorMessage fieldError={errors.zipCode} />
        </div>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
