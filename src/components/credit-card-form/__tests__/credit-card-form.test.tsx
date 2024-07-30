import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CreditCardForm } from '../CreditCardForm';
import { CreditCardFormState } from '../form';

jest.mock('../credit-card-form.module.css', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});
jest.mock('../field-error-message.module.css', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe('CreditCardForm should', function () {
  it('pass validation', async () => {
    const mockSubmit = jest.fn();

    const formData: CreditCardFormState = {
      cardNumber: '378734493671000',
      cardCvv: '4444',
      cardExp: '08/26',
      firstName: 'First Name',
      lastName: 'Last Name',
      zipCode: '44444',
    };
    const { getByText } = render(
      <CreditCardForm formName="mainCcForm" initialFormData={formData} onFormSubmit={mockSubmit} />
    );
    const button = getByText('Submit');

    await userEvent.click(button);

    expect(mockSubmit).toHaveBeenCalledWith(formData);
  });

  it('display "Required field" validation errors fro all 6 inputs', async () => {
    const mockSubmit = jest.fn();

    const { getByText, getAllByText } = render(
      <CreditCardForm formName="mainCcForm" initialFormData={null} onFormSubmit={mockSubmit} />
    );
    const button = getByText('Submit');

    await userEvent.click(button);

    expect(mockSubmit).not.toHaveBeenCalled();

    expect(getAllByText('Required field').length).toBe(6);
  });

  it('fail zip code validation', async () => {
    const mockSubmit = jest.fn();

    const formData: CreditCardFormState = {
      cardNumber: '378734493671000',
      cardCvv: '4444',
      cardExp: '08/26',
      firstName: 'First Name',
      lastName: 'Last Name',
      zipCode: '444445',
    };
    const { getByText } = render(
      <CreditCardForm formName="mainCcForm" initialFormData={formData} onFormSubmit={mockSubmit} />
    );
    const button = getByText('Submit');

    await userEvent.click(button);

    expect(mockSubmit).not.toHaveBeenCalled();

    expect(getByText('Zip can be 5 or 9 characters long'));
  });
});
