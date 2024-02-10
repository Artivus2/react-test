import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './ProfileInfo.module.scss'
import BalanceBlock from '../balanceBlock/BalanceBlock'
import Statistics from '../statistics/Statistics'
import { AddPayment, BalanceInfo, DelPayment, GetPayments } from '../../../services/UserService'
import cross from '../../../assets/icons/cross.svg'
import Select from 'react-select'
import { BankProps } from '../../filters/Filters'
import { GetPayment } from '../../../services/P2p'
import { Payments, UserProfile, WalletBalance } from '../../../types/types'
import { ReactComponent as Cross } from "../../../assets/icons/cross.svg";
import { Link } from 'react-router-dom'
import Success from '../../../UI/Success/Success'
import Error from '../../../UI/Error/Error'

const ProfileInfo = (props: any) => {
  const [payments, setPayments] = useState<Payments[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [okMessage, setOkMessage] = useState('')
  const [selectedBankOption, setSelectedBankOption] = useState<any>({ label: 'SberBank', value: 32 });
  const [bankList, setBankList] = useState<BankProps[]>([
    { label: 'SberBank', value: 32 }
  ])
  const [cardNumber, setCardNumber] = useState('')
  const [fio, setFio] = useState('')
  const [checked, setChecked] = useState(false)
  const [totalBalance, setTotalBalance] = useState<number>(0)
  const [totalBlocked, setTotalBlocked] = useState<number>(0)
  // const [b2bBalance, setB2bBalance] = useState<number>(0)

  const [profile, setProfile] = useState<UserProfile>(props)

  useEffect(() => {
    setProfile(props)
  }, [props])

  const getBalance = async (token: string) => {
    const data = await BalanceInfo(token);
    if (data.status === 200) {
      let row: WalletBalance[] = data.data;
      let tempTotal = row.map((el) => +el.balance * +el.price);
      let total = tempTotal.reduce((prev, cur) => +prev + +cur, 0);
      total = parseFloat(total.toString()).toString().split(".")[1] ?
        +parseFloat(total.toString()).toFixed(8) :
        +parseFloat(total.toString())
      setTotalBalance(total);
      let tempBlocked = row.map((el) => el?.blocked ? +el.blocked : 0);
      let totalBlocked = tempBlocked.reduce((prev, cur) => +prev + +cur, 0);
      totalBlocked = parseFloat(totalBlocked.toString()).toString().split(".")[1] ?
        +parseFloat(totalBlocked.toString()).toFixed(8) :
        +parseFloat(totalBlocked.toString())
      setTotalBlocked(totalBlocked);
    }
  }
  const getPayments = async (token: string) => {
    const data = await GetPayments(token);
    if (data.status === 200 && data.data.length) {
      setPayments(data.data)
    }
  }
  const getBanks = async (token: string) => {
    const data = await GetPayment(token, 1);
    if (data.status === 200 && data.data.length) {
      const temp: BankProps[] = [];
      data.data.forEach((el: any) => {
        temp.push({ label: el.name, value: el.id.toString() })
      });
      setBankList(temp)
    }
  }

  const addPayment = async () => {
    if (checked) {
      const token = localStorage.getItem("access_token") ?? '';
      const data = await AddPayment(token, +selectedBankOption.value, cardNumber, fio);
      if (data.status === 200 && data.data.success) {
        setOkMessage(data.data.message)
        setTimeout(() => {
          setOkMessage('')
          setShowAddModal(false)
          document.location.reload()
        }, 3000);
      } else {
        setErrorMessage(data.data)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      }
    }
  }

  const delPayment = async (payment: Payments) => {
    const token = localStorage.getItem("access_token") ?? '';
    const data = await DelPayment(token, payment.id);
    if (data.data.success && data.status === 200) {
      document.location.reload()
    }
  }

  const checkValue = (e: ChangeEvent<HTMLInputElement>) => {
    const numbers = /^[0-9 ]*$/;
    const regExp = /[0-9]{4}/;

    // не позволяем ввести ничего, кроме цифр 0-9, ограничиваем размер поля 19-ю символами
    //@ts-ignore
    if ((e.nativeEvent.inputType === 'insertText' && !numbers.test(e.target.value)) || e.target.value.length > 19) {
      e.target.value = e.target.value.slice(0, e.target.value.length - 1)
      return
    }
    // обеспечиваем работу клавиш "backspace","delete"
    let value = e.target.value
    //@ts-ignore
    if (e.nativeEvent.inputType === "deleteContentBackward" && regExp.test(value.slice(-4))) {
      e.target.value = e.target.value.slice(0, e.target.value.length - 1)
      return
    }
    // добавяем пробел после 4 цифр подряд
    if (regExp.test(value.slice(-4)) && value.length < 19) {
      e.target.value += " "
    }
    if (e.target.value.length === 19) {
      setCardNumber(e.target.value)
    } else {
      setCardNumber('')
    }
  }

  useEffect(() => {
    if (cardNumber && selectedBankOption.value && fio) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [cardNumber, selectedBankOption.value, fio])

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? '';
    getBalance(token)
    getPayments(token)
    getBanks(token)
  }, [])

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const ok = <div className={styles.ok}>
    {okMessage}
  </div>

  const bg = <div className={styles.twoFaMain} onClick={() => setShowAddModal(false)}></div>
  const addModal =
    <div className={styles.passRoot}>
      <div className={styles.topBlock}>
        <p className={styles.topBlocktitle}>Добавить способ оплаты</p>
        <img
          src={cross}
          alt=""
          className={styles.cross}
          onClick={() => setShowAddModal(false)}
        />
      </div>
      <div className={styles.paymentSelect}>
        <p className={styles.subtitle}>Банк</p>
        <Select
          options={bankList}
          classNames={{
            control: (state) => styles.select2,
            singleValue: (state) => styles.select4,
            menuList: (state) => styles.select6,
            menu: (state) => styles.select61,
            option: (state) => styles.select7,
          }}
          classNamePrefix="react-select"
          placeholder={`Способы оплаты`}
          defaultValue={selectedBankOption}
          value={selectedBankOption}
          onChange={setSelectedBankOption}
        />
      </div>
      <div>
        <p className={styles.subtitle}>Номер карты</p>
        <input type="text" className={styles.number} placeholder='____ ____ ____ ____' onChange={(e) => checkValue(e)} />
      </div>
      <div>
        <p className={styles.subtitle}>ФИО получателя</p>
        <input type="text" className={styles.number} placeholder='Введите реквизиты' onChange={(e) => setFio(e.target.value)} />
      </div>
      {errorMessage ? error : <></>}
      {okMessage ? ok : <></>}
      <button className={checked ? styles.btnOk : styles.btnDis} onClick={addPayment}>Добавить</button>
    </div>

  return (
    <div className={styles.main}>
      {showAddModal ? bg : <></>}
      {showAddModal ? addModal : <></>}
      <div className={styles.mobileInfo}>
        <h2 className={styles.title}>Профиль</h2>
        <div className={styles.userInfo}>
          <div className={styles.iconWrap}>
            <img className={styles.div} src={profile.image} alt="avatar" />
          </div>
          <div className={styles.info}>
            <h2 className={styles.titleInfo}>{profile.login}</h2>
            <h2 className={styles.titleInfo2}>{profile.email}</h2>
            <div className={styles.errorWrap}>
              <Link to={'/profile/verify'}>
                {!profile.verify_status ? <Error title={`Профиль не подтвержден`} /> : <Success title={`Профиль подтвержден`} />}
              </Link>
              <Link to={'/profile/safety'}>
                {!profile.email ? <Error title="Email" /> : <Success title="Email" />}
              </Link>
              <Link to={'/profile/safety'}>
                {!profile.two_factor ? <Error title={`Двухфакторная аутентификация (2FA)`} /> : <Success title={`Двухфакторная аутентификация (2FA)`} />}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <BalanceBlock balance={totalBalance} blocked={totalBlocked} title='total' />
      {/* <BalanceBlock balance={0} title='b2b' /> */}
      <Statistics />
      <div className={styles.payments}>
        <div className={styles.title}>Способы оплаты</div>
        {
          payments.map((el, index) => {
            return <div className={styles.payment} key={index}>
              <div className={styles.paymentTop}>
                <div className={styles.paymentName}>{el.name}</div>
                <div className={styles.paymentDel} onClick={() => delPayment(el)}>Удалить</div>
              </div>
              <div className={styles.paymentBottom}>
                <div className={styles.paymentRec}>
                  <p className={styles.paymentTitle}>Фамилия Имя</p>
                  <p>{el.payment_receiver}</p>
                </div>
                <div className={styles.paymentVal}>
                  <p className={styles.paymentTitle}>Номер банковской карты</p>
                  <p>{el.value}</p>
                </div>
              </div>
            </div>
          })
        }
        <button className={styles.btnOk} onClick={() => setShowAddModal(true)}>Добавить способ оплаты</button>
      </div>
    </div>
  )
}

export default ProfileInfo