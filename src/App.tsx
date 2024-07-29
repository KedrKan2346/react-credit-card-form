import { CreditCardForm, CreditCardFormState } from './components/credit-card-form';
import styles from './app.module.css';
import { useState } from 'react';

function App() {
  const [formSubmissionIsSuccessfulVisible, setFormSubmissionIsSuccessfulVisible] = useState(false);

  function handleSubmitMainCreditCard(data: CreditCardFormState) {
    console.log(data);
    setFormSubmissionIsSuccessfulVisible(true);

    setTimeout(() => {
      setFormSubmissionIsSuccessfulVisible(false);
    }, 5000);
  }

  return (
    <div className={styles.content}>
      <CreditCardForm
        className={styles.creditCardForm}
        formName="mainCreditCard"
        initialFormData={null}
        onFormSubmit={handleSubmitMainCreditCard}
      />
      {formSubmissionIsSuccessfulVisible && (
        <div className={styles.submissionSuccessful}>Form has been submitted successfully</div>
      )}
    </div>
  );
}

export default App;
