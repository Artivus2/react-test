import React, { useState } from "react";
import styles from "./index.module.scss";
import cross from "../../../assets/icons/cross.svg";
import Input from '../../../UI/Input';
import { LogMethod } from "../../../services/AuthService";
import OtpInput from "../Register/OtpInput/OtpInput";
// import { userLogin } from "../../../services/profileServices";
// import { FormattedMessage, useIntl } from "react-intl";

interface LoginProps {
  setAuthType: (str: string) => void;
  setOpenModal: (openModal: boolean) => void;
  setStatus: (status: boolean) => void;
}

const Login = ({ setAuthType, setOpenModal, setStatus }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requestStatus, setRequestStatus] = useState<any>();
  const [errorMessage, setErrorMessage] = useState('')
  const [showEmailVerify, setShowEmailVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  const userLoginFunc = async () => {
    setLoading(true)
    const data = await LogMethod({ email: email, password: password })
    if (data.data === undefined) {
      setErrorMessage('Что-то пошло не так..')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
      setLoading(false)
    } else if (data.status === 400) {
      setErrorMessage('Неверный логин или пароль')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
      setLoading(false)
    } else {
      setShowEmailVerify(true);
      setLoading(false)
    }
  };

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const [otp, setOtp] = useState('');
  const onChange = (value: string) => setOtp(value);

  const block = <div className={styles.changeBlock}>
    <div className={styles.blockTop}>
      <p className={styles.blockTopText}>Код подтверждения</p>
      <div className={styles.blockClose} onClick={() => { setShowEmailVerify(false); setOpenModal(false); }}></div>
    </div>
    <div className={styles.mail}></div>
    <div className={styles.info}>На указанный адрес электронной почты отправлено письмо. Введите 6-тизначный код из письма</div>
    <div className={styles.wrap}>
      <OtpInput value={otp} valueLength={6} onChange={onChange} email={email} password={password} />
      {errorMessage ? error : <></>}
    </div>
    <div className={styles.resent} onClick={() => { setShowEmailVerify(false); userLoginFunc() }}>Письмо не пришло. Повторить отправку</div>
  </div>

  return (
    <>
      {showEmailVerify ? block : <></>}
      <div className={styles.root}>
        <div className={styles.topBlock}>
          <p className={styles.title}>Авторизация</p>
          <img
            src={cross}
            alt=""
            className={styles.cross}
            onClick={() => setOpenModal(false)}
          />
        </div>
        <div className={styles.warning}>
          <p className={styles.warningText}>
            Для пользования площадкой необходимо зарегистрировать отдельный аккаунт на GREEnavi.ru
          </p>
        </div>
        <div className={styles.inputBlock}>
          <Input
            value={email}
            setValue={setEmail}
            type="email"
            placeholder={`E-mail`}
          />
          <Input
            value={password}
            setValue={setPassword}
            type="password"
            placeholder={`Пароль`}
          />
        </div>
        {errorMessage ? error : <></>}
        <div className={styles.help}>
          <span className={styles.helpPassword}>Забыли пароль?</span>
        </div>
        <div className={styles.btns}>
          <button
            className={loading ? styles.btnDis : styles.authBtn}
            onClick={() => {
              !loading ?
                userLoginFunc()
                : <></>
            }}
          >
            Авторизоваться
          </button>
        </div>
        <div
          className={styles.switchAuth}
          onClick={() => setAuthType("register")}
        >
          Регистрация
        </div>
      </div>
    </>
  );
};
export default Login;
