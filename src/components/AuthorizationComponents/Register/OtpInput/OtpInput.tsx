import React, { useMemo, useState } from 'react'
import styles from './OtpInput.module.scss'
import { CodeMethod } from '../../../../services/AuthService';

export type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
  email: string;
  password: string;
};

const OtpInput = ({ value, valueLength, onChange, email, password }: Props) => {

  const [errorMessage, setErrorMessage] = useState('');

  const sendCode = async (code: string) => {
    const { data } = await CodeMethod({ email: email, password: password, code: code })
    if (data?.access_token) {
      localStorage.setItem('access_token', data.access_token)
      document.location.href = '/'
    } else {
      const inps = document.querySelectorAll(`.${styles.otpInput}`) || document.createElement('input');
      setErrorMessage(data);
      inps.forEach((inp) => {
        (inp as HTMLInputElement).style.backgroundColor = 'rgba(211, 65, 118, 0.2)';
        (inp as HTMLInputElement).style.borderBottom = '1px solid rgba(211, 65, 118, 1)';
      })
      setTimeout(() => {
        setErrorMessage('');
        inps.forEach((inp) => {
          (inp as HTMLInputElement).style.backgroundColor = '#2666FF15';
          (inp as HTMLInputElement).style.borderBottom = '1px solid #2666FF';
        })
      }, 3000);
    }
  }

  const RE_DIGIT = new RegExp(/^\d+$/);

  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }
    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };


  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : ' ';

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      let newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (newValue.trim().length === 6) {
        sendCode(newValue);
        value = '';
        newValue = '';
      }


      if (!isTargetValueDigit) {
        return;
      }

      const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

      if (nextElementSibling) {
        nextElementSibling.focus();
      }
      focusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);
      target.blur();
    }

    if (!RE_DIGIT.test(targetValue)) {
      return;
    }

  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { key } = e;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    target.setSelectionRange(0, targetValue.length);

    if (e.key !== 'Backspace' || target.value !== '') {
      return;
    }

    focusToPrevInput(target);

    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    const prevInputEl = target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  return (
    <>
      <div className={styles.otpGroup}>
        {valueItems.map((digit, idx) => (
          <input
            key={idx}
            onChange={(e) => inputOnChange(e, idx)}
            onKeyDown={inputOnKeyDown}
            onFocus={inputOnFocus}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{1}"
            maxLength={valueLength}
            className={styles.otpInput}
            value={digit}
          />
        ))}
      </div>
      {errorMessage ? error : <></>}
    </>
  )
}

export default OtpInput