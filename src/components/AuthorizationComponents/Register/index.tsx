import React, { useState } from "react";
import styles from "./index.module.scss";
import cross from "../../../assets/icons/cross.svg";
import Input from '../../../UI/Input';
import { v4 } from "uuid";
import OtpInput from "./OtpInput/OtpInput";
import { UserReg } from "../../../types/types";
import { LogMethod, RegMethod } from "../../../services/AuthService";

interface RegisterProps {
  setAuthType: (str: string) => void;
  setOpenModal: (openModal: boolean) => void;
}

const Register = ({ setAuthType, setOpenModal }: RegisterProps) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailVerify, setShowEmailVerify] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false);

  const userReg = async (user: UserReg) => {
    setLoading(true)
    const data = await RegMethod(user);
    if (!data.data) {
      setErrorMessage('Что-то пошло не так..')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
      setLoading(false)
    } else if (data.status !== 200) {
      setErrorMessage(data.data.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
      setLoading(false)
    } else {
      setShowEmailVerify(true);
      setLoading(false)
    }
  };

  const userLoginFunc = async () => {
    setLoading(true)
    const data = await LogMethod({ email: email, password: password })
    if (data.data === undefined) {
      setErrorMessage('Что-то пошло не так..')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
      setLoading(false)
    } else if (data.status === undefined) {
      setErrorMessage(data.data.message)
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

  // const bg = <div className={styles.changeBlockContainer} onClick={() => { setShowEmailVerify(false); setOpenModal(false); }}></div>
  const block = <div className={styles.changeBlock}>
    <div className={styles.blockTop}>
      <p className={styles.blockTopText}>Подтверждение e-mail</p>
      <div className={styles.blockClose} onClick={() => { setShowEmailVerify(false); setOpenModal(false); }}></div>
    </div>
    <div className={styles.mail}></div>
    <div className={styles.info}>На указанный адрес электронной почты отправлено письмо. Введите 6-тизначный код из письма для подтверждения вашей почты</div>
    <div className={styles.wrap}>
      <OtpInput value={otp} valueLength={6} onChange={onChange} email={email} password={password} />
      {errorMessage ? error : <></>}
    </div>
    <div className={styles.resent} onClick={() => { setShowEmailVerify(false); userLoginFunc() }}>Письмо не пришло. Повторить отправку</div>
  </div>

  const emailValidate = (email: string) => {
    let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regex.test(email) ? true : false
  }

  const checkCurrent = () => {
    if (login.trim().length <= 3) {
      setErrorMessage(`Длина логина должна быть больше трёх символов`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    } else if (!emailValidate(email)) {
      setErrorMessage(`Проверьте правильность ввода E-mail`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    } else if (password.trim().length <= 5) {
      setErrorMessage(`Длина пароля должна быть больше пяти символов`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    } else {
      userReg({ login: login, email: email, password: password })
    }
  }

  return (
    <>
      {showEmailVerify ? block : <></>}
      {/* {showEmailVerify ? bg : <></>} */}
      <div className={styles.root}>
        <div className={styles.topBlock}>
          <p className={styles.title}>Регистрация</p>
          <img
            src={cross}
            alt=""
            className={styles.cross}
            onClick={() => setOpenModal(false)}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            value={login}
            setValue={setLogin}
            type="text"
            placeholder={`Логин`}
          />
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
        <div className={styles.help}>
          <span
            onClick={() => setPassword(v4())}
            className={styles.helpGeneratePassword}
          >
            Сгенерировать надёжный пароль
          </span>
        </div>
        {errorMessage ? error : <></>}
        <div className={styles.btns}>
          <button
            className={loading ? styles.btnDis : styles.authBtn}
            onClick={() => {
              !loading ?
                checkCurrent()
                : <></>
            }}
          >
            Зарегистрироваться
          </button>
        </div>
        <div className={styles.switchAuth} onClick={() => setAuthType("login")}>
          Вход
        </div>
      </div>
    </>
  );
};
export default Register;
