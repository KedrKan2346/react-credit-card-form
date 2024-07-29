import { ReactElement } from 'react';
import { FieldError } from 'react-hook-form';
import styles from './field-error-message.module.css';

interface FieldErrorMessageProps {
  fieldError?: FieldError;
}

export function FieldErrorMessage({ fieldError }: FieldErrorMessageProps): ReactElement {
  return <div className={styles.content}>{fieldError?.message ? fieldError.message : null}</div>;
}
