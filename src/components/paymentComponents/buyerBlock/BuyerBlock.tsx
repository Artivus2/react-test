import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './BuyerBlock.module.scss'
import { ApealProps, OrderHistory, Payments, UserProfile } from '../../../types/types';
import PayBlock from '../payBlock/PayBlock';
import ConfirmModal from '../confirmModal/ConfirmModal';
import CancelModal from '../cancelModal/CancelModal';
import star from '../../../assets/icons/star.svg'
import starFill from '../../../assets/icons/starFill.svg'
import { AddRating } from '../../../services/P2p';
import ApealModal from '../apealModal/ApealModal';
import ApealConfirmModal from '../apealModal/apealConfirmModal/ApealConfirmModal';
import checked from '../../../assets/icons/checked.svg'

interface BuyerBlockPropsType {
  m: number;
  s: number;
  offerData: OrderHistory,
  setOpenChat: (param: boolean) => void;
  setShowApeal: (param: ApealProps) => void;
  profile: UserProfile;
}

const BuyerBlock = ({
  profile,
  setOpenChat,
  m,
  s,
  offerData,
  setShowApeal,
}: BuyerBlockPropsType) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isOpenApealModal, setIsOpenApealModal] = useState(false);
  const [apeal, setApeal] = useState(false);
  const [timerOut, setTimerOut] = useState(false)
  const [activeStars, setActiveStars] = useState(0)
  const [newComment, setNewComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showPayment, setShowPayment] = useState(0)
  const [payments, setPayments] = useState<Payments[]>([])

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const checkComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.trim() === '') {
      setErrorMessage('Отзыв не может быть пустым')
      setNewComment('')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    } else {
      setNewComment(e.target.value)
    }
  }

  const sendRating = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    if (newComment && activeStars > 0) {
      const data = await AddRating(token, offerData.user_id, activeStars, newComment)
      if (data.status === 200) {
        document.location.reload();
      } else {
        setErrorMessage(data.data)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      }
    }
  }

  useEffect(() => {
    if (offerData.status_history >= 2) {
      if (m - 15 === 0 && s === 0) {
        setTimerOut(true);
      }
    } else {
      if (m === 0 && s === 0) {
        setTimerOut(true);
      }
    }
  }, [m, s]);


  useEffect(() => {
    const currentIds = offerData.payments_order.map(el => el.id);
    const temp = offerData.payments_creator.filter(el => currentIds.find((i) => i === el.id))
    setPayments(temp)
  }, [offerData.payments_creator, offerData.payments_order, showPayment])

  return (
    <div className={styles.main}>
      <button className={styles.chatBtn} onClick={() => setOpenChat(true)}>Чат с продавцом</button>
      <PayBlock
        currency={offerData.currency}
        chart={offerData.chart}
        course={offerData.course}
        amount={offerData.volume}
      >
      </PayBlock>
      <p className={styles.title}>
        Реквизиты продавца
      </p>
      <div className={styles.reqContainer}>
        {
          payments.map((el) => {
            return <div
              className={styles.reqBox}
              style={showPayment === el.id ? { border: '2px solid #1caf86' } : {}}
              onClick={() => setShowPayment(el.id)}
            >
              <img src={checked} alt="" style={showPayment === el.id ? { opacity: '1' } : { opacity: '0.1' }} />
              {el.name}
            </div>
          })
        }
      </div>
      {showPayment ?
        <div className={styles.requisites}>
          <div className={styles.payMethod}>
            <p className={styles.payMethodText}>
              {
                payments.filter(el => el.id === showPayment)[0].name ?? "Не указано"
              }
            </p>
          </div>
          <div className={styles.saller}>
            <div className={styles.sallerInfo}>
              <p className={styles.sallerTitle}>Контрагент</p>
              <p className={styles.sallerText}>
                {
                  payments.filter(el => el.id === showPayment)[0].payment_receiver ?? "Не указано"
                }
              </p>
            </div>
            <div className={styles.sallerInfo}>
              <p className={styles.sallerTitle}>Номер карты</p>
              <p className={styles.sallerText}>
                {
                  payments.filter(el => el.id === showPayment)[0].value ?? "Не указано"
                }
              </p>
            </div>
          </div>
          <div className={styles.saller}>
            <div className={styles.sallerInfo}>
              <p className={styles.sallerTitle}>Условия сделки</p>
              <p className={styles.sallerText}>{offerData.description ?? "Не указано"}</p>
            </div>
          </div>
        </div>
        :
        <></>
      }

      <div className={styles.btnsBlock}>
        {offerData.status_history < 2 ? (
          <div className={styles.btnBox}>
            <div className={styles.btn} onClick={() => setIsOpenConfirm(true)}>
              <p className={styles.btnText}>Подтвердить оплату, приложить фото чека</p>
            </div>
            <div className={styles.resetBlock} onClick={() => setIsOpenCancel(true)}>
              <p className={styles.reset}>Отменить сделку</p>
            </div>
          </div>
        ) : offerData.status_history === 2 && !timerOut ? (
          <div className={styles.btnBox}>
            <div className={styles.btn}>
              <p className={styles.btnText}>
                {
                  `Подача аппеляции доступна через: 
                  ${String(m).length === 1 ? `0${m}` : m}: ${String(s).length === 1 ? `0${s}` : s}
                  `
                }
              </p>
            </div>
            {/* <div className={styles.resetBlock} onClick={() => setIsOpenCancel(true)}>
                <p className={styles.reset}>Отменить сделку</p>
              </div> */}
          </div>
        ) : offerData.status_history === 2 && timerOut ? (
          <div className={styles.btnBox}>
            <div className={styles.btn}>
              <p className={styles.btnText} onClick={() => setIsOpenApealModal(true)}>
                Подать аппеляцию
              </p>
            </div>
            {/* <div className={styles.resetBlock} onClick={() => setIsOpenCancel(true)}>
                <p className={styles.reset}>Отменить сделку</p>
              </div> */}
          </div>
        ) : offerData.status_history === 5 ? (
          <div className={styles.endBox}>
            <div className={styles.rateBlock}>
              <h1 className={styles.win}>Подана аппеляция</h1>
            </div>
          </div>
        ) : offerData.status_history > 5 && offerData.status_history < 10 ? (
          <div className={styles.endBox}>
            <div className={styles.rateBlock}>
              <h1 className={styles.win}>Сделка отменена</h1>
            </div>
          </div>
        ) : offerData.status_history === 10 || offerData.status_history === 4 ? (
          <div className={styles.endBox}>
            <div className={styles.rateBlock}>
              <h1 className={styles.win}>Получено {offerData.volume} {offerData.chart}</h1>
            </div>
            <div className={styles.rateBox}>
              <div className={styles.stars}>
                <img className={styles.star} src={activeStars >= 1 ? starFill : star} alt="star" onClick={() => setActiveStars(1)} />
                <img className={styles.star} src={activeStars >= 2 ? starFill : star} alt="star" onClick={() => setActiveStars(2)} />
                <img className={styles.star} src={activeStars >= 3 ? starFill : star} alt="star" onClick={() => setActiveStars(3)} />
                <img className={styles.star} src={activeStars >= 4 ? starFill : star} alt="star" onClick={() => setActiveStars(4)} />
                <img className={styles.star} src={activeStars === 5 ? starFill : star} alt="star" onClick={() => setActiveStars(5)} />
              </div>
              <textarea className={styles.rate} placeholder='Напишите отзыв о продавце' onChange={(e) => checkComment(e)}></textarea>
              <button
                className={newComment && activeStars > 0 ? styles.btnOk : styles.btnDis}
                onClick={sendRating}
                style={{ maxWidth: "354px" }}
              >
                Отправить отзыв
              </button>
              {errorMessage ? error : <></>}
            </div>
            <div className={styles.btnBox}>
              <p className={styles.btnDis}>Сделка завершена</p>
            </div>
          </div>
        ) :
          <></>
        }
      </div>

      {/* </PayBlock > */}
      {isOpenConfirm && (
        <ConfirmModal setIsOpenConfirm={setIsOpenConfirm} id={offerData.order_id} userId={profile.id} date={offerData.start_date} />
      )}
      {isOpenCancel && <CancelModal setIsOpen={setIsOpenCancel} id={offerData.order_id} />}
      {isOpenApealModal && <ApealModal setIsOpen={setIsOpenApealModal} setApeal={setApeal} />}
      {apeal && <ApealConfirmModal setIsOpen={setApeal} setShowApeal={setShowApeal} user={profile.login} orderId={offerData.order_id} />}
    </div>
  )
}

export default BuyerBlock