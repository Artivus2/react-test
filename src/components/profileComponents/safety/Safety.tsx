import React, { useEffect, useState } from 'react'
import styles from './Safety.module.scss'
import cross from '../../../assets/icons/cross.svg'
import Input from '../../../UI/Input'
import Success from '../../../UI/Success/Success'
import Error from '../../../UI/Error/Error'
import { Link } from 'react-router-dom'
import { UserProfile } from '../../../types/types'
import { ChangePassword, TwoFactor, TwoFactorNew } from '../../../services/UserService'

const Safety = (props: any) => {

  const [show2Fa, setShow2Fa] = useState(false)
  const [showPassModal, setShowPassModal] = useState(false)
  const [newPass, setNewPass] = useState('')
  const [oldPass, setOldPass] = useState('')
  const [newPass2, setNewPass2] = useState('')
  const [valueLogin, setValueLogin] = useState('')
  const [valueCode, setValueCode] = useState('')
  const [qr, setQr] = useState('')
  const [secret, setSecret] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [okMessage, setOkMessage] = useState('')

  const [profile, setProfile] = useState<UserProfile>(props)
  const [is2Fa, setIs2Fa] = useState(0);
  const [isEmail, setIsEmail] = useState(0);
  const [isVerify, setIsVerify] = useState(0);

  useEffect(() => {
    setProfile(props)
  }, [props])

  useEffect(() => {
    setIs2Fa(profile.two_factor ? 1 : 0)
    setIsEmail(profile.email ? 1 : 0)
    setIsVerify(profile.verify_status)
  }, [profile])

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const ok = <div className={styles.ok}>
    {okMessage}
  </div>

  const token = localStorage.getItem("access_token") ?? '';

  const getQr = async () => {
    const { data } = await TwoFactorNew(token);
    setQr(data?.qrcode);
    setSecret(data?.secret);
  }

  const confirm = async () => {
    const { data } = await TwoFactor(token, secret, valueCode);
    if (data === 'Неверный код') {
      setErrorMessage(data);
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    } else {
      document.location.reload()
    }
  }

  const bg = <div className={styles.twoFaMain} onClick={() => { setShow2Fa(false); setShowPassModal(false) }}></div>
  const twoFa =
    <div className={styles.twoFaRoot}>
      <div className={styles.topBlock}>
        <p className={styles.topBlocktitle}>Google Authenticator (2FA)</p>
        <img
          src={cross}
          alt=""
          className={styles.cross}
          onClick={() => setShow2Fa(false)}
        />
      </div>
      <div className={styles.twoFaText}>
        Отсканируйте QR в приложении Google Authenticator или введите код авторизации вручную
      </div>
      <div className={styles.qrContainer}>
        <img src={qr} alt="" style={{ width: '170px', height: '170px' }} />
      </div>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <h1 className={styles.inputTitle}>Аккаунт</h1>
          <Input
            value={profile.login}
            setValue={setValueLogin}
            type="text"
            placeholder="user name"
          />
        </div>
        <div className={styles.input}>
          <h1 className={styles.inputTitle}>Ключ</h1>
          <Input
            value={secret}
            setValue={() => { }}
            type="text"
            placeholder={`Ключ`}
          />
        </div>
        <div className={styles.input}>
          <h1 className={styles.inputTitle}>Код подтверждения</h1>
          <Input
            value={valueCode}
            setValue={setValueCode}
            type="text"
            placeholder={`Введите код подтверждения`}
          />
        </div>
      </div>
      {errorMessage ? error : <></>}
      <button className={styles.btnOk} onClick={confirm}>Добавить</button>
    </div>


  const changePass = async () => {
    if (newPass.trim().length < 6) {
      setErrorMessage(`Длина пароля должна быть больше пяти символов`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    } else if (newPass === newPass2) {
      const { data } = await ChangePassword(token, oldPass, newPass);
      if (data === 'Неверный пароль') {
        setErrorMessage(data)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      } else {
        setOkMessage('Пароль успешно изменён')
        setTimeout(() => {
          setOkMessage('');
          document.location.reload();
        }, 3000);
      }
    } else {
      setErrorMessage(`Пароли не совпадают`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    }
  }

  const passModal =
    <div className={styles.passRoot}>
      <div className={styles.topBlock}>
        <p className={styles.topBlocktitle}>Изменить пароль</p>
        <img
          src={cross}
          alt=""
          className={styles.cross}
          onClick={() => setShowPassModal(false)}
        />
      </div>
      <Input
        value={oldPass}
        setValue={setOldPass}
        placeholder={`Старый пароль`}
        type={'password'}
      />
      <Input
        value={newPass}
        setValue={setNewPass}
        placeholder={`Новый пароль`}
        type={'password'}
      />
      <Input
        value={newPass2}
        setValue={setNewPass2}
        placeholder={`Подтвердить пароль`}
        type={'password'}
      />
      {errorMessage ? error : <></>}
      {okMessage ? ok : <></>}
      <button className={styles.btnOk} onClick={changePass}>Изменить</button>
    </div>

  return (
    <>
      {show2Fa ? bg : <></>}
      {show2Fa ? twoFa : <></>}
      {showPassModal ? bg : <></>}
      {showPassModal ? passModal : <></>}
      <div className={styles.safetyContainer}>
        <div className={styles.top}>
          <h1 className={styles.title}>Безопасность</h1>
          <div className={styles.tags}>
            {!is2Fa || !isEmail || !isVerify ? <Error title={`Профиль защищён ненадёжно`} /> : <Success title={`Профиль надёжно защищён`} />}
          </div>
        </div>
        <div className={styles.bottom}>
          <h2 className={styles.title2}>Настройки расширенной безопасности</h2>
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.container}>
                <div className={styles.itemName}>Google Authenticator (2FA)</div>
              </div>
              <div className={styles.container}>
                <div className={styles.itemStatus}>
                  {!is2Fa ? <Error title={`Не подключено`} /> : <Success title={`Подключено`} />}
                </div>
              </div>
              <div className={styles.container}>
                <button
                  className={`${!is2Fa ? styles.btnOk : styles.btnDis}`}
                  disabled={is2Fa ? true : false}
                  onClick={() => { setShow2Fa(!show2Fa); getQr() }}>
                  {is2Fa ? `Подключено` : `Подключить`}
                </button>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.container}>
                <div className={styles.itemName}>Подтвердить e-mail</div>
              </div>
              <div className={styles.container}>
                <div className={styles.itemStatus}>
                  {!isEmail ? <Error title={profile.email ?? 'email'} /> : <Success title={profile.email ?? 'email'} />}
                </div>
              </div>
              <div className={styles.container}>
                <button className={`${!isEmail ? styles.btnOk : styles.btnDis}`} disabled={!isEmail ? true : false}>
                  {isEmail ? `Подтверждено` : `Подтвердить`}
                </button>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.container}>
                <div className={styles.itemName}>Верификация</div>
              </div>
              <div className={styles.container}>
                <div className={styles.itemStatus}>
                  {!isVerify ? <Error title={`Не верифицирован`} /> : <Success title={`Верифицирован`} />}
                </div>
              </div>
              <div className={styles.container}>
                <Link to={`/profile/verify`}>
                  <button
                    className={`${!isVerify ? styles.btnOk : styles.btnDis}`}
                    disabled={isVerify ? true : false}
                  >
                    {isVerify ? `Пройдена` : `Пройти`}
                  </button>
                </Link>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.container}>
                <div className={styles.itemName}>Пароль для входа</div>
              </div>
              <div className={styles.container}>
                <div className={styles.itemStatus}></div>
              </div>
              <div className={styles.container}>
                <button className={styles.btnOk} onClick={() => setShowPassModal(true)}>Изменить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Safety