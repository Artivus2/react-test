import React, { useState } from 'react'
import styles from './CancelModal.module.scss'
import checked from '../../../assets/icons/checked.svg';
import { ReactComponent as Cross } from "../../../assets/icons/cross.svg";
import { CancelB2bTrade } from '../../../services/P2p';

interface CancelModalPropsType {
  setIsOpen: (isOpen: boolean) => void;
  id: number;
}

const CancelModal = ({
  setIsOpen,
  id
}: CancelModalPropsType) => {
  const [ok, setOk] = useState(false)
  const [description, setDescription] = useState(6);
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const cancelTrade = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    const data = await CancelB2bTrade(token, id, description);
    if (data.status === 200 && data.data.success) {
      setLoading(false)
      document.location.href = '/b2b'
    } else {
      setErrorMessage(data.data)
      setTimeout(() => {
        setErrorMessage("")
      }, 3000);
      setLoading(false)
    }
  }

  const cancel = () => {
    if (ok) {
      setLoading(true)
      cancelTrade()
    }
  }

  return (
    <div className={styles.popup__cancel} onClick={() => setIsOpen(false)}>
      <div className={styles.popup__block} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popup__title}>Отмена сделки</div>
        <Cross
          className={styles.popup__close}
          onClick={() => setIsOpen(false)}
        />
        <div className={styles.popup__checboxs}>
          <div>
            <div className={styles.popup__checbox}>
              <input
                type="radio"
                id="checked1"
                name='rad'
                onChange={() => { setDescription(1); setOk(true) }}
              />
              <label htmlFor="checked1">
                <img src={checked} alt="" />
              </label>
            </div>
            <span>
              Я разместил(а) неверный ордер
            </span>
          </div>
          <div>
            <div className={styles.popup__checbox}>
              <input
                type="radio"
                id="checked2"
                name='rad'
                onChange={() => { setDescription(2); setOk(true) }}
              />
              <label htmlFor="checked2">
                <img src={checked} alt="" />
              </label>
            </div>
            <span>
              Ошибка платежа, так как был указан недействительный способ оплаты
            </span>
          </div>
          <div>
            <div className={styles.popup__checbox}>
              <input
                type="radio"
                id="checked3"
                name='rad'
                onChange={() => { setDescription(3); setOk(true) }}
              />
              <label htmlFor="checked3">
                <img src={checked} alt="" />
              </label>
            </div>
            <span>
              Контрагент требовал дополнительную плату
            </span>
          </div>
          <div>
            <div className={styles.popup__checbox}>
              <input
                type="radio"
                id="checked4"
                name='rad'
                onChange={() => { setDescription(4); setOk(true) }}
              />
              <label htmlFor="checked4">
                <img src={checked} alt="" />
              </label>
            </div>
            <span>
              Я не соответствовал(а) требованиям контрагента
            </span>
          </div>
          <div>
            <div className={styles.popup__checbox}>
              <input
                type="radio"
                id="checked5"
                name='rad'
                onChange={() => { setDescription(5); setOk(true) }}
              />
              <label htmlFor="checked5">
                <img src={checked} alt="" />
              </label>
            </div>
            <span>
              Я не знал(а) как завершить платеж
            </span>
          </div>
          <div>
            <div className={styles.popup__checbox}>
              <input
                type="radio"
                id="checked6"
                name='rad'
                onChange={() => { setDescription(6); setOk(true) }}
              />
              <label htmlFor="checked6">
                <img src={checked} alt="" />
              </label>
            </div>
            <span>
              Другое
            </span>
          </div>
        </div>
        {errorMessage ? error : <></>}
        <div className={styles.popup__btns}>
          <button
            className={ok && !loading ? styles.btnOk : styles.btnDis}
            onClick={cancel}
          >
            Отменить сделку
          </button>
        </div>
      </div>
    </div>
  )
}

export default CancelModal